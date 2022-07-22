import { Component, OnInit } from '@angular/core';
import { faArrowsDownToPeople, faArrowUpWideShort, faBolt, faBrain, faCircleArrowUp, faCircleCheck, faCircleLeft, faCoins, faCommentSlash, faDice, faFilePen, faHandFist, faHeart, faMasksTheater, faPersonHiking, faPersonRunning, faRotate, faSackXmark, faScroll, faShield, faSlash, faWandMagic, faWandMagicSparkles, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleDot, faCircleRight } from '@fortawesome/free-regular-svg-icons';
import { CharacterService } from '../character/character.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-information-sheet',
  templateUrl: './information-sheet.component.html',
  styleUrls: ['./information-sheet.component.sass'],
  animations: [
    trigger('scaleOut', [
      transition('* => void', [
        animate('0.4s ease-in'),
        style({ transform: 'scale(0) translateY(-100%)', opacity: 0})
      ])
    ]),
    trigger('fadeInBottom', [
      transition('void => *', [
        style({ transform: 'translateY(100%)', opacity: 0}),
        animate('0.4s ease-in'),
        style({ transform: 'translateY(0%)', opacity: 1})
      ])
    ])
  ]
})
export class InformationSheetComponent implements OnInit {
  faStr = faHandFist;
  faDex = faPersonRunning;
  faCon = faHeart;
  faInt = faBrain;
  faWis = faScroll;
  faCha = faMasksTheater;
  faProfBonus = faArrowUpWideShort;
  faEdit = faFilePen;
  faSave = faCircleCheck;
  faAC = faShield;
  faMovement = faPersonHiking;
  faInitiative = faBolt;
  faHealth = faHeart;
  faSelectChar = faArrowsDownToPeople;
  faSuperProf = faCircleArrowUp;
  faYesProf = faCircleDot;
  faNoProf = faCircle;
  faRollWeapon = faDice;
  faCurrency = faCoins;
  faPoor = faSackXmark;
  faConvertRight = faCircleRight;
  faConvertLeft = faCircleLeft;
  faWand = faWandSparkles;
  faNoSpeak = faCommentSlash;

  basicEdit = false;
  statsEdit = false;
  battleEdit = false;
  otherEdit = false;

  includeElectrum = true;
  showAtkAlert = true;
  showMoneyAlert = true;

  // ------- SET TO TRUE TO RE-ENTER DATA ON LOCAL STORAGE ---------
  reenterData = false;
  // ---------------------------------------------------------------

  currentCharacterIndex: number;
  characters: any;


  constructor(private charService: CharacterService,
              private router: Router) {
    this.characters = undefined;
    this.currentCharacterIndex = 0;
  }

  ngOnInit(): void {
    if (this.reenterData) {
      localStorage.setItem('characters', JSON.stringify(this.charService.getHardcodedData()));
    }
    this.characters = this.charService.getCharacters();
    this.currentCharacterIndex = this.charService.getCurrentCharacterIndex();
    document.documentElement.style.setProperty("--duration", "2s");
  }

  getMod(stat: number): number {
    return Math.floor(stat / 2) - 5;
  }

  setCurrentCharacter(index: string) {
    this.resetAlerts();
    this.charService.setCurrentCharacterIndex(Number(index));
    this.currentCharacterIndex = Number(index);
  }

  changeHealth(change: number) {
    if (this.characters[this.currentCharacterIndex].hitPoints + change > this.characters[this.currentCharacterIndex].maxHitPoints) {
      this.characters[this.currentCharacterIndex].hitPoints = this.characters[this.currentCharacterIndex].maxHitPoints
    } else if (this.characters[this.currentCharacterIndex].hitPoints + change < 0) {
      this.characters[this.currentCharacterIndex].hitPoints = 0
    } else {
      this.characters[this.currentCharacterIndex].hitPoints += change;
    }
    this.updateInfo();
  }

  updateInfo() {
    console.log("Saving data");
    this.charService.updateCharacters(this.characters);
  }

  toggleElectrum() {
    this.includeElectrum = !this.includeElectrum;
    this.characters[this.currentCharacterIndex].currency.silver += this.characters[this.currentCharacterIndex].currency.electrum * 5;
    this.characters[this.currentCharacterIndex].currency.electrum = 0;
  }

  resetAlerts() {
    this.showAtkAlert = true;
    this.showMoneyAlert = true;
  }

  calcHealth(): string {
    if (this.characters[this.currentCharacterIndex].hitPoints == 0) {
      return '';
    }
    if (this.characters[this.currentCharacterIndex].hitPoints / this.characters[this.currentCharacterIndex].maxHitPoints < 0.5) {
      if (this.characters[this.currentCharacterIndex].hitPoints / this.characters[this.currentCharacterIndex].maxHitPoints < 0.2) {
        document.documentElement.style.setProperty("--duration", "1s");
      } else {
        document.documentElement.style.setProperty("--duration", "2s");
      }
      return 'low-health';
    }
    return '';
  }

