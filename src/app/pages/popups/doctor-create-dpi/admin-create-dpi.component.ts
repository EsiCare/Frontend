import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MInputFieldComponent } from 'src/app/comps/minputfield/minput-field.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { DoctorService } from 'src/app/services/doctor.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-create-dpi',
  templateUrl: './admin-create-dpi.component.html',
  styleUrls: ['./admin-create-dpi.component.css']
})
export class DoctorCreateDpiComponent implements OnInit {
  @ViewChild("reasonInp") reasonInp: MInputFieldComponent | null = null;
  constructor(public popupService: PopupService, public doctorService: DoctorService, private _router: Router) { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  }

  async onCreateDpi() {
    if (!this.reasonInp?.validateInput(validateNoEmpty)) {
      return;
    }
    await this.doctorService.addNewDpi(this.reasonInp.getInput());
    this.popupService.hidePopup();
    this._router.navigateByUrl("doctor/dpi");
  }

}
