import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemCharService implements InMemoryDbService {
  createDb() {
    let characters = [
      {
      id: 0,
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
      proficiencyBonus: 2,
      maxHitPoints: 37,
      hitPoints: 37,
      armorClass: 13,
      initiative: 0,
      speed: 30
    },
    {
      id: 1,
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
      proficiencyBonus: 2,
      maxHitPoints: 25,
      hitPoints: 25,
      armorClass: 16,
      initiative: 8,
      speed: 25
    },
    {
      id: 2,
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
      proficiencyBonus: 2,
      maxHitPoints: 45,
      hitPoints: 45,
      armorClass: 16,
      initiative: 10,
      speed: 30
    }
    ];
    return {characters};
  }
}