  convertUp(currency: string) {
    if (currency === 'copper' && this.characters[this.currentCharacterIndex].currency.copper > 9) {
      this.characters[this.currentCharacterIndex].currency.silver += 1;
      this.characters[this.currentCharacterIndex].currency.copper -= 10;
    } else if (currency === 'silver' && this.includeElectrum && this.characters[this.currentCharacterIndex].currency.silver > 4) {
      this.characters[this.currentCharacterIndex].currency.electrum += 1;
      this.characters[this.currentCharacterIndex].currency.silver -= 5;
    } else if (currency === 'silver' && !this.includeElectrum && this.characters[this.currentCharacterIndex].currency.silver > 9) {
      this.characters[this.currentCharacterIndex].currency.gold += 1;
      this.characters[this.currentCharacterIndex].currency.silver -= 10;
    } else if (currency === 'electrum' && this.characters[this.currentCharacterIndex].currency.electrum > 1) {
      this.characters[this.currentCharacterIndex].currency.gold += 1;
      this.characters[this.currentCharacterIndex].currency.electrum -= 2;
    } else if (currency === 'gold' && this.characters[this.currentCharacterIndex].currency.gold > 9) {
      this.characters[this.currentCharacterIndex].currency.platinum += 1;
      this.characters[this.currentCharacterIndex].currency.gold -= 10;
    }
    this.updateInfo();
  }

  convertDown(currency: string) {
    if (currency === 'silver' && this.characters[this.currentCharacterIndex].currency.silver > 0) {
      this.characters[this.currentCharacterIndex].currency.silver -= 1;
      this.characters[this.currentCharacterIndex].currency.copper += 10;
    } else if (currency === 'electrum' && this.characters[this.currentCharacterIndex].currency.electrum > 0) {
      this.characters[this.currentCharacterIndex].currency.electrum -= 1;
      this.characters[this.currentCharacterIndex].currency.silver += 5;
    } else if (currency === 'gold' && this.includeElectrum && this.characters[this.currentCharacterIndex].currency.gold > 0) {
      this.characters[this.currentCharacterIndex].currency.gold -= 1;
      this.characters[this.currentCharacterIndex].currency.electrum += 2;
    } else if (currency === 'gold' && !this.includeElectrum && this.characters[this.currentCharacterIndex].currency.gold > 0) {
      this.characters[this.currentCharacterIndex].currency.gold -= 1;
      this.characters[this.currentCharacterIndex].currency.silver += 10;
    } else if (currency === 'plat' && this.characters[this.currentCharacterIndex].currency.platinum > 0) {
      this.characters[this.currentCharacterIndex].currency.platinum -= 1;
      this.characters[this.currentCharacterIndex].currency.gold += 10;
    }
    this.updateInfo();
  }

  convertCurrency() {
    this.characters[this.currentCharacterIndex].currency.silver += Math.floor(this.characters[this.currentCharacterIndex].currency.copper / 10);
    this.characters[this.currentCharacterIndex].currency.copper %= 10;
    if (this.includeElectrum) {
      this.characters[this.currentCharacterIndex].currency.electrum += Math.floor(this.characters[this.currentCharacterIndex].currency.silver / 5);
      this.characters[this.currentCharacterIndex].currency.silver %= 5;
    } else {
      this.characters[this.currentCharacterIndex].currency.gold += Math.floor(this.characters[this.currentCharacterIndex].currency.silver / 10);
      this.characters[this.currentCharacterIndex].currency.silver %= 10;
    }
    this.characters[this.currentCharacterIndex].currency.gold += Math.floor(this.characters[this.currentCharacterIndex].currency.electrum / 2);
    this.characters[this.currentCharacterIndex].currency.electrum %= 2;
    this.characters[this.currentCharacterIndex].currency.platinum += Math.floor(this.characters[this.currentCharacterIndex].currency.gold / 10);
    this.characters[this.currentCharacterIndex].currency.gold %= 10;
    this.updateInfo();
  }

  changeBasicInfo() {
    this.basicEdit = !this.basicEdit;
  }

  changeStats() {
    this.statsEdit = !this.statsEdit;
  }

  changeBattleStats() {
    this.battleEdit = !this.battleEdit;
  }

  numRows(input: string) {
    if (!input || (input.match(/\n/g) || [])?.length < 5) {
      return 5;
    } else if ((input.match(/\n/g) || [])?.length > 23) {
      return 24;
    }
    return (input.match(/\n/g) || []).length + 1;
  }

  changeOtherInfo() {
    this.otherEdit = !this.otherEdit;
    this.updateInfo();
  }
}
