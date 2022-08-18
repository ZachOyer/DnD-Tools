import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-stats-modal',
  templateUrl: './edit-stats-modal.component.html',
  styleUrls: ['./edit-stats-modal.component.sass']
})
export class EditStatsModalComponent implements OnInit {
  faClose = faXmark;

  newStats = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  }

  @Output() updateStats = new EventEmitter();

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
    this.updateStats.emit(this.newStats);
    this.bsModalService.hide();
  }

}
