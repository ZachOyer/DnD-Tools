import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../shared/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private charactersUrl = 'api/characters/'

  thisShouldWork: any;
  currentCharacterIndex: number = 0;

  constructor(private http: HttpClient) { }

  getCharacters() {
    return JSON.parse(localStorage.getItem('characters') || '{}');
  }

  editCharacters(updateChar: Character) {
  }

  setCurrentCharacterIndex(index: number) {
    this.currentCharacterIndex = index;
  }

  getCurrentCharacterIndex(): number {
    return this.currentCharacterIndex;
  }


}
