import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup
import { MInputComponent } from 'src/app/comps/minput/minput.component';
import { QrcodeService } from 'src/app/services/qrcode.service';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {
  @ViewChild("qrcodeInp") qrcodeInp: ElementRef<HTMLInputElement> | null = null;
  @ViewChild("textInput") textInput: MInputComponent | null = null;
  @ViewChild("vidInp") vidInp: ElementRef<HTMLVideoElement> | null = null;

  qr_visible : boolean = false;

  constructor(public qrcodeService: QrcodeService,public popupService: PopupService) { }

  ngOnInit(): void {
  }


  onClick(e: any) {
    e.stopPropagation();
  }


  onClickQRCode() {
    const qrScanner = new QrScanner(
      this.vidInp?.nativeElement!,
      result => {
        this.textInput!.setInput(result.data);
        qrScanner.stop();
        this.qr_visible = false; 
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );
    qrScanner.start().then(() => this.qr_visible = true);

  }

  onClickContinue() {
    this.qrcodeService.qrCodeText.next(this.textInput?.getInput() || '');
    this.popupService.hidePopup();
  }
  onCLickCancel() {
    this.popupService.hidePopup();
  }
}
