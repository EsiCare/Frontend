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


  curPresc = new BehaviorSubject<any>(null);


  dpiTests = new BehaviorSubject<TestItem[]>([]);

  constructor(public http: HttpClient, public authService: AuthService) { }




  public async loadAllPatients() {
    let actor: Actor | null = null;
    this.authService.getActor().pipe(take(1)).subscribe(data => actor = data).unsubscribe();
    let res: any;

    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/patients/?hospital=${actor!.hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    if (res["count"] != 0) {


      let list: Patient[] = [];
      for (let i = 0; i < res.results.data.length; i++) {
        let data = res.results.data[i];
        let patientActor = new Actor(data["id"], "Patient", "", data);
        list.push({ actor: patientActor, history: [] });
      }

      this.patientsList.next(list);
      this.loadPatientInfo(0);
    }

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
        
      }
      
      res["data"].reverse();

      let done = [];
      let not_done = [];
      for(let cond of res["data"]) {

        if(cond.lastedFor.length == 0) {
          not_done.push(cond);
        } else {
          done.push(cond);
        }
      }

      this.selectedHistory.next([...not_done,done]);
    } else {

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
    } catch (e) { }

    if (res["status"] == "success") {

      await this.loadMedicalHistory();
      this.selectedDpi.next({
        ...this.selectedDpi.value,
        resume,
        reason,        
      } as HistoryItem
      );

    } else {
    }
    
  }



  async addPrescritption(entries: any, notes: string) {
    let pk = this.selectedDpi.value?.id;
    let res;
    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/prescriptions/add/${pk}`,
        {
          notes,
          entries
        },
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


  }

  async previewPrescription() {
    let pk = this.selectedDpi.value?.id;


    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/prescriptions?condition_pk=${pk}&patient_SSN=${this.getCurPatient().actor.SSN}`,
        this.jwtHeader(),
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    this.curPresc.next(res.data[0]);
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
      let tests: any = [];
      for (let actorTest of Object.keys(res["data"])) {

        for (let test of res["data"][actorTest]) {
          test.actor = actorTest.split("_")[0];
        }
        tests = tests.concat(res["data"][actorTest]);
      }

      let done = [];
      let not_done = [];
      for(let test of tests) {
        
        if(!test.conductionDate) {
          not_done.push(test);
        } else {
          done.push(test);
        }
      }




      this.dpiTests.next([...not_done,...done]);
    } else {
      this.dpiTests.next([]);
    }
  }

  public setSelectedDpi(id: number) {
    this.selectedDpi.next(this.selectedHistory.value.find(item => item.id.toString() == id.toString()));
    localStorage.setItem(LASTEST_DPI, JSON.stringify({ id: id,done: this.selectedDpi.value?.lastedFor,  patientInfo: this.getCurPatient().actor }));
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