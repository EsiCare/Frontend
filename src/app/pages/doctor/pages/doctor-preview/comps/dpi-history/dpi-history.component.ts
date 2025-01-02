import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistoryDataSource, DpiHistoryItem } from './dpi-history-datasource';
import { PopupService } from 'src/app/services/popup.service';


@Component({
  selector: 'app-dpi-history',
  templateUrl: './dpi-history.component.html',
  styleUrls: ['./dpi-history.component.css']
})
export class DpiHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DpiHistoryItem>;
  dataSource: DpiHistoryDataSource;



  displayedColumns = ["id", "date", "duration", "sgph", "reason", "actions"]

  constructor(public popupService: PopupService,
  ) {
    this.dataSource = new DpiHistoryDataSource();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  showResults() {

    this.popupService.showPopup("dpi:graph");
  }




}
