import { Component, Input } from '@angular/core';
import { RadioTest } from 'src/app/modules/radio-test';
import { BoilogistService } from 'src/app/services/boilogist.service';
import { NursePatientTest } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-boi-test-history-item',
  templateUrl: 'boi-test-history-item.component.html',
  styleUrls: ['boi-test-history-item.component.css']
})
export class BoiTestHistoryItemComponent  {
  @Input() patient : NursePatientTest  | null = null;
  @Input() idx! : number;

  constructor(public boilogistService: BoilogistService) {

  }

  ngAfterViewInit(): void {

  }



  onSelectPatient() {
    this.boilogistService.selectedPatientIdx.next(this.idx);
  }
  
}

