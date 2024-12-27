import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from "mapbox-gl";

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
  standalone: false
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw new Error('Map div not found');
    if (!this.lngLat) throw new Error("LngLat can't be null");

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
