import { Component, OnInit, Output } from '@angular/core';
import { NavBarComponent } from 'src/app/comps/nav-bar/nav-bar.component';
import { RightBarService } from 'src/app/services/right-bar.service';
@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {
  @Output() myDataArray = [];
  constructor(public rightBarService: RightBarService) { }

  ngOnInit(): void {
  }
  

}
