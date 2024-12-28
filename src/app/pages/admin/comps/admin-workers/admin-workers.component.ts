import { AfterViewInit, Component, Output, ViewChild , EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WorkerInfo } from 'src/app/modules/hospital-info';
import { AdminService } from 'src/app/services/admin.service';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.css']
})
export class AdminWorkersComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() list : WorkerInfo[] =  [];
  idx = -1;

  constructor(public adminService : AdminService,public popupService: PopupService,public rightBarService: RightBarService) {
  }

  ngAfterViewInit(): void {

  }

  public showOptionsMenu(idx : number) {
    this.idx = idx;
  }
  public hideOptionsMenu() {
    this.idx = -1;
  }

  
  onAddWorker() {
    this.popupService.setData({ "create-worker-popup": "create" });
    this.popupService.showPopup("admin:create-worker");
  }
  onDeleteWorker() {
    this.popupService.showPopup("admin:delete-worker");
  }

  onSearch(e : any) {
    this.adminService.searchWorker(e.target.value);
  }
}
