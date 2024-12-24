import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-create-hospital',
  templateUrl: './admin-create-hospital.component.html',
  styleUrls: ['./admin-create-hospital.component.css']
})
export class AdminCreateHospitalComponent implements OnInit {

  constructor(public popupService: PopupService) { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  } 

}
