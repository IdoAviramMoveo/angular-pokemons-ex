import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PokemonService } from '../../sevices/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrl: './pokemons-list.component.scss',
})
export class PokemonsListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  filteredPokemonsList: Pokemon[] = [];
  selectedTypes: string[] = [];
  searchFilter: string = '';

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemons = pokemons;
        this.filteredPokemonsList = [...this.pokemons];
      },
      (error) => {
        console.error('Error fetching Pokemon list', error);
      }
    );
  }

  filterPokemons(): void {
    let filteredByType =
      this.selectedTypes.length > 0
        ? this.pokemons.filter((pokemon) =>
            pokemon.types.some((type) => this.selectedTypes.includes(type))
          )
        : [...this.pokemons];

    this.filteredPokemonsList = filteredByType.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchFilter.toLowerCase())
    );
  }

  onSearch(searchTerm: string): void {
    this.searchFilter = searchTerm;
    this.filterPokemons();
  }

  onFilterChange(selectedTypes: string[]): void {
    this.selectedTypes = selectedTypes.map((type) => type.toLowerCase());
    this.filterPokemons();
  }

  selectPokemon(pokemon: Pokemon): void {
    this.pokemonService.setSelectedPokemon(pokemon);
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
