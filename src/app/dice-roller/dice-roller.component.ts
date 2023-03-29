import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { faArrowUp91, faCubes, faDragon, faDungeon } from '@fortawesome/free-solid-svg-icons';
import { __values } from 'tslib';
import { RollAttackService } from '../services/roll-attack.service';

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
  faRolls = faCubes;

  rolls: number[] = [0, 0, 0, 0, 0, 0];
  numRolls: number = 1;
  diceSize: number = 20;
  description: string = "";
  diceValue: number = -100;
  criticalHit: boolean = false;
  criticalMiss: boolean = false;
  modifier: number = 0;
  rollType: string = 'ok'
  constructor(private rollAttack: RollAttackService) { }

  ngOnInit(): void {
    if (this.rollAttack.getDiceSize()) {
      this.diceSize = this.rollAttack.getDiceSize();
    }
    if (this.rollAttack.getNumDice()) {
      this.numRolls = this.rollAttack.getNumDice();
    }
    if (this.rollAttack.getModifier()) {
      this.modifier = this.rollAttack.getModifier();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.rollAttack.clearData();
  }

  setDiceSize(size: number) {
    this.diceSize = size;
  }

  getRoll(): number {
    return Math.floor(Math.random() * this.diceSize) + 1;
  }

  checkTags(value: number) {
    if (value === this.diceSize) {
      this.criticalHit = true;
    }
    if (value === 1) {
      this.criticalMiss = true;
    }
    if (this.modifier === null) this.modifier = 0;
  }

  setRolls(value: string) {
    this.numRolls = Number(value);
  }

  setRollType() {
    if (this.diceValue / (this.diceSize * this.numRolls) < 0.5) {
      this.rollType = "border-danger"
    } else if (this.diceValue / (this.diceSize * this.numRolls) > 0.8) {
      this.rollType = "border-success"
    } else {
      this.rollType = "border-info"
    }
  }

  rollDice() {
    this.criticalHit = false;
    this.criticalMiss = false;
    this.diceValue = 0;
    this.description = '';

    for (let i = 0; i < this.numRolls; i++) {
      if (i > 0) {
        this.description += ' + '
      }
      this.rolls[i] = this.getRoll();
      this.diceValue += this.rolls[i]
      this.description += `${this.rolls[i]}`
    }
    if (this.diceSize === 20 && this.numRolls === 1){
      this.checkTags(this.rolls[0]);
    }
    this.diceValue += this.modifier;
    this.setRollType();
  }

  rollAdvantage() {
    this.criticalHit = false;
    this.criticalMiss = false;
    let firstRoll = this.getRoll();
    let secondRoll = this.getRoll();
    if (this.diceSize === 20) {
      this.checkTags(Math.max(firstRoll, secondRoll));
    }
    this.diceValue = Math.max(firstRoll, secondRoll) + this.modifier;
    this.description = `max ( ${firstRoll} , ${secondRoll} )`
    this.setRollType();
  }

  rollDisadvantage() {
    this.criticalHit = false;
    this.criticalMiss = false;
    let firstRoll = this.getRoll();
    let secondRoll = this.getRoll();
    if (this.diceSize === 20) {
      this.checkTags(Math.min(firstRoll, secondRoll));
    }
    this.diceValue = Math.min(firstRoll, secondRoll) + this.modifier;
    this.description = `min ( ${firstRoll} , ${secondRoll} )`
    this.setRollType();
  }

}
