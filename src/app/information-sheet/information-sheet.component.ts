import { Component, OnInit } from '@angular/core';
import { faArrowUpWideShort, faBrain, faFilePen, faHandFist, faHatWizard, faHeart, faMasksTheater, faPencil, faPencilAlt, faPencilSquare, faPersonRunning, faScroll, faShieldHalved } from '@fortawesome/free-solid-svg-icons';

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


  constructor() { }

  ngOnInit(): void {
  }

}
