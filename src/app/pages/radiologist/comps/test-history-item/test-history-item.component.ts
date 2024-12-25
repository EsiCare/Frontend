import { AfterViewInit, Component, Output, ViewChild , EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DpiHistory } from 'src/app/modules/dpi-history';
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
  numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  idx = 0;
  
  
  @Input() historyItem : DpiHistory | null = null;


  constructor() {

  }

  ngAfterViewInit(): void {

  }


  
}

