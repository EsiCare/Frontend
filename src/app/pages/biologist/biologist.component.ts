import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { AuthService } from 'src/app/services/auth.service';
import { BoilogistService } from 'src/app/services/boilogist.service';
import { NursePatientTest } from 'src/app/services/nurse.service';
import { RightBarService } from 'src/app/services/right-bar.service';



interface RadioImgData {
  name: string;
  date: string;
  data: Uint8Array | undefined;

}
interface RadioRequestedTestInfo {
  name: string;
  imgs: RadioImgData[];
  notes: string[];

}

@Component({
  selector: 'app-biologist',
  templateUrl: './biologist.component.html',
  styleUrls: ['./biologist.component.css']
})
export class BoilogistHomeComponent implements OnInit {
  @ViewChild("mesursInp") mesursInp: ElementRef<HTMLElement> | null = null;
  @ViewChild("resInp") resInp: MInputComponent | null = null;

  patient: NursePatientTest | undefined = undefined;
  mesus : any = [0,0,0,0,0,0,0,0,0,0];

  constructor(public boilogistService: BoilogistService, public rightBarService: RightBarService, public authService: AuthService) {



    this.boilogistService.getRequests().then(() => {
      this.boilogistService.selectedPatientIdx.next(0);
    });

    this.boilogistService.getSelectedPatientIdx().subscribe(idx => {
      this.patient = this.boilogistService.patientsList.value[idx];
      // console.log((this.patient as any).mesurements)
      if(this.patient && this.patient.mesurements) {
        this.mesus =  this.patient.mesurements ? Object.values(this.patient.mesurements) : this.mesus;
        if(!this.mesus.length) {
          this.mesus  = [0,0,0,0,0,0,0,0,0,0];
        }
      }
    })


  }
// mesursInp

  ngOnInit(): void {
  }






  onClickSubmit() {
    let inps = this.mesursInp!.nativeElement.querySelectorAll("input");

    let names = ['Hb','WBC','PLT','Glycémie','Créatinine','Urée','Cholestérol','CRP','ALT','Triglycérides',]
    let mesurs :any = {};
    for (let i = 0; i < inps.length; i++) {
      if(inps[i].value == ""){
        return;
      }      
      mesurs[names[i]] = inps[i].value;
    }

    if(!this.resInp?.validateInput(validateNoEmpty)) {
      return;
    }




  
    this.boilogistService.submitResult(
      mesurs,
      this.resInp.getInput() || "",
    );
  }
}
