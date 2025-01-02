import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, of, take } from 'rxjs';
import { AuthService } from './auth.service';
import Actor from '../modules/actor';
import { HistoryItem, TestItem } from '../modules/petient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  medicalHistory = new BehaviorSubject<HistoryItem[]>([]);
  selectedDpi = new BehaviorSubject<HistoryItem | undefined>(undefined);

  dpiTests = new BehaviorSubject<TestItem[]>([]);

  constructor(public http : HttpClient,public authService : AuthService) {
  }




  public async loadMedicalHistory() {
    let SSN : any;
    this.authService.getActor().pipe(take(1)).subscribe((actor) => SSN = actor?.SSN )!.unsubscribe();

    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/medicalHistory/${SSN}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if (res["status"] == "success" && res["data"].length) {
      let list : any  = [];
      for (let i = 0; i < res.data.length; i++) {
        // const element = array[i];
        if(res.data[i].resume) {
          if(res.data[i].resume.length > 15) {
            res.data[i].resume = res.data[i].resume.slice(0,15) + "...";
          }
          if(res.data[i].reason.length > 15) {
            res.data[i].reason = res.data[i].reason.slice(0,15) + "...";
          }          
        }
        if(res.data[i].doctor) {
          list.push(res.data[i]);
        }
      }
      
      // res["data"].reverse();
      this.medicalHistory.next(list);
    } else {

    }



  }


  async getTestHistory() {
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/testhistory/${this.selectedDpi.value?.id}`,
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    if (res["status"] == "success") {
      let tests: any = [];
      for (let actorTest of Object.keys(res["data"])) {

        for (let test of res["data"][actorTest]) {
          test.actor = actorTest.split("_")[0];
        }
        tests = tests.concat(res["data"][actorTest]);
      }
      this.dpiTests.next([...tests]);
    } else {
      this.dpiTests.next([]);
    }
  }



  jwtHeader() {
    let actor: Actor | null = null;
    this.authService.getActor().pipe(take(1)).subscribe(data => actor = data).unsubscribe();
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${actor!.token}`

      })
    }
  }


}
