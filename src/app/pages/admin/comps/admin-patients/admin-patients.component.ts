import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientHistoryDataSource } from './admin-patients-datasource';
import PatientHistoryItem from 'src/app/modules/patient-history-Item';

@Component({
  selector: 'app-admin-patients',
  templateUrl: './admin-patients.component.html',
  styleUrls: ['./admin-patients.component.css']
})
export class AdminPatientsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PatientHistoryItem>;

  
  @Input() data: PatientHistoryItem[] = [];
  dataSource : PatientHistoryDataSource;
  optionMenuID : number = -1;
  

  displayedColumns = ["nss","name","gender","address","entered_at"]

  
  constructor( private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new PatientHistoryDataSource();
  }

  public setData(data : any) {
    this.dataSource.data = data;
    this.paginator._changePageSize(data.length); 
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
