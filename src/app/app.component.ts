import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faDiceD20, faLink } from '@fortawesome/free-solid-svg-icons';
import { appAnimations, introAnimations } from './app-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ appAnimations, introAnimations ],
})
export class AppComponent {
  faDnD = faDiceD20;
  faGit = faLink;
  isGreen = 'true';
  title = 'DnD Tools';

  constructor(public router: Router) { }

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }
}
