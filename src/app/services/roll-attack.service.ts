import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RollAttackService {
  diceSize: any = null;
  numDice: any = null;
  modifier: any = null;


  constructor() { }

  clearData() {
    this.diceSize = null;
    this.numDice = null;
    this.modifier = null;
  }

  setDiceSize(newSize: number) {
    this.diceSize = newSize;
  }

  setNumDice(newNum: number) {
    this.numDice = newNum;
  }

  setModifier(newModifier: number) {
    this.modifier = newModifier;
  }

  getDiceSize() {
    return this.diceSize;
  }

  getNumDice() {
    return this.numDice;
  }

  getModifier() {
    return this.modifier;
  }
}
