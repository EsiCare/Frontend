import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-create-dpi',
  templateUrl: './admin-create-dpi.component.html',
  styleUrls: ['./admin-create-dpi.component.css']
})
export class DoctorCreateDpiComponent implements OnInit {

  constructor(public popupService: PopupService,private _router: Router) { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  } 

  onCreateDpi() {
      this.popupService.hidePopup();
      this._router.navigate(["dpi"]);
  }

}
