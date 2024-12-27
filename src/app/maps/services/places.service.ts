import { inject, Injectable, signal } from '@angular/core';

import { Feature, PlacesRs } from "../interfaces/places";
import { PlacesApiClient } from "../api/places-api-client";
import { MapService } from "./map.service";
import { Map } from "mapbox-gl";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  #map!: Map;
  readonly #placesApiClient = inject(PlacesApiClient);
  readonly #mapService = inject(MapService);
  userLocation = signal<[number, number] | undefined>(undefined);
  isLoadingPlaces = signal<boolean>(false);
  places = signal<Feature[]>([]);

  constructor() {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation.set([coords.longitude, coords.latitude]);

          resolve([coords.longitude, coords.latitude])
        },
        (error) => {
          alert('Error getting location');

          console.log(error);

          reject();
        },
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces.set(false);
      this.places.set([]);
    }

    if (!this.userLocation) throw new Error('User location not ready');

    const url = '/search/geocode/v6/forward';
    const params = {
      q: query,
      proximity: this.userLocation()!.join(','),
    }

    this.isLoadingPlaces.set(true);

    return this.#placesApiClient.get<PlacesRs>(url, { params })
      .subscribe((data) => {
        this.places.set(data.features);
        this.#mapService.createMarkersFromPlaces(data.features, this.userLocation()!);
        this.isLoadingPlaces.set(false);
      });
  }
}
