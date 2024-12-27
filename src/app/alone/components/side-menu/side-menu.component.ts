import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { route: '/maps/map-screen', name: 'Map Screen' },
    { route: '/maps/fullscreen', name: 'FullScreen' },
    { route: '/maps/zoom-range', name: 'ZoomRange' },
    { route: '/maps/markers', name: 'Markers' },
    { route: '/maps/properties', name: 'Houses' },
    { route: '/alone', name: 'Alone Page' },
  ]
}
