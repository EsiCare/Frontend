import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  @ViewChild("emailRef") emailRef : MInputComponent | null = null;
  @ViewChild("passRef") passRef : MInputComponent | null = null;
  
  constructor(private router: Router,public authService : AuthService) {

  }
  public onLoginIn(event: MouseEvent) {

    let emailValid = this.emailRef?.validateInput(validateEmail); 
    let passValid = this.passRef?.validateInput(validateNoEmpty); 
    if(!emailValid || !passValid) 
      return;
    
    
    const email = this.emailRef?.inputRef?.nativeElement.querySelectorAll("input")[0].value as string;
    const pass = this.passRef?.inputRef?.nativeElement.querySelectorAll("input")[0].value as string;

    this.authService.onLoginIn(email,pass);

  }
  
}

function validateEmail(email: string ) : boolean{
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) != undefined;
};

function validateNoEmpty(str : string) : boolean {
  return str.length != 0;
}
