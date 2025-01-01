import { Component, OnInit, ViewChild } from '@angular/core';
import HospitalInfo, { HospitalStat, WorkerInfo } from 'src/app/modules/hospital-info';
import PatientHistoryItem from 'src/app/modules/patient-history-Item';
import { AdminService } from 'src/app/services/admin.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';
import { AdminPatientsComponent } from '../../comps/admin-patients/admin-patients.component';
import { AuthService } from 'src/app/services/auth.service';
import Actor from 'src/app/modules/actor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  curHospital : HospitalInfo = {id: "",name: "...",};
  hospitalList : HospitalInfo[] = [];
  hospitalNames : string[] = [];
  workerList : WorkerInfo[] = [];
  

  PatientList : PatientHistoryItem[] = [];
  @ViewChild("table") PatientsTable!: AdminPatientsComponent;

  hospitalStats? : HospitalStat;

  constructor(public router : Router ,public popupService : PopupService,public rightBarService: RightBarService, public adminService : AdminService, public authService : AuthService) { }

  ngOnInit(): void {



    this.adminService.loadAllHospitals();
    this.adminService.getHospitalList().subscribe((list) => {
      this.hospitalList = list;
      this.hospitalNames = list.map(item => item.name); 
      this.curHospital = list[0] || this.curHospital;
      if(this.curHospital.name != "...") {
        this.adminService.loadHospitalInfo(this.curHospital.name);
      }
    });
    this. adminService.getPatientList().subscribe(list => {
      this.PatientList = list;
      if(this.PatientsTable) {
        this.PatientsTable.setData(list);
      }
    });
    this. adminService.getWorkerList().subscribe(list => {
      this.workerList = list;
    });
    this. adminService.getHospitalStats().subscribe(stats => {
      this.hospitalStats = stats;
    });




    
  }
  


  onCreateHospital() {
    this.popupService.showPopup("admin:create-hospital");
  }

  onSelectHospital(name : any) {
    this.curHospital =  this.hospitalList.find((item) => item.name == name)!;
    this.adminService.loadHospitalInfo(this.curHospital.name);
    this.adminService.setSelectedHospitalName(this.curHospital.name);
  }


}
