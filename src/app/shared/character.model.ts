import { Attack } from "./attack";

export interface Character {
  // Basic info
  id: number;
  name: string;
  class: string;
  level: number;
  background?: string;
  race: string;
  alignment?: string;
  xp?: number;

  // Stats
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;

  // Battle stats
  maxHitPoints: number;
  hitPoints: number;
  armorClass: number;
  initiative: number;
  speed: number;

  // Other info
  attacks?: Attack[];
  currency?: {
    copper: number;
    silver: number;
    electrum: number;
    gold: number;
    platinum: number;
  };
  equipment?: string[];
  traits?: string[];
  proficiencies: {
    acrobatics: number;
    animalHandling: number;
    arcana: number;
    athletics: number;
    deception: number;
    history: number;
    insight: number;
    intimidation: number;
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number;
    sleightOfHand: number;
    stealth: number;
    survival: number;
  };
  skills?: string[];
  languages?: string[];


}
