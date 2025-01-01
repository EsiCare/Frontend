import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, firstValueFrom, lastValueFrom, Observable, of, take, throwError } from 'rxjs';
import HospitalInfo, { HospitalStat, WorkerInfo } from '../modules/hospital-info';
import PatientHistoryItem from '../modules/patient-history-Item';
import Actor from '../modules/actor';
import { PopupService } from './popup.service';
import { lowertalize } from '../utils/func';
import { AuthService } from './auth.service';


type HospitalCreationStatus = "Pending" | "Loading" | "Failed" | "Successful";
type WorkerCreationStatus = "Pending" | "Loading" | "Failed" | "Successful";



@Injectable({
  providedIn: 'root'
})
export class AdminService {
  hospitalCreationStatus = new BehaviorSubject<HospitalCreationStatus>("Pending");
  hospitalCreationMsg: string = "";

  workerCreationStatus = new BehaviorSubject<WorkerCreationStatus>("Pending");
  workerCreationMsg: string = "";


  hospitalNames: string[] = [];
  hospitalList = new BehaviorSubject<HospitalInfo[]>([]);
  selectedHospitalName : string = ""; 

  curHospitalPatients = new BehaviorSubject<PatientHistoryItem[]>([]);
  curHospitalCounts = new BehaviorSubject<HospitalStat>({doctor_count : 0,nurse_count : 0,administrative_count : 0,radiologist_count : 0,laborantin_count : 0,});
  curHospitalWorkers = new BehaviorSubject<WorkerInfo[]>([]);


  curHospitalGraph = [];



  constructor(private http: HttpClient, public authService : AuthService,public popupService: PopupService) { }


  public async createHospital(name: string, address: string) {
    let userData : any;
    this.authService.getActor().pipe(take(1)).subscribe((data) => {
      userData = data;
    }).unsubscribe();



    this.hospitalCreationStatus.next("Loading");
    let res: any;

    try {
      res = await lastValueFrom(this.http.post("http://127.0.0.1:8000/api/hospital/create/", { 
        name, address, user : {
          actor_id: userData.id,
        } 
      }).pipe(
        catchError((e) => {
          return of(e["error"]);
        })
      ));
    } catch (e) { }

    if (res["status"] != "success") {
      this.hospitalCreationStatus.next("Failed");
    } else {
      this.hospitalCreationStatus.next("Successful");
    }
    this.hospitalCreationMsg = res["message"];
  }

  public async loadAllHospitals() {
    let res: any;
    try {
      res = await lastValueFrom(this.http.get("http://127.0.0.1:8000/api/hospitals/").pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    let hospitalList: HospitalInfo[] = [];
    for (let i = 0; i < res["data"].length; i++) {
      hospitalList.push({
        id: res["data"][i].id,
        name: res["data"][i].name,
      });
      this.hospitalNames.push(res["data"][i].name);
    }
    this.hospitalList.next(hospitalList);
    this.selectedHospitalName = hospitalList[0].name;

  }


  public loadHospitalInfo(hospital: string) {
    this.loadHospitalStats(hospital);
    this.loadHospitalPatients(hospital);
    this.loadHospitalWorker(hospital);
  
    
  }


  public async loadHospitalStats(hospital: string) { 
    let res: any;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/hospital/?name=${hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if(res["status"] == "success") {
      let curHospitalCounts : HospitalStat = this.curHospitalCounts.value; 
      curHospitalCounts["doctor_count"] = res["data"]["counters"]["doctor_count"];
      curHospitalCounts["nurse_count"] = res["data"]["counters"]["nurse_count"];
      curHospitalCounts["administrative_count"] = res["data"]["counters"]["administrative_count"];
      curHospitalCounts["radiologist_count"] = res["data"]["counters"]["radiologist_count"];
      curHospitalCounts["laborantin_count"] = res["data"]["counters"]["laborantin_count"];
      this.curHospitalCounts.next(curHospitalCounts);
    }
  }

  public async loadHospitalPatients(hospital: string) {
    let res: any;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/patients/?hospital=${hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }
    let patientsList: PatientHistoryItem[] = [];
    for (let i = 0; i < res["results"]["data"].length; i++) {
      patientsList.push({
        entered_at: "2024-12-07 at 15:45",
        nss: "0001823498",
        address: "Taher , Jijel",
        
        dateOfBirth: res["results"]["data"][i].dateOfBirth,
        email: res["results"]["data"][i].email,
        emergencyContactName: res["results"]["data"][i].emergencyContactName,
        emergencyContactPhone: res["results"]["data"][i].emergencyContactPhone,
        gender: res["results"]["data"][i].gender,
        id: res["results"]["data"][i].id,
        name: res["results"]["data"][i].name,
        phoneNumber: res["results"]["data"][i].phoneNumber,
      });
    }

    this.curHospitalPatients.next(patientsList);
  }


  public async loadHospitalWorker(hospital: string) {
    let res: any;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/workers/?hospital=${hospital}`).pipe(catchError((e) => { return of(e["error"]); })));
    } catch (e) { }

    if(res["status"] == "success") {
      let administrative = res["data"]["administrative"]["results"] as WorkerInfo[];
      let doctors = res["data"]["doctors"]["results"] as WorkerInfo[];
      let nurses = res["data"]["nurses"]["results"] as WorkerInfo[];
      let radiologists = res["data"]["radiologists"]["results"] as WorkerInfo[];
      this.curHospitalWorkers.next([
        ...administrative,
        ...doctors,
        ...nurses,
        ...radiologists,
      ]);
    }
  }



  public async createWorker(role:  string,spec:  string,name: string,email: string,phone: string,nss: string,) {
    let res: any;

    this.workerCreationStatus.next("Loading");


    try {
      res = await lastValueFrom(this.http.post(`http://127.0.0.1:8000/api/register/worker/`,{
        role: role.toLowerCase(),
        email,
        phoneNumber: phone,
        SSN : nss,
        hospital : this.selectedHospitalName,
        specialty : spec,
        name,
      }).pipe(catchError((e) => { 
        return of(e["error"]); 
      })));
    } catch (e) { }





