import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, Observable, of, take } from 'rxjs';
import Actor from '../modules/actor';
import { SGPHType } from '../modules/patient-history-Item';
import Petient, { HistoryItem, TestItem } from '../modules/petient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const LASTEST_DPI = 'latest-dpi';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  petientsList = new BehaviorSubject<Petient[]>([]);
  selectedPetientIdx = new BehaviorSubject<number>(-1);
  selectedHistory = new BehaviorSubject<HistoryItem[]>([]);
  selectedDpiIndex = new BehaviorSubject<number>(-1);
  selectedDpi = new BehaviorSubject<HistoryItem | undefined>(undefined);


  dpiTests = new BehaviorSubject<TestItem[]>([]);

  constructor(public http: HttpClient, public authService: AuthService) {

  }




  public async loadAllPetients() {
    let actor: Actor | null = null;
    this.authService.getActor().pipe(take(1)).subscribe(data => actor = data).unsubscribe();
    let res: any;

    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/patients/?hospital=${actor!.hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    let list: Petient[] = [];
    for (let i = 0; i < res.results.data.length; i++) {
      let data = res.results.data[i];
      let patientActor = new Actor(data["id"], "Patient", "", data);
      list.push({ actor: patientActor, history: [] });
    }

    this.petientsList.next(list);
    this.loadPatientInfo(0);
  }



  public async loadPatientInfo(idx: number) {
    await this.selectedPetientIdx.next(idx);
    await this.loadMedicalHistory();
  }

  public async loadMedicalHistory() {
    let SSN = this.getCurPatient().actor.SSN;
    let res;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/medicalHistory/${SSN}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if (res["status"] == "success") {
      res["data"].reverse();
      this.selectedHistory.next(res["data"]);
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


    await this.loadMedicalHistory();
    this.selectedDpi.next({
      ...this.selectedDpi.value,
      reason,
      resume,
    } as HistoryItem
    );
  }



  async sendTestRequest(title: string, desc: string, testTypeActor: string, testTypePriority: string) {
    let res;
    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/request-test/`,
        {
          test_to : testTypeActor.toLowerCase(),
          dpi_id : this.selectedDpi.value?.id,
          patient_NSS : this.getCurPatient().actor?.SSN,
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
    console.log(res);
    

    if(res["status"] == "success") {

    
    this.dpiTests.next([
      ...res["data"]["baio_tests"],
      ...res["data"]["radio_tests"],
    ])
  }

  }

  public setSelectedDpi(id: number) {
    this.selectedDpi.next(this.selectedHistory.value.find(item => item.id.toString() == id.toString()));
  }




  public async getSelectedPatient() {
    return this.petientsList.getValue()[this.selectedPetientIdx.getValue()];
  }

  public getCurPatient() {
    return this.petientsList.value[this.selectedPetientIdx.value];
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