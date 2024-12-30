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

    // this.popupService.setData({
      // title: "Sql injection",
      // done_at: "2024-12-7 15:82",
      // actor: "Mr.bouboutani",
      // obs: [
      //   "Patient tolerated the injection well.",
      //   "No bleeding or swelling at the injection site post-administration.",
      //   "Patient reported mild discomfort during the procedure, which subsided immediately."
      // ],
    // });
    // this.popupService.showPopup("dpi:medical");

  }


  showResults() {
    // this.popupService.setData({
    //   title: "Leg Radio",
    //   done_at: "2024-12-7 15:82",
    //   actor: "Mr.bouboutani",
    //   imgs: ["https://aquifer.org/wp-content/uploads/2017/12/Aquifer-Website-Featured-Images-e1518011485609.jpg"],
    // });
    // this.popupService.showPopup("dpi:radiology");


    // this.popupService.setData({
    //   title: "Sql injection",
    //   done_at: "2024-12-7 15:82",
    //   actor: "Mr.bouboutani",
    //   obs: [
    //     "Patient tolerated the injection well.",
    //     "No bleeding or swelling at the injection site post-administration.",
    //     "Patient reported mild discomfort during the procedure, which subsided immediately."
    //   ],
    // });
    // this.popupService.showPopup("dpi:medical");


    this.popupService.setData({
      title: "Full Blood Test",
      done_at: "2024-12-7 15:82",
      actor: "Mr.bouboutani",
      obs: [
        "Patient tolerated the injection well.",
        "No bleeding or swelling at the injection site post-administration.",
        "Patient reported mild discomfort during the procedure, which subsided immediately."
      ],
    });
    this.popupService.showPopup("dpi:graph");
  }




}
