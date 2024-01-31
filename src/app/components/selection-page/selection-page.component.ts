import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrl: './selection-page.component.scss',
})
export class SelectionPageComponent {
  constructor(private router: Router) {}

  navigateToPokemons(): void {
    this.router.navigate(['/pokemons']);
  }

  navigateToMyMap(): void {
    this.router.navigate(['/my-map']);
  }
}
