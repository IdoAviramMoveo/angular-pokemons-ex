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
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'selection',
        pathMatch: 'full',
      },
      {
        path: 'selection',
        component: SelectionPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pokemons',
        component: PokemonsListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pokemon/:id',
        component: PokemonDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-map',
        component: MyMapComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: redirectBasedOnAuth(new AuthService()) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
