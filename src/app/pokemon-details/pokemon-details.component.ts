import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {
    this.pokemon = {
      id: 0,
      name: '',
      imageUrl: '',
      types: [],
      abilities: [],
    };
  }

  ngOnInit(): void {
    const storedPokemon = localStorage.getItem('selectedPokemon');
    this.pokemon = storedPokemon
      ? JSON.parse(storedPokemon)
      : {
          id: 0,
          name: '',
          imageUrl: '',
          types: [],
          abilities: [],
        };
  }
}
