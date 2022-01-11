import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import {ApiService} from "../services/api.service";
import { HomeComponent } from './home.component';
import { OrderLineComponent } from './cart/order-line/order-line.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import {UserOrderLineComponent} from "./user-orders/user-order-line/user-order-line.component";




@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    HomeComponent,
    OrderLineComponent,
    UserOrdersComponent,
    UserOrderLineComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartComponent,
    ProductListComponent,
    ProductItemComponent,
    HomeComponent,
    UserOrderLineComponent
  ],
  providers:[
    ApiService
  ]
})
export class HomeModule { }
