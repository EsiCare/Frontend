import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  @ViewChild("qrcodeInp") qrcodeInp: ElementRef<HTMLInputElement> | null = null ;

  constructor(public popupService : PopupService ) { }

  ngOnInit(): void {
  }


  onClick(e: any) {
    e.stopPropagation();
  } 


  onClickQRCode() {
    this.qrcodeInp?.nativeElement.click();
  }

  onClickContinue() {
    this.popupService.hidePopup();
  }
  onCLickCancel() {
    this.popupService.hidePopup();
  }
}
