
import { Component, OnInit } from '@angular/core';
import { faBrain, faChevronLeft, faChevronRight, faDiceOne, faDiceTwo, faHandFist, faHeart, faMasksTheater, faPersonRunning, faScroll } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.sass']
})
export class NewCharacterComponent implements OnInit {
  faStep1 = faDiceOne;
  faStep2 = faDiceTwo;
  faStr = faHandFist;
  faDex = faPersonRunning;
  faCon = faHeart;
  faInt = faBrain;
  faWis = faScroll;
  faCha = faMasksTheater;
  faLeft = faChevronLeft;
  faRight = faChevronRight;

  rolledPool = [];

  constructor() { }

  ngOnInit(): void {
  }

  rollStats() {

  }

}
