import { Injectable } from '@angular/core';
import { NursePatientTest } from './nurse.service';
import { HistoryItem } from '../modules/petient';
import { BehaviorSubject, catchError, lastValueFrom, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoilogistService {


  patientsList = new BehaviorSubject<NursePatientTest[]>([]);
  selectedPatientIdx = new BehaviorSubject<number>(-1);
  selectedHistory = new BehaviorSubject<HistoryItem[]>([]);


  constructor(public http: HttpClient, public authService: AuthService) { 

  }


  public async getRequests() {
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/baio-tests/`).pipe(catchError((e) => { return of(e["error"]); })));

    } catch (e) { }

    console.log(res);

    if (res["status"] == "success") {
      let list: NursePatientTest[] = [];
      for (let i = 0; i < res.data.length; i++) {
        list.push({ actor: res.patients[i], ...res.data[i] });
      }
      this.patientsList.next([...list]);
    }
  }


  public async submitResult(mesurements : any,resume: string) {
    let res;
    try {
      res = await lastValueFrom(this.http.put(`http://127.0.0.1:8000/api/baio_test/${this.patientsList.value[this.selectedPatientIdx.value].id}/`,
        {
          resume,
          mesurements
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
