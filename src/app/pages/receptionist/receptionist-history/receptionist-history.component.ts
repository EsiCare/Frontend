import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import Actor from 'src/app/modules/actor';
import Patient from 'src/app/modules/petient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';
import { QrcodeService } from 'src/app/services/qrcode.service';
import { RecpService } from 'src/app/services/recp.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-receptionist-history',
  templateUrl: './receptionist-history.component.html',
  styleUrls: ['./receptionist-history.component.css']
})
export class ReceptionistHistoryComponent {
  patientsList : Actor[] = [];


@ViewChild("searchInp") searchInp : ElementRef<HTMLInputElement> | null = null ;


  @Output() onSelectPatient :EventEmitter<any>  = new EventEmitter();
  constructor(public qrcodeService: QrcodeService,public popupService : PopupService,public rightBarServise: RightBarService, public recpService : RecpService) {
    recpService.loadAllPatients();
    recpService.patientsList.asObservable().subscribe((list) => {
      this.patientsList = list;
    })
  }



  ngOnInit(): void {
    this.qrcodeService.qrCodeText.asObservable().subscribe((result) => {
      if(result) {
        this.searchInp!.nativeElement.value = result;
        this.searchByNNS();
      }
    });
  }


  onClickAddPatient() {
    this.recpService.selectedPatientIdx.next(-1);
  }


  onClickQRCode() {
    this.popupService.showPopup("qr-code");
  }



  searchByNNS() {
    this.recpService.searchByNNS(this.searchInp?.nativeElement.value || '');
  }


}
