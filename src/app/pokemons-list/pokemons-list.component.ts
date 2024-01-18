import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

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
      (data: any) => {
        const pokemonsList: { name: string; url: string }[] = data.results;
        const detailObservables = pokemonsList.map((pokemon) =>
          this.pokemonService.getPokemon(pokemon.url)
        );

        forkJoin(detailObservables).subscribe((pokemonsDetails) => {
          this.pokemons = pokemonsDetails.map((data: any) => ({
            id: data.id,
            name: data.name,
            imageUrl: data.sprites.front_default,
            types: data.types,
            abilities: data.abilities.map(
              (ability: { ability: { name: string; url: string } }) =>
                ability.ability.name
            ),
          }));

          this.pokemons.sort((a, b) => a.id - b.id);

          this.filteredPokemonsList = [...this.pokemons];
        });
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
            pokemon.types.some((type: any) => {
              return this.selectedTypes.includes(type.type.name);
            })
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
