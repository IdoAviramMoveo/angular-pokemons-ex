import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  private searchHistory: string[] = [];
  private readonly maxHistoryLength: number = 5;
  private readonly storageKey: string = 'searchHistory';

  constructor() {
    this.loadSearchHistory();
  }

  addSearchedPokemons(pokemonName: string): void {
    const existingIndex = this.searchHistory.indexOf(pokemonName);
    if (existingIndex !== -1) {
      this.searchHistory.splice(existingIndex, 1);
    }
    this.searchHistory.unshift(pokemonName);
    this.searchHistory = this.searchHistory.slice(0, this.maxHistoryLength);
    localStorage.setItem(this.storageKey, JSON.stringify(this.searchHistory));
  }

  getSearchHistory(): string[] {
    return this.searchHistory;
  }

  private loadSearchHistory(): void {
    const historyFromStorage = localStorage.getItem(this.storageKey);
    if (historyFromStorage) {
      this.searchHistory = JSON.parse(historyFromStorage);
    }
  }
}
