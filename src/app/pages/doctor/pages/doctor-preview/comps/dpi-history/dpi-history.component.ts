import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistoryDataSource } from './dpi-history-datasource';
import { PopupService } from 'src/app/services/popup.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { TestItem } from 'src/app/modules/petient';


@Component({
  selector: 'app-dpi-history',
  templateUrl: './dpi-history.component.html',
  styleUrls: ['./dpi-history.component.css']
})
export class DpiHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TestItem>;
  dataSource: DpiHistoryDataSource;

  list : TestItem[] = [];


  displayedColumns = ["id", "date", "sgph", "reason", "actions"]

  constructor(public popupService: PopupService,
    public doctorService: DoctorService,
    private cdref: ChangeDetectorRef,

  ) {
    this.dataSource = new DpiHistoryDataSource();
  }


  ngAfterViewInit(): void {

    this.doctorService.dpiTests.subscribe(dpis => {
      this.list = [];
      for(let i of dpis) {
        if(i.conductionDate != null) {
          this.list.push(i);
        }
      }
      this.dataSource.data  = this.list;
      this.paginator.length = this.list.length;
        this.paginator._changePageSize(20);
        this.cdref.detectChanges(); 


    })



    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  showResults(test : TestItem) {
    switch(test.actor) {
      case "nurse": 
        this.popupService.setData({
          title: test.title,
          done_at: test.conductionDate,
          actor: "test.",
          obs: 
            test.results,
          
        });
        this.popupService.showPopup("dpi:medical");
      return;
      case "radio":
        this.popupService.setData({
          title: "Leg Radio",
          done_at: "2024-12-7 15:82",
          actor: "Mr.bouboutani",
          results: test.results,
          resume: test.resume,
          imgs:test.imgs,
        });
        this.popupService.showPopup("dpi:radiology");
      return;
      case "baio":1
        this.popupService.setData({
          title: test.title,
          done_at: test.conductionDate,
          actor: "Mr.bouboutani",
          obs: test.resume,
          id: test.id,
          mesurements: test.mesurements,
        });
        this.popupService.showPopup("dpi:graph");
      return;
    }
  }




}
