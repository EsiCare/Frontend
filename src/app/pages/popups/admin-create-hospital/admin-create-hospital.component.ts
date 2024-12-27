import { Component, OnInit, ViewChild } from '@angular/core';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { AdminService } from 'src/app/services/admin.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-create-hospital',
  templateUrl: './admin-create-hospital.component.html',
  styleUrls: ['./admin-create-hospital.component.css']
})
export class AdminCreateHospitalComponent implements OnInit {
  @ViewChild("nameRef") nameRef: MInputComponent | null = null;
  @ViewChild("addrRef") addrRef: MInputComponent | null = null;



  constructor(public popupService: PopupService, public admin_service: AdminService) { 
    this.admin_service.getHospitalCreationStatus().subscribe( (value) => {
      if(value == "Successful") {
        this.nameRef?.setInput("");
        this.addrRef?.setInput("");
      }
    },
  )
  }

  ngOnInit(): void {

   
  }

  onClick(e: any) {
    e.stopPropagation();
  }

  onChangeInput() {
    this.admin_service.resetHospitalCreationStatus();
  }

  _onCreateHospital() {
    let nameValid = this.nameRef?.validateInput(validateNoEmpty);
    let addrValid = this.addrRef?.validateInput(validateNoEmpty);

    if (!nameValid || !addrValid) { return; }

    const name = this.nameRef!.getInput();
    const addr = this.addrRef!.getInput();

    this.admin_service.createHospital(name, addr);
  }
}
