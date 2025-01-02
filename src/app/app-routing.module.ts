import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DoctorHomeComponent } from './pages/doctor/pages/doctor-home/doctor-home.component';
import { DoctorPreviewComponent } from './pages/doctor/pages/doctor-preview/doctor-preview.component';
import { AdminComponent } from './pages/admin/pages/admin-home/admin.component';
import { DoctorDpiComponent } from './pages/dpi/dpi.component';
import { RadiologistComponent } from './pages/radiologist/radiologist.component';
import { PatientHomeComponent } from './pages/patient/pages/patient-home/patient-home.component';
import { NurseHomeComponent } from './pages/nurse/nurse.component';
import { BoilogistHomeComponent } from './pages/biologist/biologist.component';
import { ReceptionistComponent } from './pages/receptionist/receptionist.component';


const routes: Routes = [
  {path: "", component:  LoginComponent},
  {path: "doctor", component: DoctorHomeComponent},
  {path: "doctor/dpi", component: DoctorDpiComponent},
  {path: "patient", component: PatientHomeComponent},
  {path: "patient/dpi", component: DoctorPreviewComponent},
  
  {path: "admin", component: AdminComponent},
  {path: "administrative", component: ReceptionistComponent},

  {path: "radiologist", component: RadiologistComponent},
  {path: "laborantin", component: BoilogistHomeComponent},
  {path: "nurse", component: NurseHomeComponent},
  
  {path: "nurse", component: RadiologistComponent},
  {path: '**',  redirectTo: "/"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
