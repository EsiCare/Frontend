
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

import { LoginComponent } from "./pages/login/login.component";
import { MInputComponent } from "./comps/minput/minput.component";
import { DoctorHomeComponent } from "./pages/doctor/pages/doctor-home/doctor-home.component";
import { NavBarComponent } from "./comps/nav-bar/nav-bar.component";
import { TitleInfoComponent } from "./pages/doctor/comps/title-info/title-info.component";
import { PatientCardComponent } from "./pages/doctor/comps/patient-card/patient-card.component";
import { SgphStatusComponent } from "./pages/doctor/comps/sgph-status/sgph-status.component";
import { DoctorPreviewComponent } from "./pages/doctor/pages/doctor-preview/doctor-preview.component";
import { DpiInfoComponent } from "./pages/doctor/pages/doctor-preview/comps/patient-info/dpi-info.component";
import { PriorityStatusComponent } from "./pages/doctor/comps/priority-status/priority-status.component";
import { PatientsComponent } from "./pages/doctor/pages/doctor-home/comps/patients/patients.component";
import { DpiHistoryComponent } from "./pages/doctor/pages/doctor-preview/comps/dpi-history/dpi-history.component";
import { RadiologyPopupComponent } from "./pages/popups/radiology-popup/radiology-popup.component";
import { MedicalPopupComponent } from "./pages/popups/medical-popup/medical-popup.component";
import { GraphPopupComponent } from "./pages/popups/graph-popup/graph-popup.component";
import { AdminComponent } from "./pages/admin/pages/admin-home/admin.component";
import { AdminStatusComponent } from "./pages/admin/comps/admin-status/admin-status.component";
import { AdminPatientsComponent } from "./pages/admin/comps/admin-patients/admin-patients.component";
import { AdminWorkersComponent } from "./pages/admin/comps/admin-workers/admin-workers.component";
import { AdminWorkerCardComponent } from "./pages/admin/comps/admin-worker-card/admin-worker-card.component";
import { AdminStatsItemComponent } from "./pages/admin/comps/admin-stats-item/admin-stats-item.component";
import { LineChartComponent } from "./pages/admin/comps/admin-status/graph/line-chart.component";
import { AdminCreateHospitalComponent } from "./pages/popups/admin-create-hospital/admin-create-hospital.component";
import { TitleInputComponent } from "./comps/title-input/title-input.component";
import { CustomButtonComponent } from "./comps/custom-button/custom-button.component";
import { AdminCreateWorkerComponent } from "./pages/popups/admin-create-worker/admin-create-worker.component";
import { DeleteWorkerComponent } from "./pages/popups/delete-worker/delete-worker.component";
import { FrameComponent } from "./comps/frame/frame.component";
import { MInputFieldComponent } from "./comps/minputfield/minput-field.component";
import { DoctorCreateDpiComponent } from "./pages/popups/doctor-create-dpi/admin-create-dpi.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DoctorDpiComponent } from './pages/dpi/dpi.component';
import { TestHistoryComponent } from "./pages/dpi/comps/test-history/test-history.component";
import { TestHistoryItemComponent } from "./pages/dpi/comps/test-history-item/test-history-item.component";
import { DoctorCreatePerscriptionComponent } from "./pages/popups/doctor-create-prescription/doctor-create-prescription.component";
import { RadiologistComponent } from './pages/radiologist/radiologist.component';
import { RadioTestHistoryComponent } from "./pages/radiologist/comps/radio-test-history/radio-test-history.component";
import { RadioTestHistoryItemComponent } from "./pages/radiologist/comps/radio-test-history-item/radio-test-history-item.component";
import { HttpClientModule } from "@angular/common/http";
import { LoadingIndicatorComponent } from './comps/loading-indicator/loading-indicator.component';
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from './comps/dropdown/dropdown.component';
import { UserSettingComponent } from './pages/popups/user-setting/user-setting.component';
import { RouteProtectDirective } from './directives/route-protect.directive';
import { PatientHomeComponent } from "./pages/patient/pages/patient-home/patient-home.component";
import { NurseHomeComponent } from "./pages/nurse/nurse.component";
import { BoilogistHomeComponent } from "./pages/biologist/biologist.component";
import { PatientsComponent2 } from "./pages/patient/pages/patient-home/comps/patients/patients.component";
import { PatientHistoryComponent } from "./pages/patient/pages/patient-home/comps/patient-history/patient-history.component";
import { DoctorPatientHistoryComponent } from "./pages/doctor/pages/doctor-home/comps/doctor-patient-history/doctor-patient-history.component";
import { NurseTestHistoryComponent } from "./pages/nurse/comps/nurse-test-history/nurse-test-history.component";
import { NurseTestHistoryItemComponent } from "./pages/nurse/comps/nurse-test-history-item/nurse-test-history-item.component";
import { BoiTestHistoryItemComponent } from "./pages/biologist/comps/boi-test-history-item/boi-test-history-item.component";
import { BoiTestHistoryComponent } from "./pages/biologist/comps/boi-test-history/boi-test-history.component";
import { ReceptionistComponent } from './pages/receptionist/receptionist.component';
import { ReceptionistHistoryComponent } from "./pages/receptionist/receptionist-history/receptionist-history.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ReceptionistHistoryItemComponent } from "./pages/receptionist/receptionist-history-item/receptionist-history-item.component";
import { QrcodeComponent } from './popups/qrcode/qrcode.component';
import { PreviewPresComponent } from './popups/preview-pres/preview-pres.component';
import { PatientInfoComponent } from "./pages/doctor/pages/doctor-home/comps/patient-info/patient-info.component";
import { CurPatientInfoComponent } from "./pages/patient/comps/cur-patient-info/cur-patient-info.component";



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
    AdminCreateHospitalComponent,
    TitleInputComponent,
    CustomButtonComponent,
    AdminCreateWorkerComponent,
    DeleteWorkerComponent,
    FrameComponent,
    MInputFieldComponent,
    DoctorCreateDpiComponent,
    DoctorDpiComponent,
    TestHistoryComponent,
    TestHistoryItemComponent,
    DoctorCreatePerscriptionComponent,
    RadiologistComponent,
    RadioTestHistoryComponent,
    RadioTestHistoryItemComponent,
    LoadingIndicatorComponent,
    DropdownComponent,
    UserSettingComponent,
    BoilogistHomeComponent,
    RouteProtectDirective,
    PatientHomeComponent,
    NurseHomeComponent,
    PatientsComponent2,
    DoctorPatientHistoryComponent,
    NurseTestHistoryComponent,
    NurseTestHistoryItemComponent,
    BoiTestHistoryComponent,
    BoiTestHistoryItemComponent,
    ReceptionistComponent,
    ReceptionistHistoryComponent,
    ReceptionistHistoryComponent,
    ReceptionistHistoryItemComponent,
    QrcodeComponent,
    PreviewPresComponent,
    CurPatientInfoComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}


