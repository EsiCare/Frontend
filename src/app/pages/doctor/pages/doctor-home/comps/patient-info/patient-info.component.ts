import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import Actor from 'src/app/modules/actor';
import Patient from 'src/app/modules/petient';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {
  @Input() curPatient : Actor | undefined = undefined;

  constructor(public authService: AuthService) { 
  }

  ngOnInit(): void {
    
    if(this.curPatient == undefined) {
      this.curPatient = Actor.fake()
    }
  }

}
