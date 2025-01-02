import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Actor from 'src/app/modules/actor';
import { HistoryItem } from 'src/app/modules/petient';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService, LASTEST_DPI } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-preview',
  templateUrl: './doctor-preview.component.html',
  styleUrls: ['./doctor-preview.component.css'],
})
export class DoctorPreviewComponent implements OnInit {
  curPatient: Actor | null = null;
  curDpi: HistoryItem | null = null;

  constructor(public doctorService: DoctorService,public router:  Router,public authService: AuthService) {

   }

  ngOnInit(): void {

    let savedData = JSON.parse(localStorage.getItem(LASTEST_DPI)!);
    this.curPatient = savedData["patientInfo"];
    this.doctorService.patientsList.next([{ actor: this.curPatient!, history: [] }]);
    this.doctorService.selectedPatientIdx.next(0);

    this.doctorService.selectedHistory.asObservable().subscribe((data) => {
      this.curDpi = data.find(item => item.id.toString() == savedData.id)!;
    });

    this.doctorService.loadMedicalHistory().then(() => {
      this.doctorService.setSelectedDpi(savedData.id);
      this.doctorService.getTestHistory();

    });


    this.doctorService.selectedDpi.asObservable().subscribe((dpi) => {
      if(dpi == undefined) {

        // console.log(this.authService.actor);
        // this.doctorService.getTestHistory();

      }
    });
  }

}
