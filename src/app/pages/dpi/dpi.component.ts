import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MInputFieldComponent } from 'src/app/comps/minputfield/minput-field.component';
import Actor from 'src/app/modules/actor';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { HistoryItem } from 'src/app/modules/petient';
import { DoctorService, LASTEST_DPI } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-dpi',
  templateUrl: './dpi.component.html',
  styleUrls: ['./dpi.component.css']
})
export class DoctorDpiComponent implements OnInit {
  curPatient: Actor | null = null;
  curDpi: HistoryItem | null = null;




  testTypeActor : string = "Radiologist";
  testTypePriority : string = "Dangerous";
  

  @ViewChild("reasonInp") reasonInp: MInputFieldComponent | null = null;
  @ViewChild("resumeInp") resumeInp: MInputFieldComponent | null = null;
  @ViewChild("titleInp") titleInp: MInputFieldComponent | null = null;
  @ViewChild("descInp") descInp: MInputFieldComponent | null = null;


  constructor(public popupService: PopupService,public router: Router, public rightBarService: RightBarService, public doctorService: DoctorService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem(LASTEST_DPI)) {
      this.router.navigateByUrl("doctor");
    }

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

  }


  async onClickSave() {
    await this.doctorService.EditDpi(this.reasonInp?.getInput() || this.curDpi!.reason,
      this.resumeInp!.getInput());


  }

  onClickSelectActor(type : string) {
    this.testTypeActor = type
  }


  async onClickSelectPriority(type : string) {
    this.testTypePriority = type

  }

  onClickRequest() {
    let titleVlid =    this.titleInp?.validateInput(validateNoEmpty);
    let descVlid =    this.descInp?.validateInput(validateNoEmpty);
    if(!titleVlid || !descVlid ) {
      return;
    }
    this.doctorService.sendTestRequest(this.titleInp?.getInput()!,this.descInp?.getInput()!,this.testTypeActor,this.testTypePriority);
  
    this.titleInp?.setInput("");
    this.descInp?.setInput("");
  } 


  onClickCreatePrescription() {
    this.popupService.showPopup("doctor:create-prescription");
  }

  onViewPrescription() {

    this.popupService.showPopup("doctor:preview-presc");
  }
  

}
