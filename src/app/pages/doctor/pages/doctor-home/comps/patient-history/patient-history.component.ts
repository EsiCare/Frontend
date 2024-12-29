import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientHistoryDataSource, PatientHistoryItem } from './patient-history-datasource';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PatientHistoryItem>;
  dataSource: PatientHistoryDataSource;

  optionMenuID : number = -1;
  

  displayedColumns = ["id", "date","duration","sgph","reason","actions"]

  constructor(public router : Router) {
    this.dataSource = new PatientHistoryDataSource();
  }


  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  public showOptionsMenu(id : number) {
    this.optionMenuID = id;
  }
  public hideOptionsMenu(e : any) {
    e.stopPropagation();
    this.optionMenuID = -1;
  }


  onClickPreivewDPI() {
      this.router.navigateByUrl("patient/dpi");
  }


}
