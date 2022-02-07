import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {Order} from "../../models/order.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit, OnDestroy {

  private orderObserver = {
    next: data => {
      this.orders = data;
    }
  }
  private orderSubscription;
  public orders: Order[] = [];

  constructor(private orderService: OrderService,
              private router: Router) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.orderObservable.subscribe(this.orderObserver);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

  refresh(){
    this.orderService.refresh()
  }

  navigateToStore(){
    this.router.navigate(["/home"]);
    return;
  }

}
