import { Component, Input } from '@angular/core';
import Patient from 'src/app/modules/petient';
import { NursePatientTest, NurseService } from 'src/app/services/nurse.service';

@Component({
  selector: 'app-nurse-test-history-item',
  templateUrl: 'nurse-test-history-item.component.html',
  styleUrls: ['nurse-test-history-item.component.css']
})
export class NurseTestHistoryItemComponent  {
  @Input() patient : NursePatientTest  | null = null;
  @Input() idx! : number;


  constructor(public nurseService : NurseService) {

  }

  ngAfterViewInit(): void {

  }


  onSelectPatient() {
    this.nurseService.selectedPatientIdx.next(this.idx);
  }


  
}

