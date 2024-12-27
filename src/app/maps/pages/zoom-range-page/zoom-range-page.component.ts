import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from "mapbox-gl";

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  standalone: false
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap?: ElementRef;
  private readonly MAX_ZOOM: number = 18;
  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-71.5, -33);

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('El elemento HTML no fue encontrado')

    this.map = new Map({
      // container: 'map', // container ID
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw new Error('Mapa no inicializado');

    this.map.on('zoom', (ev) => this.zoom = this.map!.getZoom());

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < this.MAX_ZOOM) return;

      this.map!.zoomTo(this.MAX_ZOOM);
    });

    this.map.on('moveend', (ev) => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    this.map?.zoomIn()
  }

  zoomOut() {
    this.map?.zoomOut()
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);

    this.map?.zoomTo(this.zoom);
  }
}
