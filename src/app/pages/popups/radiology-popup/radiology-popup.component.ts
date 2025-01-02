import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';


interface RadiologyData {
  title  : string;
  done_at : string;
  actor : string;
  imgs : string[];
}

@Component({
  selector: 'app-radiology-popup',
  templateUrl: './radiology-popup.component.html',
  styleUrls: ['./radiology-popup.component.css']
})


export class RadiologyPopupComponent implements OnInit {
  imgIndex = 0; 
  
  constructor(public popupService : PopupService) { }

  
  ngOnInit(): void {
  }


  onClick(e : any) {
    e.stopPropagation();
  }


  incImgIdx() {
    this.imgIndex = (this.imgIndex + 1) % this.popupService.popupData.imgs.length;
  }
  decImgIdx() {
    this.imgIndex = (this.imgIndex - 1) % this.popupService.popupData.imgs.length;
  }

}

export type {RadiologyData};
