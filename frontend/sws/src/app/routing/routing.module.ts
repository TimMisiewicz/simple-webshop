import { NgModule } from '@angular/core';
import {LoginComponent} from "../login/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UserAuthGuard} from "../guards/user-auth-guard";

const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [UserAuthGuard] },


  {path: "**", redirectTo: 'login'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ]
})
export class RoutingModule { }
