import { Component, OnInit } from '@angular/core';
import { faPersonRays, faShare, faUserGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.sass']
})
export class CharacterCreationComponent implements OnInit {
  faBack = faShare;
  faPredef = faUserGear;
  faNewChar = faPersonRays;

  constructor() { }

  ngOnInit(): void {
  }

}
