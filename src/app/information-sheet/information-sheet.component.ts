import { Component, OnInit } from '@angular/core';
import { faArrowUpWideShort, faBolt, faBrain, faFilePen, faHandFist, faHatWizard, faHeart, faHeartPulse, faMasksTheater, faPencil, faPencilAlt, faPencilSquare, faPersonHiking, faPersonRunning, faScroll, faShield, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Character } from '../shared/character.model';
import { CharacterService } from '../character/character.service';

@Component({
  selector: 'app-information-sheet',
  templateUrl: './information-sheet.component.html',
  styleUrls: ['./information-sheet.component.sass']
})
export class InformationSheetComponent implements OnInit {
  private charactersUrl = 'api/characters/'

  faStr = faHandFist;
  faDex = faPersonRunning;
  faCon = faHeart;
  faInt = faBrain;
  faWis = faScroll;
  faCha = faMasksTheater;
  faProfBonus = faArrowUpWideShort;
  faEdit = faFilePen;
  faAC = faShield;
  faMovement = faPersonHiking;
  faInitiative = faBolt;
  faHealth = faHeart;

  currentCharacterIndex: number;
  currentCharacter: any;


  constructor(private http: HttpClient,
              private charService: CharacterService) {
    this.currentCharacter = undefined;
    this.currentCharacterIndex = 0;
  }

  ngOnInit(): void {
    this.charService.getCharacters().subscribe((data: Character[]) => {
      this.currentCharacter = data[this.currentCharacterIndex];
    })
  }

  testChange() {
    this.currentCharacter.name = "Thunker"
    this.charService.editCharacters(this.currentCharacter)
  }
}
