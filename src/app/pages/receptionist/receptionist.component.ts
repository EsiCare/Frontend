import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { RecpService } from 'src/app/services/recp.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {

  @ViewChild("fullNameInp") fullNameInp : MInputComponent  | null = null;
  @ViewChild("NNSInp")      NNSInp : MInputComponent  | null = null;
  @ViewChild("birthInp") birthInp : MInputComponent  | null = null;
  @ViewChild("genderInp") genderInp : MInputComponent  | null = null;
  @ViewChild("addressInp") addressInp : MInputComponent  | null = null;
  @ViewChild("phoneNumInp") phoneNumInp : MInputComponent  | null = null;
  @ViewChild("emailInp") emailInp : MInputComponent  | null = null;
  @ViewChild("emNameInp") emNameInp : MInputComponent  | null = null;
  @ViewChild("emPhoneInp") emPhoneInp : MInputComponent  | null = null;
  @ViewChild("pastMedInp") pastMedInp : MInputComponent  | null = null;


  isNew : boolean = true;

  constructor(public rightBarService: RightBarService,public recpService : RecpService) { 
    this.recpService.selectedPatientIdx.asObservable().subscribe((idx) => {
      this.isNew = idx == -1;
      if(!this.isNew) {
        let patient = this.recpService.patientsList.value[idx];
        this.fullNameInp?.setInput(patient.name);
        this.NNSInp?.setInput(patient.SSN);
        this.birthInp?.setInput(patient.dateAdded);
        this.genderInp?.setInput(patient.gender);
        this.addressInp?.setInput(patient.address);
        this.phoneNumInp?.setInput(patient.phoneNumber);
        this.emailInp?.setInput(patient.email);
        this.emNameInp?.setInput(patient.emergencyContactName);
        this.emPhoneInp?.setInput(patient.emergencyContactPhone);
        this.pastMedInp?.setInput(patient.pastMedical);  
      } else {
        this.onClickClear();
      }
    }); 
  }

  ngOnInit(): void {
  }


  onClickClear() {
    this.fullNameInp?.setInput("");
    this.NNSInp?.setInput("");
    this.birthInp?.setInput("");
    this.genderInp?.setInput("");
    this.addressInp?.setInput("");
    this.phoneNumInp?.setInput("");
    this.emailInp?.setInput("");
    this.emNameInp?.setInput("");
    this.emPhoneInp?.setInput("");
    this.pastMedInp?.setInput("");   
  }

  onClickCreate() {
    let fullNameValid =  this.fullNameInp?.validateInput(validateNoEmpty);
    let NNSValid =  this.NNSInp?.validateInput(validateNoEmpty);
    let birthValid =  this.birthInp?.validateInput(validateNoEmpty);
    let genderValid =  this.genderInp?.validateInput(validateNoEmpty);
    let addressValid =  this.addressInp?.validateInput(validateNoEmpty);
    let phoneNumValid =  this.phoneNumInp?.validateInput(validateNoEmpty);
    let emailValid =  this.emailInp?.validateInput(validateNoEmpty);
    let emNameValid =  this.emNameInp?.validateInput(validateNoEmpty);
    let emPhoneValid =  this.emPhoneInp?.validateInput(validateNoEmpty);
    let pastMedValid =  this.pastMedInp?.validateInput(validateNoEmpty);   

    if(
      !fullNameValid || 
      !NNSValid || 
      !birthValid || 
      !genderValid || 
      !addressValid || 
      !phoneNumValid || 
      !emailValid || 
      !emNameValid || 
      !emPhoneValid || 
      !pastMedValid 
    ) {
      return;
    }

    this.recpService.registerPatient(
    this.addressInp?.getInput() || '',
    this.fullNameInp?.getInput() || '',
    this.phoneNumInp?.getInput() || '',
    this.NNSInp?.getInput() || '',
    this.birthInp?.getInput() || '',
    this.genderInp?.getInput() || '',
    this.emNameInp?.getInput() || '',
    this.emPhoneInp?.getInput() || '',
    this.emailInp?.getInput() || '',
    );



  }

  onClickEdit(id : string) {
    
  }


}


