import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { AdminService } from 'src/app/services/admin.service';
import { POPUP_CREATE_WORKER_KEY, PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-create-worker',
  templateUrl: './admin-create-worker.component.html',
  styleUrls: ['./admin-create-worker.component.css']
})
export class AdminCreateWorkerComponent implements OnInit {
  @ViewChild("name")  nameRef : ElementRef<MInputComponent> | null = null;
  @ViewChild("email") emailRef : ElementRef<MInputComponent> | null = null;
  @ViewChild("phone") phoneRef : ElementRef<MInputComponent> | null = null;
  @ViewChild("nss")   nssRef : ElementRef<MInputComponent> | null = null;

  selectedRole : string = "Doctor";
  selectedSpecialty : string = "Kids";
  
  constructor(public popupService : PopupService,public adminService:  AdminService) { 
  
    this.adminService.getWorkerCreationStatus().subscribe( (value) => {
      if(value == "Successful") {
        this.nameRef?.nativeElement.setInput("");
        this.emailRef?.nativeElement.setInput("");
        this.phoneRef?.nativeElement.setInput("");
        this.nssRef?.nativeElement.setInput("");
      }
    });
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
    let name = this.nameRef?.nativeElement.getInput()!;
    let email = this.emailRef?.nativeElement.getInput()!;
    let phone = this.phoneRef?.nativeElement.getInput()!;
    let nss = this.nssRef?.nativeElement.getInput()!;


    let createOrEdit = "create";
    this.popupService.getData().pipe(take(1)).subscribe(value => createOrEdit = value[POPUP_CREATE_WORKER_KEY]).unsubscribe();
    if(createOrEdit == "create") {
      this.adminService.createWorker(this.selectedRole,this.selectedSpecialty,name,email,phone,nss,);
    } else {
      // this.adminService.updateWorker();
    }
  }

  onSelectRole(role : string) {
    this.selectedRole = role;
  }

  onSelectSpecialty(spec: string) {
    this.selectedSpecialty = spec;
  }
}

