import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { homeLocation, officeLocation } from '../../../constants/map-data';
import { GoogleMapsService } from '../../../services/google-maps.service';

@Component({
  selector: 'app-map-directions',
  templateUrl: './map-directions.component.html',
  styleUrl: './map-directions.component.scss',
})
export class MapDirectionsComponent implements OnInit, OnChanges {
  @Input() map!: google.maps.Map;
  @Input() show: boolean;

  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  constructor(private googleMapsService: GoogleMapsService) {
    this.show = false;
  }

  async ngOnInit() {
    await this.googleMapsService.getLoader().load();
    this.initializeDirections();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.directionsRenderer) {
      return;
    }
    if (changes.show && this.show) {
      this.displayDirections();
    }

    if (changes.show && !this.show) {
      this.directionsRenderer.setMap(null);
    }
  }

  private initializeDirections(): void {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
  }

  private displayDirections(): void {
    if (!this.map || !this.directionsRenderer) return;

    const request: google.maps.DirectionsRequest = {
      origin: homeLocation,
      destination: officeLocation,
      travelMode: google.maps.TravelMode.WALKING,
    };

    this.directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
        this.directionsRenderer.setMap(this.map);
      } else {
        console.error('Directions request failed: ' + status);
      }
    });
  }
}
