import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Actor from '../modules/actor';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Router } from '@angular/router';



type LoginStatus = "Pending" | "Loading";
type LoginRespond = "Pending" | "Failure" | "Successful";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actor : Actor | null = null;
  login_status : LoginStatus = "Pending";
  login_response : LoginRespond = "Pending";


  constructor(private http: HttpClient,private router: Router) { }


  // on first enter website
  // validate token then redirect to page
  public async onInit() {
    if(!Actor.check_localStorage()) {
      return;
    }
    let prev_actor =  Actor.load_localStorage();
    // prev_actor.
  }

  public async onLoginIn(email: string, pass: string)  {

    email = "taki@gmail.com"; // doctor
    // email = "aaroncunningham@example.com"; // patient
    // email = "diazamy@example.com"; // radio
    // email = "cookaudrey@example.com"; // nurse
    // email = "amyknight@example.com"; // boi
    
    
    pass = "1111";

    this.login_status = "Loading";
    this.login_response = "Pending";
    let res = {};
    try {
      res = await firstValueFrom(this.http.post("http://127.0.0.1:8000/api/login/",{"email": email,"password": pass}));
    } catch(e) { }
    this.login_status = "Pending";
   

    

    if((res as any)["status"] != "success") {
      this.login_response = "Failure"
      return;
    } 


    this.login_response = "Successful";
    this.actor =  Actor.fromRes((res as any));
    this.actor.save_localStorage()
    this.router.navigateByUrl("/"+this.actor.type);

  }


  loadFromLocalStorage() {
    this.actor =  Actor.load_localStorage();
    return this.actor;
  }


  public getActor() : Observable<Actor | null> {
    return of(this.actor);
  }


  public getLoginStatus() : Observable<LoginStatus | null> {
    return of(this.login_status);
  }
  public getLoginRes() : Observable<LoginRespond | null> {
    return of(this.login_response);
  }

  public clear_localStorage() {
    localStorage.clear();
  }
}


export type {
  LoginStatus,
  LoginRespond
};