import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { LoginComponent } from './components/login/login.component';
import { MyMapComponent } from './components/my-map/my-map.component';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';

export function redirectBasedOnAuth(authService: AuthService): string {
  return authService.isLoggedIn() ? '/selection' : '/login';
}

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'selection',
    component: SelectionPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'pokemons',
        component: PokemonsListComponent,
      },
      {
        path: 'pokemon/:id',
        component: PokemonDetailsComponent,
      },
      {
        path: 'my-map',
        component: MyMapComponent,
      },
      { path: '**', redirectTo: 'pokemons', pathMatch: 'full' },
    ],
  },
  {
    path: '',
    redirectTo: redirectBasedOnAuth(new AuthService()),
    pathMatch: 'full',
  },
  { path: '**', redirectTo: redirectBasedOnAuth(new AuthService()) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
