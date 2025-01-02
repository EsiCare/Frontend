import { Component, EventEmitter, Output } from '@angular/core';
import Patient from 'src/app/modules/petient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {

  displayedColumns = ['id', 'name'];
  patientsList : Patient[] = [];


  @Output() onSelectPatient :EventEmitter<any>  = new EventEmitter();
  constructor(public popupService: PopupService,public rightBarServise: RightBarService, public doctorService : DoctorService) {
    doctorService.patientsList.asObservable().subscribe((list) => {
      this.patientsList = list;
    })
  }



  onClickSelectPatient(idx : number) {
    this.doctorService.loadPatientInfo(idx);
  }




  onClickQRCode() {
    this.popupService.showPopup("qr-code");
  }
  


  
}
