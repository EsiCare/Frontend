import { Component, Input, OnInit } from '@angular/core';
import Petient from 'src/app/modules/petient';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css']
})
export class PatientCardComponent implements OnInit {
  @Input() petient?  : Petient;
  @Input() selected : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
