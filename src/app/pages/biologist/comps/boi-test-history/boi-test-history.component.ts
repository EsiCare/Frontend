import { AfterViewInit, Component, Output, ViewChild , EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistory } from 'src/app/modules/dpi-history';
import { RadioTest } from 'src/app/modules/radio-test';
import { BoilogistService } from 'src/app/services/boilogist.service';
import { NursePatientTest } from 'src/app/services/nurse.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-boi-test-history',
  templateUrl: './boi-test-history.component.html',
  styleUrls: ['./boi-test-history.component.css']
})


export class BoiTestHistoryComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  idx = 0;
  patientsList: NursePatientTest[] = [];


  constructor(public boilogistService : BoilogistService,public popupService: PopupService,public rightBarService: RightBarService) {


    this.boilogistService.patientsList.asObservable().subscribe((list) => {
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

