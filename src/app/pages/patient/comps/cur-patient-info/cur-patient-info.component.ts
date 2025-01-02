import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import Actor from 'src/app/modules/actor';
import Patient from 'src/app/modules/petient';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-cur-patient-info',
  templateUrl: './cur-patient-info.component.html',
  styleUrls: ['./cur-patient-info.component.css']
})
export class CurPatientInfoComponent implements OnInit {
  @Input() curPatient : Actor | null = null;

  constructor(public authService: AuthService) { 
    this.authService.getActor().subscribe(actor => {
      this.curPatient = actor;
    })
  }

  ngOnInit(): void {
   
  }

}
