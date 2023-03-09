import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../shared/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  currentCharacterIndex: number = 0;
  characters: Character[] = [
    {
    name: "Thunk",
    class: "Barbarian",
    level: 3,
    background: "Courtier",
    race: "Drow",
    strength: 18,
    dexterity: 10,
    constitution: 18,
    intelligence: 10,
    wisdom: 10,
    charisma: 16,
    maxHitPoints: 37,
    hitPoints: 37,
    armorClass: 13,
    initiative: 0,
    speed: 30,
    proficiencies: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 0,
      athletics: 1,
      deception: 0,
      history: 0,
      insight: 1,
      intimidation: 1,
      investigation: 0,
      medicine: 2,
      nature: 0,
      perception: 2,
      performance: 0,
      persuasion: 1,
      religion: 0,
      sleightOfHand: 0,
      stealth: 0,
      survival: 0,
    },
    attacks: [
      {
        name: "Great Axe",
        range: 5,
        atkBonus: 6,
        rolls: 1,
        damageDice: 12,
        damageBonus: 4,
        type: "Slashing"
      },
      {
        name: "Hand Axe",
        range: 50,
        atkBonus: 6,
        rolls: 1,
        damageDice: 6,
        damageBonus: 4,
        type: "Slashing"
      },
      {
        name: "Javelin",
        range: 50,
        atkBonus: 6,
        rolls: 1,
        damageDice: 6,
        damageBonus: 4,
        type: "Piercing"
      },
      {
        name: "Bite",
        range: 5,
        atkBonus: 6,
        rolls: 1,
        damageDice: 6,
        damageBonus: 4,
        type: "Piercing"
      },
      {
        name: "Claws",
        range: 5,
        atkBonus: 6,
        rolls: 2,
        damageDice: 6,
        damageBonus: 4,
        type: "Slashing"
      },
      {
        name: "Tail",
        range: 5,
        atkBonus: 6,
        rolls: 1,
        damageDice: 6,
        damageBonus: 4,
        type: "Piercing"
      },
    ],
    currency: {
      copper: 0,
      silver: 7,
      electrum: 0,
      gold: 88,
      platinum: 0
    },
    equipment: "Great Axe\n2 Hand Axes\nExplorers Pack\n4 Javelins\nFine Clothes",
    traits: "",
    languages: [
      "Common",
      "Elvish",
      "Undercommon",
      "Celestial",
      "Dwarvish",
    ]
  },
  {
    name: "Grass",
    class: "Mage",
    level: 3,
    background: "Dummy",
    race: "Gnome",
    xp: 0,
    strength: 10,
    dexterity: 10,
    constitution: 14,
    intelligence: 20,
    wisdom: 14,
    charisma: 8,
    maxHitPoints: 25,
    hitPoints: 25,
    armorClass: 16,
    initiative: 8,
    speed: 25,
    proficiencies: {
      acrobatics: 0,
      animalHandling: 1,
      arcana: 2,
      athletics: 0,
      deception: 0,
      history: 1,
      insight: 1,
      intimidation: 0,
      investigation: 1,
      medicine: 0,
      nature: 0,
      perception: 1,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 1,
      survival: 1,
    },
    attacks: [],
    currency: {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0
    },
    equipment: "",
    traits: "",
    languages: []
  },
  {
    name: "Mae",
    class: "Paladin",
    level: 5,
    background: "She cool",
    race: "Elf",
    alignment: "good",
    xp: 3,
    strength: 14,
    dexterity: 9,
    constitution: 14,
    intelligence: 8,
    wisdom: 15,
    charisma: 14,
    maxHitPoints: 45,
    hitPoints: 45,
    armorClass: 16,
    initiative: 10,
    speed: 30,
    proficiencies: {
      acrobatics: 0,
      animalHandling: 0,
      arcana: 1,
      athletics: 1,
      deception: 0,
      history: 0,
      insight: 1,
      intimidation: 1,
      investigation: 0,
      medicine: 0,
      nature: 0,
      perception: 1,
      performance: 0,
      persuasion: 0,
      religion: 0,
      sleightOfHand: 0,
      stealth: 1,
      survival: 0,
    },
    attacks: [],
    currency: {
      copper: 7,
      silver: 2,
      electrum: 0,
      gold: 85,
      platinum: 2
    },
    equipment: "",
    languages: [
      "Common",
      "Elvish"
    ],
    traits: "Fey Ancestry\nDark Vision",
  }
  ];

  constructor(private http: HttpClient) { }

  updateCharacters(input: Array<Character>) {
    localStorage.setItem('characters', JSON.stringify(input));
  }

  getCharacters() {
    return JSON.parse(localStorage.getItem('characters') || '{}');
  }

  // editCharacters(updateChar: Character) {
  // }

  setCurrentCharacterIndex(index: number) {
    this.currentCharacterIndex = index;
    localStorage.setItem('currCharIndex', JSON.stringify(index));
  }

  getCurrentCharacterIndex(maxLength: number): number {
    if (localStorage.getItem('currCharIndex')) {
      let index = JSON.parse(localStorage.getItem('currCharIndex') || '0');
      // Check to see if the index is out of bounds
      // Error handling in case the local storage data has been tampered with
      if (index < 0 || index >= maxLength) {
        return 0;
      } else {
        return index;
      }
    } else {
      return this.currentCharacterIndex;
    }
  }

  getHardcodedData() {
    return this.characters;
  }

}
