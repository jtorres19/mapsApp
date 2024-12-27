import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class DirectionsApiClient extends HttpClient {
  baseUrl = 'https://api.mapbox.com';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  override get<T>(url: string) {
    url = this.baseUrl + url;

    const params = {
      access_token: environment.mapbox_key,
      language: 'es',
      alternatives: false,
      geometries: 'geojson',
      overview: 'full',
      // overview: 'simpliefied',
      steps: false,
    };

    return super.get<T>(url, { params });
  }
}
