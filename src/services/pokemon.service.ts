import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';
import { allTypes } from '../constants/pokemon-types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  selectedPokemon: Pokemon = new Pokemon();
  private readonly storageKey: string = 'selectedPokemon';
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {
    const storedPokemon = localStorage.getItem(this.storageKey);
    if (storedPokemon) {
      this.selectedPokemon = JSON.parse(storedPokemon);
    }
  }

  getTypes(): Observable<string[]> {
    return of(allTypes);
  }

  getPokemons(limit: number = 100, offset: number = 0): Observable<Pokemon[]> {
    const url = `${this.apiUrl}?limit=${limit}&offset=${offset}`;
    return this.http
      .get<{ results: { name: string; url: string }[] }>(url)
      .pipe(
        switchMap((response) => {
          const detailObservables = response.results.map((pokemon) =>
            this.getPokemon(pokemon.url).pipe(
              map((details) => this.transformPokemonData(details))
            )
          );
          return forkJoin(detailObservables);
        })
      );
  }

  private transformPokemonData(data: any): Pokemon {
    return {
      id: data.id,
      name: data.name,
      imageUrl: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
      abilities: data.abilities.map((a: any) => a.ability.name),
    };
  }

  getPokemon(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }

  setSelectedPokemon(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
    localStorage.setItem(this.storageKey, JSON.stringify(pokemon));
  }

  getSelectedPokemon() {
    return this.selectedPokemon;
  }
}
