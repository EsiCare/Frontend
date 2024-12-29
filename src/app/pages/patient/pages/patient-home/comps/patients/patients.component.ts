import { Component, EventEmitter, Output } from '@angular/core';
import Petient from 'src/app/modules/petient';
import { DoctorService } from 'src/app/services/doctor.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {

  displayedColumns = ['id', 'name'];
  patientsList : Petient[] = [];


  @Output() onSelectPetient :EventEmitter<any>  = new EventEmitter();
  constructor(public rightBarServise: RightBarService, public doctorService : DoctorService) {
    doctorService.petientsList.asObservable().subscribe((list) => {
      this.patientsList = list;
    })
  }



  onClickSelectPetient(idx : number) {
    this.doctorService.loadPatientInfo(idx);
  }


  


  
}
