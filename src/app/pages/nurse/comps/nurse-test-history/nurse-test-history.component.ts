import { AfterViewInit, Component, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistory } from 'src/app/modules/dpi-history';
import Patient from 'src/app/modules/petient';
import { RadioTest } from 'src/app/modules/radio-test';
import { NursePatientTest, NurseService } from 'src/app/services/nurse.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-nurse-test-history',
  templateUrl: './nurse-test-history.component.html',
  styleUrls: ['./nurse-test-history.component.css']
})


export class NurseTestHistoryComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  idx = 0;
  history: RadioTest[] = [];

  patientsList: NursePatientTest[] = [];

  constructor(public popupService: PopupService, public rightBarService: RightBarService, public nurseService: NurseService) {
    this.nurseService.patientsList.asObservable().subscribe((list) => {
      this.patientsList = list;
    });
  }

  ngAfterViewInit(): void {

  }

  onClickQRCode() {
    this.popupService.showPopup("qr-code");
  }  


}

