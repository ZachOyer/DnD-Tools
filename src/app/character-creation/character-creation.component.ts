import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowDown, faChevronLeft, faChevronRight, faPersonRays, faShare, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CharacterService } from '../services/character.service';
import { Character } from '../shared/character.model';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.sass'],
  animations: [
    trigger('fadeInBottom', [
      transition('void => *', [
        style({ opacity: 0, translate: '0px 10px'}),
        animate('0.4s 0.4s ease-out'),
        style({ opacity: 1, translate: 'none' })
      ])
    ]),
    trigger('fadeInTop', [
      transition('void => *', [
        style({ opacity: 0, translate: '0px -10px'}),
        animate('0.4s 0.4s ease-out'),
        style({ opacity: 1, translate: 'none' })
      ])
    ]),
  ]
})
export class CharacterCreationComponent implements OnInit {
  faBack = faShare;
  faPredef = faUserGear;
  faNewChar = faPersonRays;
  faPrev = faChevronLeft;
  faNext = faChevronRight;
  faDownArrow = faArrowDown;

  charIndex = 0;
  characters: Array<Character> = [];

  constructor(private router: Router,
              private charService: CharacterService,
              private bsModalRef: BsModalRef,
              private bsModalService: BsModalService,
              private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.characters = this.charService.getCharacters();
    this.charIndex = this.charService.getCurrentCharacterIndex(this.characters.length);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.styleCards();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.charService.updateCharacters(this.characters);
    this.charService.setCurrentCharacterIndex(this.charIndex);
  }

  styleCards() {
    let offset = "";
    Array.from(document.getElementsByClassName('character-card')).forEach((element, index) => {
      offset = "left: " + (((index - this.charIndex) * 50) + 50) + "%";
      if (index !== this.charIndex) {
        offset = offset + "; filter: blur(5px); transform: translate(-50%, " + (-50 - (25 * Math.abs(index - this.charIndex))) + "%) scale(0.8) rotateY(" + (50 * (index - this.charIndex)) + "deg) rotateZ(" + (-5 * (index - this.charIndex)) + "deg)";
      }
      element.setAttribute('style', offset)
    })
    // this.ref.detectChanges();
    // console.log("--------------------")
  }

  nextCharacter() {
    if (this.charIndex < this.characters.length - 1) {
      this.charIndex++;
      this.styleCards();
    }
  }

  prevCharacter() {
    if (this.charIndex > 0) {
      this.charIndex--;
      this.styleCards();
    }
  }

  selectCharacter(index: number) {
    this.charService.setCurrentCharacterIndex(index);
    this.router.navigateByUrl('/info-sheet');
  }

  deleteCharacter(index: number) {
    this.bsModalRef = this.bsModalService.show(ConfirmModalComponent, {class: 'modal-md modal-dialog-centered', backdrop: 'static'});
    this.bsModalRef.content.characterName = this.characters[index].name;
    this.bsModalRef.content.response.subscribe((resp: boolean) => {
      if (resp) {
        this.characters.splice(index, 1);
        this.ref.detectChanges();
        if (this.charIndex > this.characters.length - 1) {
          this.prevCharacter();
        } else {
          this.styleCards();
        }
        this.ref.detectChanges();
        this.charService.updateCharacters(this.characters);
      }
    })
  }

}
