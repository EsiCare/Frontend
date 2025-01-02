import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-preview-pres',
  templateUrl: './preview-pres.component.html',
  styleUrls: ['./preview-pres.component.css']
})
export class PreviewPresComponent implements OnInit {
  presc : any = null;
  constructor(public doctorService : DoctorService) { 
    this.doctorService.previewPrescription();
    this.doctorService.curPresc.asObservable().subscribe((presc) => {
      this.presc = presc; 
      console.log(this.presc)
    }); 
  }

  ngOnInit(): void {
  }


  onClick(e: any) {
    e.stopPropagation();
  } 


  onClickPrint() {
    print();
  }
}


