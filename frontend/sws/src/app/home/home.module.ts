import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import {ApiService} from "../services/api.service";
import { HomeComponent } from './home.component';
import { OrderLineComponent } from './cart/order-line/order-line.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    HomeComponent,
    OrderLineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartComponent,
    ProductListComponent,
    ProductItemComponent,
    HomeComponent
  ],
  providers:[
    ApiService
  ]
})
export class HomeModule { }
