import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Pokemon } from './pokemon.model';
import { DUMMY_POKEMONS } from './pokemons-dummy-data';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonsUrl = ''; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getPokemons(): Observable<Pokemon[]> {
    // For now, I return an observable of the dummy data
    return of(DUMMY_POKEMONS);
  }

  constructor(private http: HttpClient) {}
}
