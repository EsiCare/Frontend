import { Component, OnInit, Output } from '@angular/core';
import { NavBarComponent } from 'src/app/comps/nav-bar/nav-bar.component';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';
@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  @Output() myDataArray = [];
  constructor(public rightBarService: RightBarService,public popupService: PopupService) { }

  ngOnInit(): void {
  }
  

  onCreateDpi() {

    this.popupService.showPopup("doctor:create-dpi");
  }
  

}
