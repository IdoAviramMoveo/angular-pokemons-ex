import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrl: './my-map.component.scss',
})
export class MyMapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  private map: google.maps.Map;
  private marker: google.maps.Marker;
  private autocomplete: google.maps.places.Autocomplete;

  ngOnInit() {
    let loader = new Loader({
      apiKey: 'AIzaSyAgORTeuVwfKVXJl7DoefqL5KRRPYRvgnE',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      const position = { lat: 32.06462, lng: 34.77163 };

      this.map = new google.maps.Map(this.mapContainer.nativeElement, {
        center: position,
        zoom: 14,
        mapId: '84b113c4aa93ca25',
      });

      this.marker = new google.maps.Marker({
        position: position,
        map: this.map,
        title: 'Moveo',
      });

      const input = document.getElementById('addressInput') as HTMLInputElement;
      this.autocomplete = new google.maps.places.Autocomplete(input);

      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        if (!place.geometry) {
          console.error('No details available for input: ', place.name);
          return;
        }

        this.map.setCenter(place.geometry.location);
        this.map.setZoom(14);

        this.marker.setPosition(place.geometry.location);
        this.marker.setTitle(place.name);
      });
    });
  }

  addMarkerFromInput() {
    const place = this.autocomplete.getPlace();
    if (place.geometry) {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(14);

      this.marker.setPosition(place.geometry.location);
      this.marker.setTitle(place.name);
    }
  }
}
