import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonsListComponent } from './components/pokemons-list/pokemons-list.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonsFiltersComponent } from './components/pokemons-filters/pokemons-filters.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SelectionPageComponent } from './components/selection-page/selection-page.component';
import { MyMapComponent } from './components/my-map/my-map.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonsListComponent,
    PokemonCardComponent,
    PokemonDetailsComponent,
    PokemonsFiltersComponent,
    LoginComponent,
    MainLayoutComponent,
    SelectionPageComponent,
    MyMapComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
