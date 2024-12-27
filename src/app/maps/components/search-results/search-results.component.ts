import { Component, inject, output, signal } from '@angular/core';
import { PlacesService } from "../../services/places.service";
import { Feature } from "../../interfaces/places";
import { MapService } from "../../services/map.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-search-results',
  imports: [
    NgClass
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  readonly #placesService = inject(PlacesService);
  readonly #mapService = inject(MapService);
  selectedId = signal('');
  directionsGetting = output<boolean>();

  get isLoadingPlaces() {
    return this.#placesService.isLoadingPlaces();
  }

  get places() {
    return this.#placesService.places();
  }

  flyToPlace(place: Feature) {
    const [longitude, latitude] = place.geometry.coordinates;

    this.selectedId.set(place.id);

    this.#mapService.flyTo([longitude, latitude]);
  }

  getDirections(place: Feature) {
    const start = this.#placesService.userLocation()!;
    const end = place.geometry.coordinates as [number, number];

    this.#mapService.getRouteBetweenPoints(start, end);
    this.directionsGetting.emit(true);
  }
}
