import { AfterViewInit, Component, Output, ViewChild , EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistory } from 'src/app/modules/dpi-history';
import { TestItem } from 'src/app/modules/petient';
import { PopupService } from 'src/app/services/popup.service';
import { RightBarService } from 'src/app/services/right-bar.service';


@Component({
  selector: 'app-test-history-item',
  templateUrl: 'test-history-item.component.html',
  styleUrls: ['test-history-item.component.css']
})
export class TestHistoryItemComponent  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  @Input() test : TestItem | null = null;


  constructor(public popupService: PopupService) {
  }

  ngAfterViewInit(): void {

  }

  onClickResult(test : TestItem) {
    console.log(test);
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

