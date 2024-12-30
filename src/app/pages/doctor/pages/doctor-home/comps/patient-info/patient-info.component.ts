import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import Actor from 'src/app/modules/actor';
import Petient from 'src/app/modules/petient';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {
  curPatient : Petient = {actor : Actor.fake(), history: []}; 

  constructor(public authService: AuthService,public doctorService: DoctorService) { }

  ngOnInit(): void {
    
  }

}
