import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import {HomeModule} from "../home/home.module";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AdminComponent,
    AdminProductListComponent,
    AdminAddProductComponent,
    AdminEditProductComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
    FormsModule
  ],
  exports: [
    AdminComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
    AdminProductListComponent
  ]
})
export class AdminModule { }
