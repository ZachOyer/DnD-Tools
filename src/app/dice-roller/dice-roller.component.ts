import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faArrowUp, faArrowUp91, faDiceD20, faDragon, faDungeon } from '@fortawesome/free-solid-svg-icons';
import { __values } from 'tslib';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.sass'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({opacity: 0, transform: 'translateX(-15px)'}),
        animate('0.2s')
      ]),
      transition('* => void', [
        animate('0.2s', style({ opacity: 0}))
      ])
    ])
  ]
})
export class DiceRollerComponent implements OnInit {
  faModifier = faArrowUp91;
  faDungeon = faDungeon;
  faDragon = faDragon;

  diceSize: number = 20;
  description: string = "";
  diceValue: number = -100;
  criticalHit: boolean = false;
  criticalMiss: boolean = false;
  modifier: number = 0;
  rollType: string = 'ok'
  constructor() { }

  ngOnInit(): void {
  }

  setDiceSize(size: number) {
    this.diceSize = size;
  }

  getRoll(): number {
    return Math.floor(Math.random() * this.diceSize) + 1;
  }

  checkTags(value: number) {
    this.criticalHit = false;
    this.criticalMiss = false;
    if (value === this.diceSize) {
      this.criticalHit = true;
    }
    if (value === 1) {
      this.criticalMiss = true;
    }
    if (this.modifier === null) this.modifier = 0;
  }

  setRollType() {
    if (this.diceValue / this.diceSize < 0.5) {
      this.rollType = "border-danger"
    } else if (this.diceValue / this.diceSize > 0.8) {
      this.rollType = "border-success"
    } else {
      this.rollType = "border-info"
    }
  }

  rollDice() {
    let roll = this.getRoll();
    if (this.diceSize === 20){
      this.checkTags(roll);
    }
    this.diceValue = roll + this.modifier;
    this.description = `${roll} + ${this.modifier} = ${this.diceValue}`;
    this.setRollType();
  }

  rollAdvantage() {
    let firstRoll = this.getRoll();
    let secondRoll = this.getRoll();
    if (this.diceSize === 20) {
      this.checkTags(Math.max(firstRoll, secondRoll));
    }
    this.diceValue = Math.max(firstRoll, secondRoll) + this.modifier;
    this.description = `max ( ${firstRoll} , ${secondRoll} ) + ${this.modifier} = ${this.diceValue}`
    this.setRollType();
  }

  rollDisadvantage() {
    let firstRoll = this.getRoll();
    let secondRoll = this.getRoll();
    if (this.diceSize === 20) {
      this.checkTags(Math.min(firstRoll, secondRoll));
    }
    this.diceValue = Math.min(firstRoll, secondRoll) + this.modifier;
    this.description = `min ( ${firstRoll} , ${secondRoll} ) + ${this.modifier} = ${this.diceValue}`
    this.setRollType();
  }

}
