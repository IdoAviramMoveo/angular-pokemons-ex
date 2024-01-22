import { Injectable } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private loader: Loader;

  constructor() {
    this.loader = new Loader({
      apiKey: environment.googleMapsApiKey,
      version: 'weekly',
      libraries: ['places'],
    });
  }

  getLoader(): Loader {
    return this.loader;
  }
}
