import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';

import { styledMap } from '../../../constants/styled-map';
import { GoogleMapsService } from '../../../services/google-maps.service';
import {
  officeLocation,
  homeLocation,
  defaultZoomLevel,
} from '../../../constants/map-data';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss',
})
export class MyMapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('addressInput') addressInput!: ElementRef;

  private map!: google.maps.Map;
  private markers: google.maps.Marker[];
  private autocomplete!: google.maps.places.Autocomplete;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;
  private isCustomStyleApplied: boolean;
  private areDirectionsShown: boolean;

  constructor(
    private googleMapsService: GoogleMapsService,
    private renderer: Renderer2
  ) {
    this.markers = [];
    this.isCustomStyleApplied = false;
    this.areDirectionsShown = false;
  }

  async ngOnInit() {
    try {
      await this.googleMapsService.getLoader().load();
      this.initializeMap();
    } catch (error) {
      console.error('Error loading Google Maps', error);
    }
  }

  private initializeMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: officeLocation,
      zoom: defaultZoomLevel,
      styles: this.isCustomStyleApplied ? styledMap : [],
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    this.addMarker(officeLocation, 'Office Location');
    this.setupAutocomplete();
  }

  addMarker(
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    title: string
  ): void {
    const marker: google.maps.Marker = new google.maps.Marker({
      position,
      map: this.map,
      title,
    });

    marker.addListener('click', () => {
      marker.setMap(null);
      this.markers = this.markers.filter((m) => m !== marker);
    });
    this.markers.push(marker);
  }

  addMarkerFromInput(): void {
    const place = this.autocomplete.getPlace();
    if (place.geometry) {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(defaultZoomLevel);

      this.addMarker(place.geometry.location, place.name);
    } else {
      console.error('No details available for input: ', place.name);
    }
  }

  private setupAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.addMarkerFromInput();
    });
  }

  toggleMapStyle(): void {
    this.isCustomStyleApplied = !this.isCustomStyleApplied;
    this.map.setOptions({ styles: this.isCustomStyleApplied ? styledMap : [] });
  }

  showDirections(): void {
    if (!this.areDirectionsShown) {
      const request: google.maps.DirectionsRequest = {
        origin: homeLocation,
        destination: officeLocation,
        travelMode: google.maps.TravelMode.WALKING,
      };

      this.directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          this.directionsRenderer.setDirections(result);
          this.directionsRenderer.setMap(this.map);
          this.areDirectionsShown = true;
        } else {
          console.error('Directions request failed:' + status);
        }
      });
    } else {
      if (this.directionsRenderer) {
        this.directionsRenderer.setMap(null);
        this.areDirectionsShown = false;
      }
    }
  }
}
