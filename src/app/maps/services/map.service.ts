import { inject, Injectable, signal } from '@angular/core';
import { Map, LngLatLike, Marker, Popup, LngLatBounds, AnySourceData, AnyLayer } from "mapbox-gl";
import { Feature } from "../interfaces/places";
import { DirectionsApiClient } from "../api/directions-api-client";
import { DirectionsRs, Route } from "../interfaces/directions";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  #map?: Map;
  readonly #markers = signal<Marker[]>([]);
  directionsApiClient = inject(DirectionsApiClient);

  constructor() {
  }

  get isMapReady(): boolean {
    return !!this.#map;
  }

  setMap(map: Map): void {
    this.#map = map;
  }

  flyTo(coords: LngLatLike): void {
    if (!this.isMapReady) throw new Error('Map is not ready');

    this.#map?.flyTo({ zoom: 15, center: coords });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]): void {
    if (!this.#map) throw new Error('Map is not ready');

    this.#markers().forEach(marker => marker.remove());

    const newMarkers = []

    for (const place of places) {
      const [lng, lat] = place.geometry.coordinates;
      const popup = new Popup().setHTML(`
        <h3>${place.properties.name}</h3>
        <span>${place.properties.full_address}</span>`);
      const marker = new Marker().setLngLat([lng, lat]).setPopup(popup).addTo(this.#map);

      newMarkers.push(marker);
    }

    this.#markers.set(newMarkers);

    if (places.length === 0) {
      this.removeRoute();

      this.#map.setCenter(userLocation || this.#map.getCenter());

      return;
    }

    const bounds = new LngLatBounds();

    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.#map.fitBounds(bounds, { padding: 200 });
  }

  getRouteBetweenPoints(origin: [number, number], destination: [number, number]): void {
    if (!this.#map) throw new Error('Map is not ready');

    this.directionsApiClient.get<DirectionsRs>(`/directions/v5/mapbox/driving/${origin.join(',')};${destination.join(',')}`)
      .subscribe((response) => this.drawPolyline(response.routes[0]));
  }

  drawPolyline(route: Route): void {
    if (!this.#map) throw new Error('Map is not ready');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => bounds.extend([lng, lat]));

    this.#map.fitBounds(bounds, { padding: 200 });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };
    const layer: AnyLayer = {
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75,
      },
    }

    this.removeRoute();

    this.#map.addSource('route', sourceData);
    this.#map.addLayer(layer);
  }

  removeRoute(): void {
    if (!this.#map) throw new Error('Map is not ready');

    if (this.#map.getLayer('route')) {
      this.#map.removeLayer('route');
      this.#map.removeSource('route');
    }
  }
}
