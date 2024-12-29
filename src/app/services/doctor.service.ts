import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import Actor from '../modules/actor';
import { SGPHType } from '../modules/patient-history-Item';
import Petient from '../modules/petient';



@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  petientsList = new BehaviorSubject<Petient[]>([]);
  selectedPetientIdx = new BehaviorSubject<number>(0);

  constructor() { 
    let list : Petient[] = [];
    for (let i = 0; i < 10; i++) {
      list.push({actor: Actor.fake(),  history : [] })
    }
    this.petientsList.next(list);
    this.selectedPetientIdx.next(0)
  }




  public async loadAllPetients() {
    // let res: any;
    // try {
    //   res = await lastValueFrom(this.http.get("http://127.0.0.1:8000/api/hospitals/").pipe(catchError((e) => { return of(e["error"]); })));
    // } catch (e) { }

    // let hospitalList: HospitalInfo[] = [];
    // for (let i = 0; i < res["data"].length; i++) {
    //   hospitalList.push({
    //     id: res["data"][i].id,
    //     name: res["data"][i].name,
    //   });
    //   this.hospitalNames.push(res["data"][i].name);
    // }
    // this.hospitalList.next(hospitalList);
    // this.selectedHospitalName = hospitalList[0].name;

  }

  public async loadPatientInfo(idx : number) {
    this.selectedPetientIdx.next(idx);
  }





}
