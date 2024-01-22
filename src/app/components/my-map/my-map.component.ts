import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

import { styledMap } from '../../../constants/styled-map';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss',
})
export class MyMapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private autocomplete: google.maps.places.Autocomplete;

  private isCustomStyleApplied: boolean = false;
  private customStyles: google.maps.MapTypeStyle[] = styledMap;
  private defaultStyles: google.maps.MapTypeStyle[] = [];

  ngOnInit() {
    const loader = new Loader({
      apiKey: 'AIzaSyAgORTeuVwfKVXJl7DoefqL5KRRPYRvgnE',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const defaultPosition = { lat: 32.06462, lng: 34.77163 };

      this.map = new google.maps.Map(this.mapContainer.nativeElement, {
        center: defaultPosition,
        zoom: 14,
        styles: this.defaultStyles,
      });

      this.addMarker(defaultPosition, 'Default Location');

      const input = document.getElementById('addressInput') as HTMLInputElement;
      this.autocomplete = new google.maps.places.Autocomplete(input);

      this.autocomplete.addListener('place_changed', () => {
        this.addMarkerFromInput();
      });
    });
  }

  addMarker(
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    title: string
  ): void {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      title,
    });
    this.markers.push(marker);
  }

  addMarkerFromInput() {
    const place = this.autocomplete.getPlace();
    if (place.geometry) {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(14);

      this.addMarker(place.geometry.location, place.name);
    } else {
      console.error('No details available for input: ', place.name);
    }
  }

  toggleMapStyle() {
    this.isCustomStyleApplied = !this.isCustomStyleApplied;
    this.map.setOptions({
      styles: this.isCustomStyleApplied
        ? this.customStyles
        : this.defaultStyles,
    });
  }
}
