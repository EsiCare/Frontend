import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  curHospital : string = "Esi Hospital";
  constructor(public popupService : PopupService,public rightBarService: RightBarService) { }

  ngOnInit(): void {
    // this.onCreateHospital();
  }
  


  onCreateHospital() {
    this.popupService.showPopup("admin:create-hospital");
  }


}
