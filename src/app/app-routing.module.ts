import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from 'src/login/login.component';
import { AppComponent } from './app.component';

// TODO: To add more routing functionality follow this tutorial: https://angular.io/tutorial/toh-pt5

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "user", component: AppComponent},
  {path: '*', pathMatch: 'full', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
