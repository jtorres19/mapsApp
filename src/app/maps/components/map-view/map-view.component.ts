import {
  AfterViewInit,
  Component,
  ElementRef,
  inject, signal,
  ViewChild
} from '@angular/core';
import { PlacesService } from "../../services/places.service";
import { Map, Marker, Popup } from "mapbox-gl";
import { LoadingComponent } from "../loading/loading.component";
import { MapService } from "../../services/map.service";

@Component({
  imports: [
    LoadingComponent
  ],
  selector: 'app-map-view',
  standalone: true,
  styleUrl: './map-view.component.css',
  templateUrl: './map-view.component.html',
})
export class MapViewComponent implements AfterViewInit {
  readonly #placesService = inject(PlacesService);
  readonly #mapService = inject(MapService);
  @ViewChild('mapDiv') mapDiv!: ElementRef;
  isMapReady = signal<boolean>(false);

  ngAfterViewInit(): void {
    const map = new Map({
      container: this.mapDiv.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.#placesService.userLocation(),
      zoom: 14,
    });

    this.isMapReady.set(
      map.loaded() && this.#placesService.isUserLocationReady
    );

    const popup = new Popup().setHTML(`
      <h6>Here I'm</h6>
      <span>I'm in this place of world</span>
    `);

    new Marker({color: 'red'}).setLngLat(this.#placesService.userLocation()!).setPopup(popup).addTo(map);

    this.#mapService.setMap(map);
  }
}
