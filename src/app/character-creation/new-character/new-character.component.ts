import { animate, style, transition, trigger } from '@angular/animations';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { faBrain, faChevronLeft, faChevronRight, faDiceOne, faDiceTwo, faHandFist, faHeart, faMasksTheater, faPersonRunning, faScroll } from '@fortawesome/free-solid-svg-icons';
import { elementAt } from 'rxjs';
import { BootstrapService } from 'src/app/services/bootstrap.service';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.sass'],
  animations: [
    trigger('fadeInBottom', [
      transition('void => *', [
        style({ opacity: 0, translate: '0px 10px'}),
        animate('0.4s ease-out'),
        style({ opacity: 1, translate: 'none' })
      ])
    ]),
    trigger('fadeInTop', [
      transition('void => *', [
        style({ opacity: 0, translate: '0px -10px'}),
        animate('0.4s ease-out'),
        style({ opacity: 1, translate: 'none' })
      ])
    ]),
    trigger('flattenInOut', [
      transition('* => void', [
        animate('0.4s ease-in-out'),
        style({ height: '0px', margin: '0px', opacity: 0 })
      ]),
      transition('void => *', [
        style({ height: '0px', margin: '0px', opacity: 0 }),
        animate('0.4s ease-in-out')
      ])
    ]),
  ]
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

  unassigned: number[] = [15, 14, 13, 12, 10, 8];
  strength: number[] = [];
  dexterity: number[] = [];
  constitution: number[] = [];
  intelligence: number[] = [];
  wisdom: number[] = [];
  charisma: number[] = [];

  currentStep = 1;

  constructor(private bs: BootstrapService) { }

  ngOnInit(): void {
    this.bs.initializeTooltips();
  }

  rollStats() {
    // Clear all the current assignments
    this.unassigned = [];
    this.strength = [];
    this.dexterity = [];
    this.constitution = [];
    this.intelligence = [];
    this.wisdom = [];
    this.charisma = [];

    let rolls: number[] = [];
    let minRoll: number = 999;
    let total: number = 0;

    // Do 6 times - one for each stat score
    for (let i = 0; i < 6; i++) {
      // Reset the data
      minRoll = 999;
      total = 0;

      // roll 4 6-sided die
      rolls = [this.rollDice(6), this.rollDice(6), this.rollDice(6), this.rollDice(6)];

      // Go through the rolls and total the 3 highest rolls
      rolls.forEach((element, index) => {
        if (index === 0) {
          minRoll = element;
        } else if (element < minRoll) {
          // If the current roll is less than the previous min roll, add the previous min roll to the total and set the current roll as the new min roll
          total = total + minRoll;
          minRoll = element;
        } else {
          // If the current roll is greater than the previous min roll, add it to the total
          total += element;
        }
      })

      this.unassigned.push(total);
    }
  }

  useStandardSet() {
    this.unassigned = [15, 14, 13, 12, 10, 8];
    this.strength = [];
    this.dexterity = [];
    this.constitution = [];
    this.intelligence = [];
    this.wisdom = [];
    this.charisma = [];
  }

  rollDice(size: number): number {
    return Math.floor(Math.random() * size) + 1;
  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // If transfering to a list that isn't the unassignedList and the list already contains an item, swap the items
      if (event.container.element.nativeElement.id !== 'unassignedDropList' && event.container.data.length > 0) {
        transferArrayItem(event.container.data,
          event.previousContainer.data,
          0,
          event.currentIndex + 1
        )
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
