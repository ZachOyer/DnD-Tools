import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass']
})
export class ConfirmModalComponent implements OnInit {
  faClose = faXmark;

  characterName = '';
  @Output() response = new EventEmitter<boolean>();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  closeModal(response: boolean) {
    this.response.emit(response);
    this.bsModalRef.hide();
  }

}
