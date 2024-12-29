import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { AuthService } from 'src/app/services/auth.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {


  @ViewChild("pass")  pass : MInputComponent | null = null;
  @ViewChild("new_pass")  new_pass : MInputComponent | null = null;
  @ViewChild("conf_pass")  conf_pass : MInputComponent | null = null;

  constructor( public router: Router,
              public  popupService : PopupService, 
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  } 


  onClickLogout() {
    this.authService.clear_localStorage();
    this.popupService.hidePopup();
    this.router.navigateByUrl("/");
  }

  OnClickSave() {
    let passValid =  this.pass!.validateInput(validateNoEmpty);
    let new_passValid =  this.new_pass!.validateInput(validateNoEmpty);
    let conf_passValid =  this.conf_pass!.validateInput(validateNoEmpty);

    if( !passValid ||  !new_passValid ||  !conf_passValid  ) {
      return;
    }
    conf_passValid =  this.conf_pass!.validateInput(() => this.conf_pass?.getInput() == this.new_pass?.getInput());
    if(!conf_passValid) {
      return;
    }


  }

}
