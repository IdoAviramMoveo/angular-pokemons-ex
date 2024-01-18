import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  selectedPokemon: Pokemon = new Pokemon();
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  private allTypes: string[] = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
  ];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    const storedPokemon = localStorage.getItem('selectedPokemon');
    if (storedPokemon) {
      this.selectedPokemon = JSON.parse(storedPokemon);
    }
  }

  getTypes(): Observable<string[]> {
    return of(this.allTypes);
  }

  getPokemons(
    limit: number = 100,
    offset: number = 0
  ): Observable<{ name: string; url: string }[]> {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http.get<{ name: string; url: string }[]>(url);
  }

  getPokemon(url: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(url);
  }

  setSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    localStorage.setItem('selectedPokemon', JSON.stringify(pokemon));
  }

  getSelectedPokemon() {
    return this.selectedPokemon;
  }
}
