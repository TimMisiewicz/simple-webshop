import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './login/signin/signin.component';
import { SignupComponent } from './login/signup/signup.component';
import {ApiService} from "../services/api.service";



@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    SigninComponent,
    SignupComponent
  ],
  providers:[
    ApiService
  ]
})
export class LoginModule { }
