import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PatientHistoryDataSource } from './patient-history-datasource';
import { PatientService } from 'src/app/services/patient.service';
import { HistoryItem } from 'src/app/modules/petient';
import { PopupService } from 'src/app/services/popup.service';
import { Router } from '@angular/router';
import { DoctorService, LASTEST_DPI } from 'src/app/services/doctor.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<HistoryItem>;
  dataSource: PatientHistoryDataSource;

  optionMenuID: number = -1;


  displayedColumns = ["id", "date", "duration", "sgph", "reason", "actions"]



  medicalHistory: HistoryItem[] = [];
    constructor(
      public patientService: PatientService,
      public authService: AuthService,
      public doctorService: DoctorService,
      public router: Router,
    private cdref: ChangeDetectorRef,

  ) {
    this.dataSource = new PatientHistoryDataSource();
  }



  ngAfterViewInit(): void {

    this.patientService.loadMedicalHistory();
    this.patientService.medicalHistory.asObservable().subscribe((list) => {
      let l = [];
      for(let i of list) {
      if(i.lastedFor.length) {
        l.push(i);
      }
      }

      this.medicalHistory = l;
      this.dataSource.data = l;
      this.paginator._changePageSize(l.length);
      this.cdref.detectChanges();

    });



    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  public showOptionsMenu(id: number) {
    this.optionMenuID = id;
  }
  public hideOptionsMenu(e: any) {
    e.stopPropagation();
    this.optionMenuID = -1;
  }


  public onClickPreview(dpi : HistoryItem) {
    let a : any;
    this.authService.getActor().pipe(take(1)).subscribe(actor => a = actor).unsubscribe()

    localStorage.setItem(LASTEST_DPI, JSON.stringify({ id: dpi.id, patientInfo: a }));
    this.doctorService.selectedDpi.next(dpi);
    this.router.navigateByUrl("patient/dpi");
    
  }


}
