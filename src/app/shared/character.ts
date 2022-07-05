 import { Attack } from "./attack";

export interface Character {
  // Basic info
  name: string;
  class: string;
  level: number;
  background?: string | null;
  race: string | null;
  alignment?: string | null;

  // Stats
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencyBonus: number;

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
  proficiencies?: {
    acrobatics: boolean;
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean;
    deception: boolean;
    history: boolean;
    insight: boolean;
    intimidation: boolean;
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean;
    sleightOfHand: boolean;
    stealth: boolean;
    survival: boolean;
  };
  skills?: string[];
  languages?: string[];


}
