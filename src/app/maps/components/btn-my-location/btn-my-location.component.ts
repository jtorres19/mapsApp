import { Component, inject } from '@angular/core';
import { MapService } from "../../services/map.service";
import { PlacesService } from "../../services/places.service";

@Component({
    imports: [],
    selector: 'app-btn-my-location',
    styleUrl: './btn-my-location.component.css',
    templateUrl: './btn-my-location.component.html'
})
export class BtnMyLocationComponent {
    readonly #placesService = inject(PlacesService)
    readonly #mapService = inject(MapService)

    goToMyLocation() {
        if (!this.#placesService.isUserLocationReady) throw new Error('User location is not ready');
        if (!this.#mapService.isMapReady) throw new Error('Map is not ready');

        this.#mapService.flyTo(this.#placesService.userLocation()!);
    }
}
