import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DoctorHomeComponent } from './pages/doctor/pages/doctor-home/doctor-home.component';
import { DoctorPreviewComponent } from './pages/doctor/pages/doctor-preview/doctor-preview.component';
import { AdminComponent } from './pages/admin/pages/admin-home/admin.component';
import { DpiComponent } from './pages/dpi/dpi.component';
import { RadiologistComponent } from './pages/radiologist/radiologist.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "doctor/:id", component: DoctorHomeComponent},
  {path: "doctor/:id/dpi/:id", component: DoctorPreviewComponent},
  {path: "admin", component: AdminComponent},
  {path: "dpi", component: DpiComponent},
  {path: "radiologist", component: RadiologistComponent},
  {path: '**',  redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
