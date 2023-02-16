import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { faArrowLeftLong, faArrowRight, faArrowRightLong, faArrowTurnUp, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Character } from 'src/app/shared/character.model';


@Component({
  selector: 'app-edit-other-info',
  templateUrl: './edit-other-info.component.html',
  styleUrls: ['./edit-other-info.component.sass'],
  animations: [
    trigger('languageAnim', [
      transition('* => void', [
        animate('0.4s ease-in'),
        style({ transform: 'scale(0.5)', opacity: 0})
      ]),
      transition('void => *', [
        style({ transform: 'translateY(10%)', opacity: 0}),
        animate('0.4s ease-in')
      ])
    ]),
    trigger('fadeInBottom', [
      transition('void => *', [
        style({ transform: 'translateY(100%)', opacity: 0}),
        animate('0.4s 0.4s ease-out'),
        style({ transform: 'translateY(0%)', opacity: 1})
      ])
    ])
  ]
})
export class EditOtherInfoComponent implements OnInit {
  faClose = faXmark;
  faAdd = faPlus;
  faRemove = faTrash;
  faAutoFill = faArrowLeftLong;
  faRightArrow = faArrowRightLong;

  title = '';
  character: Character | null = null;
  openToTab = 0;

  newLanguage = '';
  languages = ["Abyssal", "Aquan", "Auran", "Celestial", "Common", "Deep Speech", "Draconic", "Druidic", "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Gnoll", "Halfling", "Ignan", "Infernal", "Orc", "Primordial", "Sylvan", "Terran", "Undercommon"];
  filteredLanguages: string[] = [];

  @Output() updateBattleStats = new EventEmitter();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      if (this.openToTab === 1) {
        // console.log("Opening to Attacks");
        document.getElementById('attacksTab')?.click();
      } else if (this.openToTab === 2) {
        document.getElementById('languagesTab')?.click();
      }
      this.fitlerLanguages();
      // document.getElementById('firstInput')?.focus();
      const titleToSet = 'Edit Other Info';
      for (let i = 0; i < titleToSet.length; i++) {
        setTimeout(() => {
          this.title = titleToSet.slice(0, i + 1);
          if (i === (titleToSet.length + 1)) {
          }
        }, (i * 100))
      }
    }, 0);
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveInfo() {
    this.updateBattleStats.emit(this.character);
    this.closeModal();
  }

  addLanguage(newLanguage?: string) {
    const ele = document.getElementById('add-icon');
    if (ele) {
      ele.classList.add('spin')
      ele.addEventListener('animationend', () => {
        ele.classList.remove('spin');
      });
    }

    if (this.character !== null) {
      let languageToAdd = '';
      if (newLanguage) {
        languageToAdd = newLanguage;
      } else if (this.newLanguage !== '') {
        languageToAdd = this.newLanguage;
        this.newLanguage = '';
      } else {
        return;
      }

      if (this.character?.languages) {
        if (!this.character.languages.includes(languageToAdd)) {
          this.character.languages.push(languageToAdd);
        }
      } else {
          this.character.languages = [];
          this.character.languages.push(languageToAdd);
      }
      this.fitlerLanguages();
    }
  }

  removeLanguage(index: number) {
    this.character?.languages?.splice(index, 1);
    this.fitlerLanguages();
  }

  fitlerLanguages() {
    this.filteredLanguages = this.languages.filter((element: string) => {
        return ((element.toLowerCase().indexOf(this.newLanguage.toLowerCase()) !== -1) && !this.character?.languages?.includes(element));
      });
  }
}
