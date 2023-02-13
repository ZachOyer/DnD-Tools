import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-battle-stats',
  templateUrl: './edit-battle-stats.component.html',
  styleUrls: ['./edit-battle-stats.component.sass']
})
export class EditBattleStatsComponent implements OnInit {
  faClose = faXmark;

  title = '';
  newInfo = {
    armorClass: 0,
    initiative: 0,
    speed: 0,
    maxHitPoints: 0
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
      const titleToSet = 'Edit Battle Stats';
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
