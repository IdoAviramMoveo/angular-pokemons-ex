export class Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  abilities: string[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.imageUrl = '';
    this.types = [];
    this.abilities = [];
  }
}
