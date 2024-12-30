import { Component, Input, OnInit } from '@angular/core';
import { SGPHType } from 'src/app/modules/patient-history-Item';
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
