import { Component, OnInit, Output } from '@angular/core';
import { NavBarComponent } from 'src/app/comps/nav-bar/nav-bar.component';
@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  @Output() myDataArray = [];
  constructor() { }

  ngOnInit(): void {
  }

}
