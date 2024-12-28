import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { validateNoEmpty } from 'src/app/modules/input-validators';
import { AdminService } from 'src/app/services/admin.service';
import { POPUP_CREATE_WORKER_KEY, PopupService } from 'src/app/services/popup.service';
import { capitalize } from 'src/app/utils/func';

@Component({
  selector: 'app-admin-create-worker',
  templateUrl: './admin-create-worker.component.html',
  styleUrls: ['./admin-create-worker.component.css']
})
export class AdminCreateWorkerComponent implements OnInit {
  @ViewChild("name")  nameRef : MInputComponent | null  = null;
  @ViewChild("email") emailRef : MInputComponent | null  = null;
  @ViewChild("phone") phoneRef : MInputComponent | null  = null;
  @ViewChild("nss")   nssRef : MInputComponent | null  = null;

  selectedRole : string = "Doctor";
  selectedSpecialty : string = "Kids";
  
  constructor(public popupService : PopupService,public adminService:  AdminService) { 
  
    this.adminService.getWorkerCreationStatus().subscribe( (value) => {
      let isEdit = false;
      this.popupService.getData().pipe(take(1)).subscribe(data => {
        isEdit = data[POPUP_CREATE_WORKER_KEY] != "create";
      }).unsubscribe();
      if(
          value == "Successful" && 
          !isEdit 
        ) {
        this.nameRef?.setInput("");
        this.emailRef?.setInput("");
        this.phoneRef?.setInput("");
        this.nssRef?.setInput("");
      }
    });


    
    this.popupService.getData().pipe(take(1)).subscribe(data => {
      if(data[POPUP_CREATE_WORKER_KEY] == "edit") {
        this.selectedRole = capitalize(data.worker.role);
        this.selectedSpecialty = data.worker.specialty || "Kids";
      }
    }).unsubscribe();

  }

  ngOnInit(): void {
  }


  onClick(e: any) {
    e.stopPropagation();
  } 

  onChangeInput() {
    this.adminService.resetworkerCreationStatus();
  }

  onConfirm() {

    let nameValid = this.nameRef?.validateInput(validateNoEmpty);
    let emailValid = this.emailRef?.validateInput(validateNoEmpty);
    let phoneValid = this.phoneRef?.validateInput(validateNoEmpty);
    let nssValid = this.nssRef?.validateInput(validateNoEmpty);
    if(
      !nameValid || 
      !emailValid || 
      !phoneValid || 
      !nssValid 
    ) {
      return;
    }


    let name = this.nameRef?.getInput()!;
    let email = this.emailRef?.getInput()!;
    let phone = this.phoneRef?.getInput()!;
    let nss = this.nssRef?.getInput()!;


    let createOrEdit = "create";
    this.popupService.getData().pipe(take(1)).subscribe(value => createOrEdit = value[POPUP_CREATE_WORKER_KEY]).unsubscribe();
    if(createOrEdit == "create") {
      this.adminService.createWorker(this.selectedRole,this.selectedSpecialty,name,email,phone,nss,);
    } else {
      this.adminService.updateWorker(this.selectedRole,this.selectedSpecialty,name,email,phone,nss,);
    }
  }

  onSelectRole(role : string) {
    this.selectedRole = role;
  }

  onSelectSpecialty(spec: string) {
    this.selectedSpecialty = spec;
  }
}

