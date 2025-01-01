import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, lastValueFrom, Observable, of } from 'rxjs';
import Actor from '../modules/actor';
import Patient, { HistoryItem } from '../modules/petient';

export interface NursePatientTest {
  actor: Actor;
  id: 1;
  issueDate: string;
  conductionDate: string;
  status: string;
  resume: string;
  description: string;
  title: string;
  priorite: string;
  results: string;

  mesurements: any;
  imgs: Array<any>;
  medicalCondition: 4;
}

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  patientsList = new BehaviorSubject<NursePatientTest[]>([]);
  selectedPatientIdx = new BehaviorSubject<number>(-1);
  selectedHistory = new BehaviorSubject<HistoryItem[]>([]);



  constructor(public http: HttpClient, public authService: AuthService) {

  }


  public async getRequests() {
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/nurse-tests/`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if (res["status"] == "success") {
      let list: NursePatientTest[] = [];
      for (let i = 0; i < res.data.length; i++) {
        list.push({ actor: res.patients[i], ...res.data[i] });
      }

      this.patientsList.next([...list]);
    }
  }


  public async submitResult(results: string) {
    let res;
    try {
      res = await lastValueFrom(this.http.put(`http://127.0.0.1:8000/api/nurse_test/${this.patientsList.value[this.selectedPatientIdx.value].id}/`,
        {
          results
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