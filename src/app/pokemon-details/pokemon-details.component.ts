import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon = new Pokemon();

  constructor() {}

  ngOnInit(): void {
    const storedPokemon = localStorage.getItem('selectedPokemon');
    this.pokemon = storedPokemon ? JSON.parse(storedPokemon) : this.pokemon;

    console.log(this.pokemon);
  }
}
