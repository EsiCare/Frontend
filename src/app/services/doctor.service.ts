import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, Observable, of, take } from 'rxjs';
import Actor from '../modules/actor';
import { SGPHType } from '../modules/patient-history-Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import Patient, { HistoryItem, TestItem } from '../modules/petient';

const LASTEST_DPI = 'latest-dpi';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  patientsList = new BehaviorSubject<Patient[]>([]);
  selectedPatientIdx = new BehaviorSubject<number>(-1);
  selectedHistory = new BehaviorSubject<HistoryItem[]>([]);
  selectedDpi = new BehaviorSubject<HistoryItem | undefined>(undefined);


  dpiTests = new BehaviorSubject<TestItem[]>([]);

  constructor(public http: HttpClient, public authService: AuthService) {

  }




  public async loadAllPatients() {
    let actor: Actor | null = null;
    this.authService.getActor().pipe(take(1)).subscribe(data => actor = data).unsubscribe();
    let res: any;

    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/patients/?hospital=${actor!.hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    let list: Patient[] = [];
    for (let i = 0; i < res.results.data.length; i++) {
      let data = res.results.data[i];
      let patientActor = new Actor(data["id"], "Patient", "", data);
      list.push({ actor: patientActor, history: [] });
    }

    this.patientsList.next(list);
    this.loadPatientInfo(0);
  }



  public async loadPatientInfo(idx: number) {
    await this.selectedPatientIdx.next(idx);
    await this.loadMedicalHistory();
  }

  public async loadMedicalHistory() {
    let SSN = this.getCurPatient().actor.SSN;
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/medicalHistory/${SSN}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if (res["status"] == "success" && res["data"].length) {
      res["data"].reverse();
      this.selectedHistory.next(res["data"]);
      console.log(res);
    }else {
    }

  }

  public async addNewDpi(data: string) {
    let pk = this.getCurPatient().actor.id;
    let res;
    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/medicalHistory/add/${pk}`,
        {
          reason: data,
          id: this.authService.actor?.id,
        },
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    localStorage.setItem(LASTEST_DPI, JSON.stringify({ id: res.data.id, patientInfo: this.getCurPatient().actor }));


    await this.loadMedicalHistory();



  }

  public async EditDpi(reason: string, resume: string) {
    let pk = this.selectedDpi.value?.id;

    let res;
    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/medicalHistory/edit/${pk}`,
        { reason, resume, },
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) {     }
    
    console.log(res)
    // if(res["status"] == "success") {

    // await this.loadMedicalHistory();
    // this.selectedDpi.next({
    //   ...this.selectedDpi.value,
    //   reason,
    //   resume,
    // } as HistoryItem
    // );
      
    // } else {
    //   console.log(res);
    // }
  }



  async sendTestRequest(title: string, desc: string, testTypeActor: string, testTypePriority: string) {
    let res;
    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/request-test/`,
        {
          test_to: testTypeActor.toLowerCase(),
          dpi_id: this.selectedDpi.value?.id,
          patient_NSS: this.getCurPatient().actor?.SSN,
          title,
          description: desc,
          priorite: testTypePriority,
        },
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    this.getTestHistory();


  }


async getTestHistory() {
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/testhistory/${this.selectedDpi.value?.id}`,
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    if (res["status"] == "success") {
      let tests : any = [];
      for(let actorTest of Object.keys(res["data"])) {
        tests = tests.concat(res["data"][actorTest]);

      }
      this.dpiTests.next([...tests]);
    } else {
    console.log(res)

    }


  }

  public setSelectedDpi(id: number) {
    this.selectedDpi.next(this.selectedHistory.value.find(item => item.id.toString() == id.toString()));
  }




  public async getSelectedPatient() {
    return this.patientsList.getValue()[this.selectedPatientIdx.getValue()];
  }

  public getCurPatient() {
    return this.patientsList.value[this.selectedPatientIdx.value];
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


export {
  LASTEST_DPI
};