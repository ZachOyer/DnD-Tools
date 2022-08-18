import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-basic-info-modal',
  templateUrl: './edit-basic-info-modal.component.html',
  styleUrls: ['./edit-basic-info-modal.component.sass']
})
export class EditBasicInfoModalComponent implements OnInit {
  faClose = faXmark;

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

  constructor(private bsModalService: BsModalService,) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      document.getElementById('firstInput')?.focus();
    }, 0)
  }

  closeModal() {
    this.bsModalService.hide();
  }

  saveInfo() {
    this.updateBasicInfo.emit(this.newInfo);
    this.bsModalService.hide();
  }

}
