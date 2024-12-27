import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { HospitalStat } from 'src/app/modules/hospital-info';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-admin-status',
  templateUrl: './admin-status.component.html',
  styleUrls: ['./admin-status.component.css']
})
export class AdminStatusComponent implements OnInit {
  @Input() stats : HospitalStat =  {doctor_count : 0,nurse_count : 0,administrative_count : 0,radiologist_count : 0,laborantin_count : 0,};

   

  constructor() { }

  ngOnInit(): void {
  }


}
