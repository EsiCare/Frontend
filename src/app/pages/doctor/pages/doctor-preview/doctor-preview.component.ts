import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-preview',
  templateUrl: './doctor-preview.component.html',
  styleUrls: ['./doctor-preview.component.css'],
})
export class DoctorPreviewComponent implements OnInit {

  constructor(public doctorService: DoctorService,public router:  Router) {
    this.doctorService.selectedDpi.asObservable().subscribe((dpi) => {
      if(dpi == undefined) {
        // this.router.navigateByUrl("/doctor");
      }
    });
   }

  ngOnInit(): void {
  

  }

}
