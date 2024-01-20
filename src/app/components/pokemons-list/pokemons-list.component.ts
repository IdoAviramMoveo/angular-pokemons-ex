import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../../../services/pokemon.service';
import { SearchHistoryService } from '../../../services/search-history.service';
import { Pokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.scss',
})
export class PokemonsListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  selectedTypes: string[] = [];
  searchFilter: string = '';

  constructor(
    private pokemonService: PokemonService,
    private searchHistoryService: SearchHistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
      },
      (error) => {
        console.error('Error fetching Pokemon list', error);
      }
    );
  }

  filterPokemons(): Pokemon[] {
    const typeFilteredPokemons =
      this.selectedTypes.length > 0
        ? this.pokemons.filter((pokemon) =>
            pokemon.types.some((type) => this.selectedTypes.includes(type))
          )
        : this.pokemons;

    return typeFilteredPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }

  onSearch(searchTerm: string): void {
    this.searchFilter = searchTerm;
    //this.filterPokemons();
  }

  onFilterChange(selectedTypes: string[]): void {
    this.selectedTypes = selectedTypes.map((type) => type.toLowerCase());
    //this.filterPokemons();
  }

  selectPokemon(pokemon: Pokemon): void {
    if (this.searchFilter) {
      this.searchHistoryService.addSearchedPokemons(pokemon.name);
    }
    this.pokemonService.setSelectedPokemon(pokemon);
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  getSearchHistory(): string[] {
    return this.searchHistoryService.getSearchHistory();
  }
}
