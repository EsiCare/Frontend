import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import Patient from 'src/app/modules/petient';
import { AuthService } from 'src/app/services/auth.service';
import { NursePatientTest, NurseService } from 'src/app/services/nurse.service';
import { RightBarService } from 'src/app/services/right-bar.service';



interface RadioImgData {
  name: string;
  date: string;
  data: Uint8Array | undefined;
  
}
interface RadioRequestedTestInfo {
  name : string;
  imgs : RadioImgData[];
  notes: string[];

}

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseHomeComponent implements OnInit {
  requested! :  RadioRequestedTestInfo;
  @ViewChild("resumeInp") resumeInp : MInputComponent | null = null;
  
  patient : NursePatientTest | undefined = undefined;


  constructor(public rightBarService: RightBarService,public authService :AuthService, public nurseService: NurseService) {
    this.nurseService.getRequests().then(() => {
      this.nurseService.selectedPatientIdx.next(0);
    }); 

    this.nurseService.getSelectedPatientIdx().subscribe(idx => {
      this.patient =  this.nurseService.patientsList.value[idx];
    })

  }

  ngOnInit(): void {
  }


  async onClickSumbmit() {
    if(!this.resumeInp?.validateInput(validateNoEmpty)) {
      return;
    }
    this.nurseService.submitResult(this.resumeInp?.getInput() || '');

    this.resumeInp.setInput("");
  }

}
