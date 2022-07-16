
import { Component, OnInit } from '@angular/core';
import { faDiceOne } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.sass']
})
export class NewCharacterComponent implements OnInit {
  faRollIcon = faDiceOne

  constructor() { }

  ngOnInit(): void {
  }

}
