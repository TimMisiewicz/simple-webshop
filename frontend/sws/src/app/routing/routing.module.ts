import { NgModule } from '@angular/core';
import {LoginComponent} from "../login/login/login.component";
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ]
})
export class RoutingModule { }
