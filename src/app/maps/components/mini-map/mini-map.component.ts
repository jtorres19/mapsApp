import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from "mapbox-gl";

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw 'Map div not found';
    if (!this.lngLat) throw "LngLat can't be null";

    this.map = new Map({
      // container: 'map', // container ID
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
