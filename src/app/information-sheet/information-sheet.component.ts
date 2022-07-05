import { Component, OnInit } from '@angular/core';
import { faArrowUpWideShort, faBrain, faFilePen, faHandFist, faHatWizard, faHeart, faMasksTheater, faPencil, faPencilAlt, faPencilSquare, faPersonRunning, faScroll, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { Character } from '../shared/character';

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

  currentCharacter: any;


  constructor(private http: HttpClient) {
    this.currentCharacter = undefined;
  }

  ngOnInit(): void {
    this.getCharacterInfo();
  }

  getCharacterInfo() {
    this.http.get('../assets/character-info.json')
    .subscribe((resp: any) => {
      this.currentCharacter = <Character>(resp.characters[0]);
    }
    )
  }

}
