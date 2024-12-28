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

    email = "cnichols@example.com";
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
    console.log(res);
    


    this.login_response = "Successful";
    this.actor =  Actor.fromRes((res as any)["data"]);
    this.actor.save_localStorage()

    // "patient"
    // "doctor"
    // "administrative"
    // "nurse"
    // "radiologist"
    // "laborantin"
    this.router.navigateByUrl("/admin");

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
}


export type {
  LoginStatus,
  LoginRespond
};