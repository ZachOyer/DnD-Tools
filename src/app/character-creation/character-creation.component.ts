import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPersonRays, faShare, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { ccAnimations } from './character-creation-animations';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.sass'],
  animations: [ccAnimations]
})
export class CharacterCreationComponent implements OnInit {
  faBack = faShare;
  faPredef = faUserGear;
  faNewChar = faPersonRays;

  testing: boolean;

  constructor(private router: Router) {
    this.testing = false;
  }

  ngOnInit(): void {
  }

  goToNewChar() {
    this.testing = true;
    setTimeout(() => {
      this.router.navigateByUrl('/new-character')
    }, 0)
  }

}
