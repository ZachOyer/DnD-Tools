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
      alignment: null,
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
    }
    ];
    return {characters};
  }
}
