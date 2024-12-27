import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingComponent } from '../../components/loading/loading.component';
import { PlacesService } from '../../services/places.service';
import { MapViewComponent } from '../../components/map-view/map-view.component';
import { AngularLogoComponent } from "../../components/angular-logo/angular-logo.component";
import { BtnMyLocationComponent } from "../../components/btn-my-location/btn-my-location.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  imports: [
    LoadingComponent,
    MapViewComponent,
    AngularLogoComponent,
    BtnMyLocationComponent,
    SearchBarComponent,
  ],
  selector: 'app-map-screen',
  standalone: true,
  styleUrl: './map-screen.component.css',
  templateUrl: './map-screen.component.html',
})
export class MapScreenComponent implements OnInit {
  readonly #route = inject(Router);
  readonly #placesService = inject(PlacesService);

  constructor() { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      alert('Browser does not support geolocation');

      this.#route.navigateByUrl('/maps/full-screen');

      throw new Error('Browser does not support geolocation');
    }
  }

  get isUserLocationReady(): boolean {
    return this.#placesService.isUserLocationReady;
  }
}
