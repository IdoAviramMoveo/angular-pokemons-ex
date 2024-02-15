import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styleUrl: './map-controls.component.scss',
})
export class MapControlsComponent {
  @Output() toggleStyle = new EventEmitter<void>();
  @Output() showDirections = new EventEmitter<void>();
}
