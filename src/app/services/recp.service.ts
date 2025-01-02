import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, of, take } from 'rxjs';
import Patient from '../modules/petient';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import Actor from '../modules/actor';

@Injectable({
  providedIn: 'root'
})
export class RecpService {
  patientsList = new BehaviorSubject<Actor[]>([]);
  selectedPatientIdx = new BehaviorSubject<number>(-1);


  constructor(public http: HttpClient, public authService: AuthService) {}




  public async loadAllPatients() {
    let actor: Actor | null = null;
    this.authService.getActor().pipe(take(1)).subscribe(data => actor = data).unsubscribe();
    let res: any;

    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/patients/?hospital=${actor!.hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    let list: Actor[] = [];
    for (let i = 0; i < res.results.data.length; i++) {
      let data = res.results.data[i];
      let patientActor = new Actor(data["id"], "Patient", "", data);
      list.push(patientActor);
    }

    this.patientsList.next(list);
  }



  public async registerPatient(
    address: string,
    name: string,
    phoneNumber: string,
    SSN: string,
    dateOfBirth: string,
    gender: string,
    emergencyContactName: string,
    emergencyContactPhone: string,
    email: string,
   
    
  ) {
    let actor: Actor | null = null;
    this.authService.getActor().pipe(take(1)).subscribe(data => actor = data).unsubscribe();
    // hospital
    let res: any;


    console.log(actor)

    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/register/patient/`,
        {
          address,
          name,
          phoneNumber,
          SSN,
          dateOfBirth,
          gender,
          emergencyContactName,
          emergencyContactPhone,
          email,
          hospital: actor!.hospital,
        }
      ).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    console.log(res);
    // let list: Actor[] = [];
    // for (let i = 0; i < res.results.data.length; i++) {
    //   let data = res.results.data[i];
    //   let patientActor = new Actor(data["id"], "Patient", "", data);
    //   list.push(patientActor);
    // }

    // this.patientsList.next(list);
  }



  async setSelectedPatient(id : string) {
    let res: any;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/patients/${id}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }


    this.selectedPatientIdx.next(this.patientsList.value.findIndex((val) => val.id == id));


  }

  
}


