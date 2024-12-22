import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightBarService {

  public patients_bar = false;

  constructor() { }

  public isPatientsBarVisible() : Observable<boolean> {
    return of(this.patients_bar);
  }
  public showPatientsBar() {
    this.patients_bar = true;
  }
  public hidePatientsBar() {
    this.patients_bar = false;
  }
  public togglePatientsBar() {
    this.patients_bar = !this.patients_bar;

  }



}
