import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemons-filters',
  templateUrl: './pokemons-filters.component.html',
  styleUrls: ['./pokemons-filters.component.scss'],
})
export class PokemonsFiltersComponent implements OnInit {
  searchTerm: string = '';
  selectedTypes: { [key: string]: boolean } = {};
  types: string[] = [];

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string[]>();

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getTypes().subscribe((types) => {
      this.types = types;
      this.types.forEach((type) => (this.selectedTypes[type] = false));
    });
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onFilterChange() {
    const activeFilters: string[] = this.types.filter(
      (type) => this.selectedTypes[type]
    );
    this.filter.emit(activeFilters);
  }
}
