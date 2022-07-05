import { Component } from '@angular/core';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { appAnimations, introAnimations } from './app-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ appAnimations, introAnimations ],
})
export class AppComponent {
  faDnD = faDiceD20;
  currentTab: number;
  isGreen = 'true';
  title = 'DnD Tools';

  constructor() {
    this.currentTab = 1;
  }

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

  setCurrentTab(tab: number) {
    this.currentTab = tab;
  }
}
