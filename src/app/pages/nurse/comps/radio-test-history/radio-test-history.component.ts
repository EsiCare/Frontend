import { AfterViewInit, Component, Output, ViewChild , EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistory } from 'src/app/modules/dpi-history';
import { RadioTest } from 'src/app/modules/radio-test';
import { PopupService } from 'src/app/services/popup.service';
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


  constructor(public popupService: PopupService,public rightBarService: RightBarService) {
    for (let i = 0; i < 10; i++) {
        this.history.push({status: 'Dangerous', name : "Head Radio", petient_name: "Boutawad Said", petient_nns: "018239873" });
    }

    // popupService.showPopup("doctor:create-prescription");
  }

  ngAfterViewInit(): void {

  }

  
}

