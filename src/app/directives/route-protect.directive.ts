import { Directive } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Actor from '../modules/actor';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup.service';

@Directive({
  selector: '[route-protect]'
})
export class RouteProtectDirective {

  constructor(public popupService: PopupService,public authService : AuthService,public router : Router) {
    console.clear();
    
    if(!Actor.check_localStorage()) {
      this.router.navigateByUrl("/");
      return
    }
    this.popupService.hidePopup();
    
    
    let actor =   this.authService.loadFromLocalStorage();
    this.authService.actor = actor;
    let path = window.location.href

    if(path.endsWith("patient/dpi") || path.endsWith("doctor/dpi") ) {
      return;
    }

    // actor proection
    let actor_path = path.split("/")[path.split("/").length - 1]; 
    if(actor_path != actor.type) {
      this.router.navigateByUrl("/");
    }
  }

}
