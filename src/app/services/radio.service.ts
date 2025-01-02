import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, Observable, of } from 'rxjs';
import { NursePatientTest } from './nurse.service';
import { HistoryItem } from '../modules/petient';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { getStorage } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})


export class RadioService {

  patientsList = new BehaviorSubject<NursePatientTest[]>([]);
  selectedPatientIdx = new BehaviorSubject<number>(-1);
  selectedHistory = new BehaviorSubject<HistoryItem[]>([]);


  constructor(public http: HttpClient, public authService: AuthService) {

  
  }




  public async getRequests() {
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/radio-tests/`).pipe(catchError((e) => { return of(e["error"]); })));

    } catch (e) { }


    if (res["status"] == "success") {
      console.log(res);
      let list: NursePatientTest[] = [];
      for (let i = 0; i < res.data.length; i++) {
        list.push({ actor: res.patients[i], ...res.data[i] });
      }
      console.log(list);
      this.patientsList.next([...list]);
    }
  }


  public async submitResult(imgData : Array<any>,results: string) {
    let res;
    try {
      res = await lastValueFrom(this.http.put(`http://127.0.0.1:8000/api/radio_test/${this.patientsList.value[this.selectedPatientIdx.value].id}/`,
        {
          results,
          imgs : imgData
        }
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if(res["status"] == "success") {
      this.getRequests();
  }


    
  }




  public async getSelectedPatient() {
    return this.patientsList.getValue()[this.selectedPatientIdx.getValue()];
  }


  public getSelectedPatientIdx(): Observable<number> {
    return this.selectedPatientIdx.asObservable();
  }

}