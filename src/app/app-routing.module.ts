import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
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
      { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
