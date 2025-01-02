import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MInputFieldComponent } from 'src/app/comps/minputfield/minput-field.component';
import Actor from 'src/app/modules/actor';
import Patient, { HistoryItem } from 'src/app/modules/petient';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-dpi-info',
  templateUrl: './dpi-info.component.html',
  styleUrls: ['./dpi-info.component.css']
})
export class DpiInfoComponent implements OnInit {
  name: string = "Harti Dhayaa";
  @ViewChild("reasonInp") reasonInp: MInputFieldComponent | null = null;
  @ViewChild("resumeInp") resumeInp: MInputFieldComponent | null = null;

  curPatient: Patient = { actor: Actor.fake(), history: [] };
  selectedDpi: HistoryItem | undefined = undefined;

  constructor(public doctorService: DoctorService, public popupService: PopupService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {

    this.doctorService.selectedPatientIdx.asObservable().subscribe((idx) => {
      if (idx < 0) { return; }
      let list: Patient[] = [];
      this.doctorService.patientsList.asObservable().pipe(take(1)).subscribe(data => list = data).unsubscribe();
      this.curPatient = list[idx];
      if (this.curPatient.actor.address) {
        if (this.curPatient.actor.address.length > 20) {
          this.curPatient.actor.address = this.curPatient.actor.address.slice(0, 20) + "...";
        }

      }
    });


    this.doctorService.selectedDpi.asObservable().subscribe((dpi) => {
      this.selectedDpi = dpi;
      if (dpi) {
        this.doctorService.getTestHistory();
      }
    });

  }

  onSave() {
    this.doctorService.EditDpi(this.reasonInp?.getInput() || this.selectedDpi!.reason,
      this.resumeInp!.getInput());
  }


  onViewPrescription() {

    this.popupService.showPopup("doctor:preview-presc");
  }
}
