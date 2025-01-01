import { Component, Input } from '@angular/core';
import { RadioTest } from 'src/app/modules/radio-test';
import { NursePatientTest } from 'src/app/services/nurse.service';
import { RadioService } from 'src/app/services/radio.service';

@Component({
  selector: 'app-radio-test-history-item',
  templateUrl: 'radio-test-history-item.component.html',
  styleUrls: ['radio-test-history-item.component.css']
})
export class RadioTestHistoryItemComponent  {
  @Input() patient : NursePatientTest  | null = null;
  @Input() idx! : number;


  constructor(public radioService: RadioService) {

  }

  ngAfterViewInit(): void {

  }


  onSelectPatient() {
    this.radioService.selectedPatientIdx.next(this.idx);
  }
}

