import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faICursor, faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-basic-info-modal',
  templateUrl: './edit-basic-info-modal.component.html',
  styleUrls: ['./edit-basic-info-modal.component.sass']
})
export class EditBasicInfoModalComponent implements OnInit {
  faClose = faXmark;
  faCursor = faICursor;

  title = '';
  newInfo = {
    name: '',
    level: 0,
    class: '',
    race: '',
    background: '',
    alignment: '',
    xp: 0,
  }

  @Output() updateBasicInfo = new EventEmitter();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      document.getElementById('firstInput')?.focus();
      const titleToSet = 'Edit Basic Info';
      for (let i = 0; i < titleToSet.length; i++) {
        setTimeout(() => {
          this.title = titleToSet.slice(0, i + 1);
          if (i === (titleToSet.length + 1)) {
          }
        }, (i * 100))
      }
    }, 0)
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  saveInfo() {
    this.updateBasicInfo.emit(this.newInfo);
    this.closeModal();
  }

}