    if(res["status"] == "error") {
      this.workerCreationStatus.next("Failed");
    } else {
      this.workerCreationStatus.next("Successful");
    }

    this.workerCreationMsg = res["message"];

    this.loadHospitalWorker(this.selectedHospitalName);
    
  } 


  public async updateWorker(role:  string,spec:  string,name: string,email: string,phone: string,nss: string,) {
    let workerInfo : any; 
    this.popupService.getData().pipe(take(1)).subscribe(data => workerInfo = data.worker).unsubscribe();
    
    

    let res: any;
    this.workerCreationStatus.next("Loading");
    try {
      res = await lastValueFrom(this.http.put(`http://127.0.0.1:8000/api/worker/edit/`,{
        name,
        role       : lowertalize(role),
        email,
        id: workerInfo.id,
        phoneNumber: phone,
        SSN : nss,
        hospital : this.selectedHospitalName,
        specialty : spec,
      }).pipe(catchError((e) => { 
        return of(e["error"]); 
      })));
    } catch (e) { }


    if(res["status"] == "error") {
      this.workerCreationStatus.next("Failed");
    } else {
      this.workerCreationStatus.next("Successful");
    }

    this.workerCreationMsg = res["message"];
    this.loadHospitalWorker(this.selectedHospitalName);
    
  } 



  public async deleteWorker() {
    let workerInfo : any; 
    this.popupService.getData().pipe(take(1)).subscribe(data => workerInfo = data.worker).unsubscribe();
    
    let res: any;
    try {
      res = await lastValueFrom(this.http.delete(`http://127.0.0.1:8000/api/worker/delete?role=${lowertalize(workerInfo.role)}&id=${workerInfo.id}`).pipe(catchError((e) => { 
        return of(e["error"]); 
      })));
    } catch (e) { }


    this.loadHospitalInfo(this.selectedHospitalName);
    
  } 

  public async searchWorker(input : string) {
    if(input == "") {
      this.loadHospitalWorker(this.selectedHospitalName);
      return;
    }

    let res: any;
    try {
      res = await lastValueFrom(this.http.get(`http://127.0.0.1:8000/api/search-worker/?name=${input}`).pipe(catchError((e) => { 
        return of(e["error"]); 
      })));
    } catch (e) { }

    let administrative = res["data"]["administrative"] as WorkerInfo[];
    let doctors = res["data"]["doctors"] as WorkerInfo[];
    let nurses = res["data"]["nurses"] as WorkerInfo[];
    let radiologists = res["data"]["radiologists"] as WorkerInfo[];
    this.curHospitalWorkers.next([
      ...administrative,
      ...doctors,
      ...nurses,
      ...radiologists,
    ]);

  } 


  resetHospitalCreationStatus() {
    this.hospitalCreationStatus.next("Pending");
  }
  getHospitalCreationStatus(): Observable<HospitalCreationStatus> {
    return this.hospitalCreationStatus.asObservable();
  }
  getHospitalCreationMsg(): Observable<string> {
    return of(this.hospitalCreationMsg);
  }


  resetworkerCreationStatus() {
    this.workerCreationStatus.next("Pending");
  }
  getWorkerCreationStatus(): Observable<WorkerCreationStatus> {
    return this.workerCreationStatus.asObservable();
  }
  getWorkerCreationMsg(): Observable<string> {
    return of(this.workerCreationMsg);
  }

  getHospitalList(): Observable<HospitalInfo[]> {
    return this.hospitalList.asObservable();
  }
  getPatientList(): Observable<PatientHistoryItem[]> {
    return this.curHospitalPatients.asObservable();
  }
  getHospitalStats(): Observable<HospitalStat> {
    return this.curHospitalCounts.asObservable();
  }
  getWorkerList(): Observable<WorkerInfo[]> {
    return this.curHospitalWorkers.asObservable();
  }
  

  setSelectedHospitalName(hospital: string) {
    this.selectedHospitalName = hospital;
  } 
}
