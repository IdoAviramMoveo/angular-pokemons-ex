import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  currentRoute: string = '';

  constructor(private router: Router, public authService: AuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showPokemonLogo(): boolean {
    return this.currentRoute.startsWith('/pokemon');
  }

  showGoogleMapsLogo(): boolean {
    return this.currentRoute.includes('/my-map');
  }
}
