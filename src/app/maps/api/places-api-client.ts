import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PlacesApiClient extends HttpClient {
  baseUrl = 'https://api.mapbox.com';

  constructor(handler: HttpHandler) {
    super(handler);
  }

  override get<T>(url: string, options?: {
    params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  }) {
    url = this.baseUrl + url;

    const params = {
      access_token: environment.mapbox_key,
      language: 'es',
      limit: '5',
      ...options?.params,
    };

    return super.get<T>(url, { params });
  }
}
