import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.scss'],
})
export class MyMapComponent implements OnInit {
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  ngOnInit() {
    let loader = new Loader({
      apiKey: 'AIzaSyAgORTeuVwfKVXJl7DoefqL5KRRPYRvgnE',
      version: 'weekly',
    });

    loader.load().then(() => {
      new google.maps.Map(this.mapContainer.nativeElement, {
        center: { lat: 51.233334, lng: 6.78333 },
        zoom: 6,
      });
    });
  }
}

//AIzaSyAgORTeuVwfKVXJl7DoefqL5KRRPYRvgnE
