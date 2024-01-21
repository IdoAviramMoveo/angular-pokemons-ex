import { Component } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  showPokemonLogo(): boolean {
    return (
      this.currentRoute.includes('/pokemons') ||
      this.currentRoute.startsWith('/pokemon/')
    );
  }

  showGoogleMapsLogo(): boolean {
    return this.currentRoute.includes('/my-map');
  }
}
