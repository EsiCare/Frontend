import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import Patient from 'src/app/modules/petient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { RecpService } from 'src/app/services/recp.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {

  displayedColumns = ['id', 'name'];
  patientsList : Patient[] = [];


  @ViewChild("searchInp") searchInp : ElementRef<HTMLInputElement> | null = null ;


  @Output() onSelectPatient :EventEmitter<any>  = new EventEmitter();
  constructor(public recpService : RecpService,public qrcodeService: QrcodeService,public popupService: PopupService,public rightBarServise: RightBarService, public doctorService : DoctorService) {
    doctorService.patientsList.asObservable().subscribe((list) => {
      this.patientsList = list;
    })

    this.qrcodeService.qrCodeText.asObservable().subscribe((result) => {
      if(this.searchInp) {
        this.searchInp!.nativeElement.value = result;
        this.searchByNNS();
      }
    })
  }



  onClickSelectPatient(idx : number) {
    this.doctorService.loadPatientInfo(idx);
  }




  onClickQRCode() {
    this.popupService.showPopup("qr-code");
  }
  

searchByNNS() {
    this.doctorService.searchByNNS(this.searchInp?.nativeElement.value || '');
  }

  
}
