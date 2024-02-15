import {
  Component,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';

import { GoogleMapsService } from '../../../services/google-maps.service';
import { officeLocation, defaultZoomLevel } from '../../../constants/map-data';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.scss',
})
export class MapDisplayComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @Output() mapReady = new EventEmitter<google.maps.Map>();
  private map!: google.maps.Map;

  constructor(private googleMapsService: GoogleMapsService) {}

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
    });

    this.mapReady.emit(this.map);
  }
}
