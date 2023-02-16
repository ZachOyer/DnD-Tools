import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faArrowRight, faArrowRightLong, faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Character } from 'src/app/shared/character.model';

@Component({
  selector: 'app-edit-other-info',
  templateUrl: './edit-other-info.component.html',
  styleUrls: ['./edit-other-info.component.sass'],
})
export class EditOtherInfoComponent implements OnInit {
  faClose = faXmark;
  faAdd = faPlus;
  faRemove = faTrash;
  faRightArrow = faArrowRightLong;

  title = '';
  character: Character | null = null;
  openToTab = 0;

  newLanguage = '';

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

  addLanguage() {
    if (this.newLanguage !== '' && this.character !== null) {
      if (this.character?.languages) {
        this.character.languages.push(this.newLanguage);
        this.newLanguage = '';
      } else {
          this.character.languages = [];
          this.character.languages.push(this.newLanguage);
          this.newLanguage = '';
      }
    }
  }

  removeLanguage(index: number) {
    this.character?.languages?.splice(index, 1);
  }

}
