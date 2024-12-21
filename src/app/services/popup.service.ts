import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

type PopupType = "None" | "Radiology" | "Medical" | "Graph";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public visable = false;
  public popupType : PopupType = "None";
  public popupData : any = null;

  constructor() { }

  public isVisible() : Observable<boolean> {
    return of(this.visable);
  }
  public showPopup(type : PopupType) {
    this.visable = true;
    this.popupType = type;
  }
  public hidePopup() {
    this.visable = false;
    this.popupType = "None";
  }

  public getType() : Observable<PopupType> {
    return of(this.popupType);
  }


  public setData(data : any)  {
    return this.popupData = data;
  }
  public getData() : Observable<any> {
    return of(this.popupData);
  }



}


export type {PopupType};