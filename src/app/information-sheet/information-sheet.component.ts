import { Component, OnInit } from '@angular/core';
import { faArrowsDownToPeople, faArrowUpWideShort, faBolt, faBrain, faCircleArrowUp, faCircleCheck, faFilePen, faHandFist, faHeart, faMasksTheater, faPersonHiking, faPersonRunning, faScroll, faShield } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';
import { CharacterService } from '../character/character.service';

@Component({
  selector: 'app-information-sheet',
  templateUrl: './information-sheet.component.html',
  styleUrls: ['./information-sheet.component.sass']
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

  basicEdit = false;
  statsEdit = false;
  battleEdit = false;
  otherEdit = false;

  currentCharacterIndex: number;
  characters: any;


  constructor(private http: HttpClient,
              private charService: CharacterService) {
    this.characters = undefined;
    this.currentCharacterIndex = 0;
  }

  ngOnInit(): void {
    this.characters = this.charService.getCharacters();
    this.currentCharacterIndex = this.charService.getCurrentCharacterIndex();
    document.documentElement.style.setProperty("--duration", "2s");
  }

  getMod(stat: number): number {
    return Math.floor(stat / 2) - 5;
  }

  setCurrentCharacter(index: string) {
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

  changeBasicInfo() {
    this.basicEdit = !this.basicEdit;
  }

  changeStats() {
    this.statsEdit = !this.statsEdit;
  }

  changeBattleStats() {
    this.battleEdit = !this.battleEdit;
  }

  changeOtherInfo() {
    this.otherEdit = !this.otherEdit;
  }
}
