import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientHistoryDataSource } from './doctor-patient-history-datasource';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import Actor from 'src/app/modules/actor';
import { DoctorService } from 'src/app/services/doctor.service';
import { take } from 'rxjs';
import Patient, { HistoryItem } from 'src/app/modules/petient';

@Component({
  selector: 'app-doctor-patient-history',
  templateUrl: './doctor-patient-history.component.html',
  styleUrls: ['./doctor-patient-history.component.css']
})
export class DoctorPatientHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HistoryItem>;
  dataSource: PatientHistoryDataSource;

  optionMenuID : number = -1;

  curPatient : Patient = {actor : Actor.fake(), history: []}; 

  

  displayedColumns = ["id", "date","duration","sgph","reason","actions"]

  constructor(public popupService : PopupService, public router : Router, public doctorService: DoctorService,

    private cdref: ChangeDetectorRef,


  ) {
    this.dataSource = new PatientHistoryDataSource();
  }


  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;


    this.doctorService.selectedPatientIdx.asObservable().subscribe((idx) => {
      if(idx < 0) { return; }  
      let list : Patient[] = [];
        this.doctorService.patientsList.asObservable().pipe(take(1)).subscribe(data => list = data).unsubscribe();
        this.curPatient = list[idx];
        if(this.curPatient.actor.address.length > 20) {
          this.curPatient.actor.address = this.curPatient.actor.address.slice(0,20) + "..."; 

          this.dataSource.data = this.curPatient.history;
          this.paginator._changePageSize(this.curPatient.history.length); 

        }
    });
    this.doctorService.selectedHistory.asObservable().subscribe((list) => {
      if(!list.length) return;
      this.dataSource.data = list;
      this.dataSource.paginator = this.paginator;
      this.paginator.length = list.length;
        this.paginator._changePageSize(20);
        this.cdref.detectChanges(); 
    });

  }


  public showOptionsMenu(id : number) {
    this.optionMenuID = id;
  }
  public hideOptionsMenu(e : any) {
    e.stopPropagation();
    this.optionMenuID = -1;
  }



  onClickPreivewDPI(id : number) {
    this.doctorService.setSelectedDpi(id);
    
      this.router.navigateByUrl("doctor/dpi");
  }

  onClickAddDpi() {
    this.popupService.showPopup("doctor:create-dpi");
  }
}
