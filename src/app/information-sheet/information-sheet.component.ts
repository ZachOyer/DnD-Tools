import { Component, OnInit } from '@angular/core';
import { faArrowsDownToPeople, faArrowUpWideShort, faBolt, faBrain, faCircleCheck, faFilePen, faFloppyDisk, faHandFist, faHatWizard, faHeart, faHeartPulse, faMasksTheater, faPencil, faPencilAlt, faPencilSquare, faPersonHiking, faPersonRunning, faScroll, faShield, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
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
  }

  getMod(stat: number): number {
    return Math.floor(stat / 2) - 5;
  }

  setCurrentCharacter(index: string) {
    this.charService.setCurrentCharacterIndex(Number(index));
    this.currentCharacterIndex = Number(index);
  }

  changeBasicInfo() {
    console.log("Trying to change basic info")
    this.basicEdit = !this.basicEdit;
  }

  changeStats() {
    console.log("Trying to change stats")
    this.statsEdit = !this.statsEdit;
  }

  changeBattleStats() {
    console.log("Trying to change battle stats")
    this.battleEdit = !this.battleEdit;
  }

  changeOtherInfo() {
    console.log("Trying to change other info")
    this.otherEdit = !this.otherEdit;
  }
}
