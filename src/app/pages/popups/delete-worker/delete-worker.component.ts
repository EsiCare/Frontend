import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-delete-worker',
  templateUrl: './delete-worker.component.html',
  styleUrls: ['./delete-worker.component.css']
})
export class DeleteWorkerComponent implements OnInit {

  constructor(public popupService: PopupService,public adminService: AdminService) { }

  ngOnInit(): void {
  }

  onClick(e: any) {
    e.stopPropagation();
  } 


  onDelete() {
    this.adminService.deleteWorker();
    this.popupService.hidePopup();
  }


}
