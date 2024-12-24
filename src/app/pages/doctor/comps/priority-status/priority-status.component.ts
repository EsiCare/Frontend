import { Component, Input, OnInit } from '@angular/core';
import { DPIPriority } from '../../pages/doctor-preview/comps/dpi-history/dpi-history-datasource';
@Component({
  selector: 'app-priority-status',
  templateUrl: './priority-status.component.html',
  styleUrls: ['./priority-status.component.css']
})
export class PriorityStatusComponent implements OnInit {
  @Input() status : DPIPriority = "Dangerous"; 
  constructor() { }

  ngOnInit(): void {
  }

}
