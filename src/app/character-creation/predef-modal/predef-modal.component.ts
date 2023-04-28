import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-predef-modal',
  templateUrl: './predef-modal.component.html',
  styleUrls: ['./predef-modal.component.sass']
})
export class PredefModalComponent implements OnInit {
  faClose = faXmark;

  @Output() answer = new EventEmitter<boolean>();

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.answer.emit(false);
    this.bsModalRef.hide();
  }

  saveInfo() {
    this.answer.emit(true);
    this.closeModal();
  }

}
