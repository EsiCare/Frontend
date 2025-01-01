import { Component } from '@angular/core';
import { TestItem } from 'src/app/modules/petient';
import { DoctorService } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent  {
  idx = 0;
  tests : TestItem[] = [];


  constructor(public popupService: PopupService,public rightBarService: RightBarService,public doctorService :DoctorService) {
    this.doctorService.dpiTests.asObservable().subscribe((list) => {
      this.tests = list;
    });

  }

  ngAfterViewInit(): void {

  }

  
}

