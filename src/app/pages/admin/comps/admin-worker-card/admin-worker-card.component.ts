import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorkerInfo } from 'src/app/modules/hospital-info';
import { PopupService } from 'src/app/services/popup.service';

type ActorRole = "Administrator" | "Radiologist" | "Biologist" | "Doctor" | "Nurse";

@Component({
  selector: 'app-admin-worker-card',
  templateUrl: './admin-worker-card.component.html',
  styleUrls: ['./admin-worker-card.component.css']
})
export class AdminWorkerCardComponent implements OnInit {
  @Input() name = "";
  @Input() role : string = "Administrator";
  @Input() worker : WorkerInfo | null = null;

  @Input() showMenu! : boolean;

  @Output() showOptionsMenu = new EventEmitter<number>();
  @Output() hideOptionsMenu = new EventEmitter<number>();

  constructor(public popupService: PopupService) { }

  ngOnInit(): void {
  }

  _showOptionsMenu() {
    this.showOptionsMenu.emit();
  }
  _hideOptionsMenu() {
    this.hideOptionsMenu.emit();
  }


  onEditWorker(e: any) {
    e.stopPropagation();
    this.popupService.setData({
      worker: this.worker,
      id: this.worker?.id,
      name : this.worker?.name ,
      email : this.worker?.email,
      phone : this.worker?.phoneNumber,
      nss :   this.worker?.SSN,
      "create-worker-popup": "edit", 

    });
    this.popupService.showPopup("admin:create-worker");
  }
  
  onDeleteWorker(e: any) {
    e.stopPropagation();

    this._hideOptionsMenu();
    this.popupService.setData({
      worker: this.worker,
    });

    this.popupService.showPopup("admin:delete-worker");
  }




  
}
