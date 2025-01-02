import { Component, OnInit, Output } from '@angular/core';
import { NavBarComponent } from 'src/app/comps/nav-bar/nav-bar.component';
import { HistoryItem } from 'src/app/modules/petient';
import { PatientService } from 'src/app/services/patient.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';
@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {

  
    
  constructor(public patientService : PatientService,public rightBarService: RightBarService,public popupService: PopupService,) { 
  }

  ngOnInit(): void {
  
  }
  

  onCreateDpi() {

  }
  

}
