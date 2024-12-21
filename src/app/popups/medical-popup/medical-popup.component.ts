import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';


interface MedicalData {
  title  : string;
  done_at : string;
  actor : string;
  obs : string[];
}

@Component({
  selector: 'app-medical-popup',
  templateUrl: './medical-popup.component.html',
  styleUrls: ['./medical-popup.component.css']
})


export class MedicalPopupComponent implements OnInit {
  
  constructor(public popupService : PopupService) { }

  
  ngOnInit(): void {
  }


  onClick(e : any) {
    e.stopPropagation();
  }



}

