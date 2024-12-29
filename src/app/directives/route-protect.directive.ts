import { Directive } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Actor from '../modules/actor';
import { Router } from '@angular/router';

@Directive({
  selector: '[route-protect]'
})
export class RouteProtectDirective {

  constructor(public authService : AuthService,public router : Router) {
    if(!Actor.check_localStorage()) {
      this.router.navigateByUrl("/");
      return
    }
    
    let actor =   this.authService.loadFromLocalStorage();
    let path = window.location.href

    if(path.endsWith("patient/dpi")) {
      // jwt protect
      return;
    }

    // actor proection
    let actor_path = path.split("/")[path.split("/").length - 1]; 
    console.log("[Actor Route]",actor_path,actor.type)
    if(actor_path != actor.type) {
      this.router.navigateByUrl("/");
    }
  }

}
