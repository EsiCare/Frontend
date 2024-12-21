import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { DoctorHomeComponent } from './doctor/pages/doctor-home/doctor-home.component';
import { DoctorPreviewComponent } from './doctor/pages/doctor-preview/doctor-preview.component';


const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "doctor/:id", component: DoctorHomeComponent},
  {path: "doctor/:id/dpi/:id", component: DoctorPreviewComponent},
  {path: '*', pathMatch: 'full', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
