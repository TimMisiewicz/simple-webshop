import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {Order} from "../models/order.model";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public userOrders: Order[] = [];
  public orderObservable = of(this.userOrders);

  constructor(private apiService: ApiService) {
    this.refresh();
  }

  refresh(){
    this.apiService.getAllUserOrders().subscribe(data => {
      this.userOrders.length = 0;
      for (let order of data) {
        this.userOrders.push(order);
      }
    })
  }
}
