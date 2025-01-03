import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  qrCodeText = new BehaviorSubject<string>("");

  constructor() { }


}
