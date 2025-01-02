import { AfterViewInit, Component, Output, ViewChild , EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistory } from 'src/app/modules/dpi-history';
import { RadioTest } from 'src/app/modules/radio-test';
import { NursePatientTest } from 'src/app/services/nurse.service';
import { PopupService } from 'src/app/services/popup.service';
import { RadioService } from 'src/app/services/radio.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-radio-test-history',
  templateUrl: './radio-test-history.component.html',
  styleUrls: ['./radio-test-history.component.css']
})


export class RadioTestHistoryComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  idx = 0;
  history : RadioTest[] = [];
  patientsList: NursePatientTest[] = [];


  constructor(public radioService: RadioService,public popupService: PopupService,public rightBarService: RightBarService) {

    this.radioService.patientsList.asObservable().subscribe((list) => {
      this.patientsList = list;
    });


    // popupService.showPopup("doctor:create-prescription");
  }

  ngAfterViewInit(): void {

  }

  onClickQRCode() {
    this.popupService.showPopup("qr-code");
  }  
}

