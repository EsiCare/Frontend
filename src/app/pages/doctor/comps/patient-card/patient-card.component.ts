import { Component, Input, OnInit } from '@angular/core';
import Patient from 'src/app/modules/petient';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css']
})
export class PatientCardComponent implements OnInit {
  @Input() Patient?  : Patient;
  @Input() selected : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
