import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  curHospital : string = "Esi Hospital";
  constructor(public popupService : PopupService) { }

  ngOnInit(): void {
    this.onCreateHospital();
  }
  


  onCreateHospital() {
    this.popupService.setData({
      title: "Full Blood Test",
      done_at: "2024-12-7 15:82",
      actor: "Mr.bouboutani",
      obs: [
        "Patient tolerated the injection well.",
        "No bleeding or swelling at the injection site post-administration.",
        "Patient reported mild discomfort during the procedure, which subsided immediately."
      ],
    });
    this.popupService.showPopup("admin:delete-worker");
  }

}
