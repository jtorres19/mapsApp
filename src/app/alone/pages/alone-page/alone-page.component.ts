import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";

@Component({
  imports: [
    CounterAloneComponent,
    SideMenuComponent,
  ],
  selector: 'app-alone-page',
  standalone: true,
  styleUrls: ['./alone-page.component.css', '../../../maps/layout/maps-layout/maps-layout.component.css'],
  templateUrl: './alone-page.component.html'
})
export class AlonePageComponent {

}
