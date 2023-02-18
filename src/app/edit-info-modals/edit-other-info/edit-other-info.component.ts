import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { faArrowLeftLong, faArrowRight, faArrowRightLong, faArrowTurnUp, faDownLong, faPlus, faTrash, faUpLong, faXmark } from '@fortawesome/free-solid-svg-icons';
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
  faImprove = faUpLong;
  faWorsen = faDownLong;

  title = '';
  character: Character | null = null;
  openToTab = 0;

  newLanguage = '';
  languages = ["Abyssal", "Aquan", "Auran", "Celestial", "Common", "Deep Speech", "Draconic", "Druidic", "Dwarvish", "Elvish", "Giant", "Gnomish", "Goblin", "Gnoll", "Halfling", "Ignan", "Infernal", "Orc", "Primordial", "Sylvan", "Terran", "Undercommon"];
  filteredLanguages: string[] = [];

  @Output() updateOtherInfo = new EventEmitter();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    let testing: HTMLElement | null;
    for (let i = 0; i < 18; i++) {
      testing = document.getElementById("proficiency-" + i);
      testing?.addEventListener("mouseover", (event) => {
        document.getElementById("proficiency-button-" + i)?.setAttribute('style', 'opacity: 1');
        if (i > 0) {
          document.getElementById("proficiency-button-" + (i - 1))?.setAttribute('style', "opacity: 0.3");
        }
        if (i > 1) {
          document.getElementById("proficiency-button-" + (i - 2))?.setAttribute('style', "opacity: 0.1");
        }
        if (i < 17) {
          document.getElementById("proficiency-button-" + (i + 1))?.setAttribute('style', "opacity: 0.3");
        }
        if (i < 16) {
          document.getElementById("proficiency-button-" + (i + 2))?.setAttribute('style', "opacity: 0.1");
        }
      })
      testing?.addEventListener("mouseleave", (event) => {
        document.getElementById("proficiency-button-" + i)?.setAttribute('style', 'opacity: 0');
        if (i > 0) {
          document.getElementById("proficiency-button-" + (i - 1))?.setAttribute('style', "opacity: 0");
        }
        if (i > 1) {
          document.getElementById("proficiency-button-" + (i - 2))?.setAttribute('style', "opacity: 0");
        }
        if (i < 17) {
          document.getElementById("proficiency-button-" + (i + 1))?.setAttribute('style', "opacity: 0");
        }
        if (i < 16) {
          document.getElementById("proficiency-button-" + (i + 2))?.setAttribute('style', "opacity: 0");
        }
      })
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      // if (this.character) {
      //   console.log(Object.keys(this.character.proficiencies));
      // }
      if (this.openToTab === 1) {
        // console.log("Opening to Attacks");
        document.getElementById('attacksTab')?.click();
      } else if (this.openToTab === 2) {
        document.getElementById('languagesTab')?.click();
      }
      this.fitlerLanguages();
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
    this.updateOtherInfo.emit(this.character);
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

  getMod(stat: number): number {
    return Math.floor(stat / 2) - 5;
  }

  calcProficiencyBonus(level: number) {
    if (level) {
      return Math.trunc(2 + ((level - 1) / 4))
    }
    return 0;
  }

  changeProficiency(proficiency: string, increase: boolean) {
    if (this.character) {
      if (increase) {
        switch (proficiency) {
          case "acrobatics":
            this.character.proficiencies.acrobatics++;
            break;
          case "animal handling":
            this.character.proficiencies.animalHandling++;
            break;
          case "arcana":
            this.character.proficiencies.arcana++;
            break;
          case "athletics":
            this.character.proficiencies.athletics++;
            break;
          case "deception":
            this.character.proficiencies.deception++;
            break;
          case "history":
            this.character.proficiencies.history++;
            break;
          case "insight":
            this.character.proficiencies.insight++;
            break;
          case "intimidation":
            this.character.proficiencies.intimidation++;
            break;
          case "investigation":
            this.character.proficiencies.investigation++;
            break;
          case "medicine":
            this.character.proficiencies.medicine++;
            break;
          case "nature":
            this.character.proficiencies.nature++;
            break;
          case "perception":
            this.character.proficiencies.perception++;
            break;
          case "performance":
            this.character.proficiencies.performance++;
            break;
          case "persuasion":
            this.character.proficiencies.persuasion++;
            break;
          case "religion":
            this.character.proficiencies.religion++;
            break;
          case "sleight of hand":
            this.character.proficiencies.sleightOfHand++;
            break;
          case "stealth":
            this.character.proficiencies.stealth++;
            break;
          case "survival":
            this.character.proficiencies.survival++;
            break;
        }
      } else {
        switch (proficiency) {
          case "acrobatics":
            this.character.proficiencies.acrobatics--;
            break;
          case "animal handling":
            this.character.proficiencies.animalHandling--;
            break;
          case "arcana":
            this.character.proficiencies.arcana--;
            break;
          case "athletics":
            this.character.proficiencies.athletics--;
            break;
          case "deception":
            this.character.proficiencies.deception--;
            break;
          case "history":
            this.character.proficiencies.history--;
            break;
          case "insight":
            this.character.proficiencies.insight--;
            break;
          case "intimidation":
            this.character.proficiencies.intimidation--;
            break;
          case "investigation":
            this.character.proficiencies.investigation--;
            break;
          case "medicine":
            this.character.proficiencies.medicine--;
            break;
          case "nature":
            this.character.proficiencies.nature--;
            break;
          case "perception":
            this.character.proficiencies.perception--;
            break;
          case "performance":
            this.character.proficiencies.performance--;
            break;
          case "persuasion":
            this.character.proficiencies.persuasion--;
            break;
          case "religion":
            this.character.proficiencies.religion--;
            break;
          case "sleight of hand":
            this.character.proficiencies.sleightOfHand--;
            break;
          case "stealth":
            this.character.proficiencies.stealth--;
            break;
          case "survival":
            this.character.proficiencies.survival--;
            break;
        }
      }
    }
  }
}
