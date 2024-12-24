import { AfterViewInit, Component, Output, ViewChild , EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  idx = 0;

  constructor(public popupService: PopupService,public rightBarService: RightBarService) {
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
    this.popupService.showPopup("admin:create-worker");
  }
  onDeleteWorker() {
    this.popupService.showPopup("admin:delete-worker");
  }
}
