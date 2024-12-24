import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-stats-item',
  templateUrl: './admin-stats-item.component.html',
  styleUrls: ['./admin-stats-item.component.css']
})
export class AdminStatsItemComponent implements OnInit {
  @Input() name! : string;
  @Input() stat! : number;
  constructor() { }

  ngOnInit(): void {
  }

}
