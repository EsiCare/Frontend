import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginComponent } from 'src/login/login.component';
import { MInputComponent } from '../comps/minput/minput.component';
import { DoctorHomeComponent } from './doctor/pages/doctor-home/doctor-home.component';
import { NavBarComponent } from './comps/nav-bar/nav-bar.component';
import { PatientInfoComponent } from './doctor/pages/patient-info/patient-info.component';
import { TitleInfoComponent } from './doctor/comps/title-info/title-info.component';
import { PatientHistoryComponent } from './doctor/pages/patient-history/patient-history.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientsComponent } from './doctor/pages/patients/patients.component';
import { PatientCardComponent } from './doctor/comps/patient-card/patient-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MInputComponent,
    DoctorHomeComponent,
    NavBarComponent,
    PatientInfoComponent,
    TitleInfoComponent,
    PatientHistoryComponent,
    PatientsComponent,
    PatientCardComponent,
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


