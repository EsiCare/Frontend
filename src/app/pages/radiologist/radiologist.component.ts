import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MInputFieldComponent } from 'src/app/comps/minputfield/minput-field.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { AuthService } from 'src/app/services/auth.service';
import { NursePatientTest } from 'src/app/services/nurse.service';
import { RadioService } from 'src/app/services/radio.service';
import { RightBarService } from 'src/app/services/right-bar.service';
import { convertFileToBase64, uploadImg } from 'src/app/utils/func';


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
  selector: 'app-radiologist',
  templateUrl: './radiologist.component.html',
  styleUrls: ['./radiologist.component.css']
})
export class RadiologistComponent implements OnInit {
  requested!: RadioRequestedTestInfo;
  @ViewChild("fileInput") fileInput: ElementRef<HTMLInputElement> | null = null;
  @ViewChild("resumeInp") resumeInp: MInputFieldComponent | null = null;
  patient: NursePatientTest | undefined = undefined;
  imgData : Array<any> = [];

  constructor(public rightBarService: RightBarService, public authService: AuthService, public radioService: RadioService) {
    this.radioService.getRequests().then(() => {
      this.radioService.selectedPatientIdx.next(0);
    });



    this.radioService.getSelectedPatientIdx().subscribe(idx => {
      this.patient = this.radioService.patientsList.value[idx];
      if(this.patient) {
        if(Object.keys(this.patient.imgs).length == 0) {
          this.imgData = [];
        }else {
          this.imgData = this.patient.imgs;
        }
      }
    })


  }

  ngOnInit(): void {
  }


  onInitFile() {
    this.fileInput?.nativeElement.click();
  }
  async onUploadFile(e: any) {
    let files = e.target.files as FileList;
    let res =  await uploadImg(files[0]);
    this.imgData.push({
      name  : files[0].name,
      date : new Date().toLocaleString(),
      url : res.data.url,
    });
  }
  onClickRemoveImg(idx : number) {
    this.imgData.splice(idx,1); 
  }


  onClickSubmit() {
    if(!this.resumeInp?.validateInput(validateNoEmpty)) {
      return;
    }


  this.radioService.submitResult(this.imgData,this.resumeInp?.getInput());    
  }

  onClickImg(idx : number) {
    window.open(this.imgData[idx].url);
  }
}
