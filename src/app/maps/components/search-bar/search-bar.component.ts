import { Component, inject, signal } from '@angular/core';
import { SearchResultsComponent } from "../search-results/search-results.component";
import { PlacesService } from "../../services/places.service";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  styleUrl: './search-bar.component.css',
  imports: [
    SearchResultsComponent
  ],
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {
  #debounceTimer?: NodeJS.Timeout;
  readonly #placesService = inject(PlacesService);
  hiddenSearchResults = signal(false);

  onQueryChanged(query: string = '') {
    if (this.#debounceTimer) clearTimeout(this.#debounceTimer);

    this.#debounceTimer = setTimeout(() => {
      this.#placesService.getPlacesByQuery(query)
    }, 1000);
  }

  hideSearchResult(isGettingDirections: boolean) {
    this.hiddenSearchResults.set(isGettingDirections);
  }
}
