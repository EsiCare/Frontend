import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';


interface PrescriptionData {
  drug: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

@Component({
  selector: 'app-doctor-create-prescription',
  templateUrl: './doctor-create-prescription.component.html',
  styleUrls: ['./doctor-create-prescription.component.css']
})
export class DoctorCreatePerscriptionComponent implements OnInit {

  prescriptions: PrescriptionData[] = [];
  @ViewChild("lastInput") inputRef: ElementRef<any> | null = null;
  @ViewChild("tempInput") tmpInput: ElementRef<any> | null = null;



  constructor(public popupService: PopupService) {
  }



  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  }

  onLastChange() {
    console.log("casj");
    if(this.prescriptions.length == 0) {
      let Drug = this.tmpInput?.nativeElement.querySelectorAll("input")[0].value;
      let Dosage = this.tmpInput?.nativeElement.querySelectorAll("input")[1].value;
      let Frequency = this.tmpInput?.nativeElement.querySelectorAll("input")[2].value;
      let Duration = this.tmpInput?.nativeElement.querySelectorAll("input")[3].value;
      let Instructions = this.tmpInput?.nativeElement.querySelectorAll("input")[4].value;



      this.prescriptions.splice(this.prescriptions.length - 1,0,{
        drug: Drug,
        dosage: Dosage,
        frequency: Frequency,
        duration: Duration,
        instructions: Instructions,
      });



    } else {
      let Drug = this.inputRef?.nativeElement.querySelectorAll("input")[0].value;
      let Dosage = this.inputRef?.nativeElement.querySelectorAll("input")[1].value;
      let Frequency = this.inputRef?.nativeElement.querySelectorAll("input")[2].value;
      let Duration = this.inputRef?.nativeElement.querySelectorAll("input")[3].value;
      let Instructions = this.inputRef?.nativeElement.querySelectorAll("input")[4].value;



      

      this.prescriptions.splice(this.prescriptions.length - 2,0,{
        drug: Drug,
        dosage: Dosage,
        frequency: Frequency,
        duration: Duration,
        instructions: Instructions,
      });
    }

    

    this.inputRef!.nativeElement.querySelectorAll("input")[0].value = this.tmpInput!.nativeElement.querySelectorAll("input")[0].value;
    this.inputRef!.nativeElement.querySelectorAll("input")[1].value = this.tmpInput!.nativeElement.querySelectorAll("input")[1].value;
    this.inputRef!.nativeElement.querySelectorAll("input")[2].value = this.tmpInput!.nativeElement.querySelectorAll("input")[2].value;
    this.inputRef!.nativeElement.querySelectorAll("input")[3].value = this.tmpInput!.nativeElement.querySelectorAll("input")[3].value;
    this.inputRef!.nativeElement.querySelectorAll("input")[4].value = this.tmpInput!.nativeElement.querySelectorAll("input")[4].value;
    this.inputRef!.nativeElement.querySelectorAll("input")[0].focus();



    this.tmpInput!.nativeElement.querySelectorAll("input")[0].value = "";
    this.tmpInput!.nativeElement.querySelectorAll("input")[1].value = "";
    this.tmpInput!.nativeElement.querySelectorAll("input")[2].value = "";
    this.tmpInput!.nativeElement.querySelectorAll("input")[3].value = "";
    this.tmpInput!.nativeElement.querySelectorAll("input")[4].value = "";

  }


  onDeleteItem(i: number) {
    this.prescriptions.splice(i,1);
  }

}
