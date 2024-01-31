import { Component, ViewChild } from '@angular/core';
import { GoogleMapsService } from '../../../services/google-maps.service';
import { officeLocation, defaultZoomLevel } from '../../../constants/map-data';
import { styledMap } from '../../../constants/styled-map';
import { MapDirectionsComponent } from '../map-directions/map-directions.component';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss',
})
export class MyMapComponent {
  @ViewChild(MapDirectionsComponent)
  mapDirectionsComponent!: MapDirectionsComponent;
  public map!: google.maps.Map;
  private isCustomStyleApplied: boolean;
  public areDirectionsShown: boolean;
  private markers: google.maps.Marker[];

  constructor(private googleMapsService: GoogleMapsService) {
    this.isCustomStyleApplied = false;
    this.areDirectionsShown = false;
    this.markers = [];
  }

  onMapReady(map: google.maps.Map): void {
    this.map = map;
    this.addMarker(officeLocation, 'Office Location');
  }

  onPlaceSelected(place: google.maps.places.PlaceResult): void {
    if (place.geometry) {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(defaultZoomLevel);
      this.addMarker(place.geometry.location, place.name);
    } else {
      console.error('No details available for input: ', place.name);
    }
  }

  addMarker(
    position: google.maps.LatLng | google.maps.LatLngLiteral,
    title: string
  ): void {
    const marker = new google.maps.Marker({ position, map: this.map, title });
    marker.addListener('click', () => {
      marker.setMap(null);
      this.markers = this.markers.filter((m) => m !== marker);
    });
    this.markers.push(marker);
  }

  toggleMapStyle(): void {
    this.isCustomStyleApplied = !this.isCustomStyleApplied;
    this.map.setOptions({ styles: this.isCustomStyleApplied ? styledMap : [] });
  }

  toggleDirectionsDisplay(): void {
    this.areDirectionsShown = !this.areDirectionsShown;

    if (this.areDirectionsShown && this.mapDirectionsComponent) {
      this.mapDirectionsComponent.map = this.map;
      this.mapDirectionsComponent.show = true;
    } else if (this.mapDirectionsComponent) {
      this.mapDirectionsComponent.show = false;
    }
  }
}
