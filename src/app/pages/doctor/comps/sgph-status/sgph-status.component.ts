import { Component, Input, OnInit } from '@angular/core';
import { SGPHType } from '../../pages/doctor-home/comps/patient-history/patient-history-datasource';
@Component({
  selector: 'app-sgph-status',
  templateUrl: './sgph-status.component.html',
  styleUrls: ['./sgph-status.component.css']
})
export class SgphStatusComponent implements OnInit {
  @Input() status : SGPHType = "Pending"; 
  constructor() { }

  ngOnInit(): void {
  }

}
