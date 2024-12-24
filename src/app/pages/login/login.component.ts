import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  @ViewChild("emailRef") emailRef : MInputComponent | null = null;
  @ViewChild("passRef") passRef : MInputComponent | null = null;
  
  constructor(private router: Router) {

  }
  public onSignIn(event: MouseEvent) {


    let emailValid = this.emailRef?.validateInput(validateEmail); 
    let passValid = this.passRef?.validateInput(validateNoEmpty); 
    if(!emailValid || !passValid) 
      return;
    
    const email = this.emailRef?.inputRef?.nativeElement.value;
    const pass = this.passRef?.inputRef?.nativeElement.value;
    this.router.navigateByUrl("/user");


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
