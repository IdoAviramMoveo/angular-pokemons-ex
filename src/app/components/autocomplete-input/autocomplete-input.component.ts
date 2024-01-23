import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { GoogleMapsService } from '../../../services/google-maps.service';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrl: './autocomplete-input.component.scss',
})
export class AutocompleteInputComponent implements OnInit {
  @ViewChild('addressInput') addressInput!: ElementRef;
  @Output() placeSelected = new EventEmitter<google.maps.places.PlaceResult>();

  private autocomplete!: google.maps.places.Autocomplete;

  constructor(private googleMapsService: GoogleMapsService) {}

  async ngOnInit() {
    await this.googleMapsService.getLoader().load();
    this.setupAutocomplete();
  }

  private setupAutocomplete(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement
    );
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      this.placeSelected.emit(place);
    });
  }
}
