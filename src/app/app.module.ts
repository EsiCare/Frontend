import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from 'src/login/login.component';
import { MInputComponent } from '../comps/minput/minput.component';
import { DoctorHomeComponent } from './doctor/pages/doctor-home/doctor-home.component';
import { NavBarComponent } from './comps/nav-bar/nav-bar.component';
import { TitleInfoComponent } from './doctor/comps/title-info/title-info.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientCardComponent } from './doctor/comps/patient-card/patient-card.component';
import { SgphStatusComponent } from './doctor/comps/sgph-status/sgph-status.component';
import { DoctorPreviewComponent } from './doctor/pages/doctor-preview/doctor-preview.component';
import { DpiInfoComponent } from './doctor/pages/doctor-preview/comps/patient-info/dpi-info.component';
import { PatientInfoComponent } from './doctor/pages/doctor-home/comps/patient-info/patient-info.component';
import { PatientHistoryComponent } from './doctor/pages/doctor-home/comps/patient-history/patient-history.component';
import { PatientsComponent } from './doctor/pages/doctor-home/comps/patients/patients.component';
import { DpiHistoryComponent } from './doctor/pages/doctor-preview/comps/dpi-history/dpi-history.component';
import { PriorityStatusComponent } from './doctor/comps/priority-status/priority-status.component';
import { RadiologyPopupComponent } from './popups/radiology-popup/radiology-popup.component';
import { MedicalPopupComponent } from './popups/medical-popup/medical-popup.component';
import { GraphPopupComponent } from './popups/graph-popup/graph-popup.component';
import { AdminComponent } from './admin/pages/admin-home/admin.component';
import { AdminStatusComponent } from './admin/comps/admin-status/admin-status.component';
import { AdminPatientsComponent } from './admin/comps/admin-patients/admin-patients.component';
import { AdminWorkersComponent } from './admin/comps/admin-workers/admin-workers.component';
import { AdminWorkerCardComponent } from './admin/comps/admin-worker-card/admin-worker-card.component';
import { AdminStatsItemComponent } from './admin/comps/admin-stats-item/admin-stats-item.component';
import { LineChartComponent } from './admin/comps/admin-status/graph/line-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MInputComponent,
    DoctorHomeComponent,
    NavBarComponent,
    TitleInfoComponent,
    PatientCardComponent,
    SgphStatusComponent,
    DoctorPreviewComponent,
    DpiInfoComponent,
    PatientInfoComponent,
    PatientHistoryComponent,
    PriorityStatusComponent,
    PatientsComponent,
    DpiHistoryComponent,
    RadiologyPopupComponent,
    GraphPopupComponent,
    MedicalPopupComponent,
    AdminComponent,
    AdminStatusComponent,
    AdminPatientsComponent,
    AdminWorkersComponent,
    AdminWorkerCardComponent,
    AdminStatsItemComponent,
    LineChartComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


