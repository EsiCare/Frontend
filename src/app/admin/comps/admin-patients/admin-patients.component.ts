import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientHistoryDataSource, PatientHistoryItem } from './admin-patients-datasource';

@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PatientHistoryItem>;
  dataSource: PatientHistoryDataSource;

  optionMenuID : number = -1;
  

  displayedColumns = ["nss","name","gender","address","entered_at"]

  
  constructor() {
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


}
