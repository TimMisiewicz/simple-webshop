import { NgModule } from '@angular/core';
import {LoginComponent} from "../login/login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UserAuthGuard} from "../guards/user-auth-guard";
import {AdminComponent} from "../admin/admin.component";
import {AdminAuthGuard} from "../guards/admin-auth.guard";
import {AdminEditProductComponent} from "../admin/admin-edit-product/admin-edit-product.component";

const ROUTES: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [UserAuthGuard] },
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/:id', component: AdminEditProductComponent, canActivate: [AdminAuthGuard]},
  {path: "**", redirectTo: 'login'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)
  ]
})
export class RoutingModule { }
