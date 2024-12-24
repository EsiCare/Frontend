import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

type ActorRole = "Administrator" | "Radiologist" | "Biologist" | "Doctor" | "Nurse";

@Component({
  selector: 'app-admin-worker-card',
  templateUrl: './admin-worker-card.component.html',
  styleUrls: ['./admin-worker-card.component.css']
})
export class AdminWorkerCardComponent implements OnInit {
  @Input() name = "";
  @Input() role : ActorRole = "Administrator";
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


  onAddWorker(e: any) {
    e.stopPropagation();
    this.popupService.showPopup("admin:create-worker");
  }
  onDeleteWorker(e: any) {
    e.stopPropagation();

    this._hideOptionsMenu();
    this.popupService.showPopup("admin:delete-worker");
  }

}
