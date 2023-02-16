import { AfterContentChecked, AfterViewChecked, Component, SimpleChanges } from '@angular/core';
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
  screenHeight = 0;

  constructor(public router: Router) { }

  ngAfterViewInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.setSizing();
  }

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }

  setSizing() {
    if (window.innerHeight !== this.screenHeight) {
      this.screenHeight = window.innerHeight;
      let offsetHeight = window.innerHeight - ((document.getElementById('navbar')?.offsetHeight || 0));
      // let offsetHeight = window.innerHeight - (72 /* Navbar height */ + 44 /* Breadcrumbs height */ + 31 /* Buttons height */ + 57 /* Headers height */);
      let height = 'height: ' + offsetHeight + 'px';
      document.getElementById('component')?.setAttribute('style', height);
    }
  }
}
