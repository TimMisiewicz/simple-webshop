import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private apiService: ApiService,
              private orderService: OrderService) { }

  ngOnInit(): void {
  }

  navigateToLogin(){
    this.router.navigate(["/login"]);
  }

  navigateToOrders(){
    if (this.apiService.isLoggedIn()){
      this.router.navigate(["/orders"]);
      this.orderService.refresh();
      return;
    }
    this.router.navigate(["/login"]);
    return;
  }

  isLoggedIn(): boolean{
    return this.apiService.isLoggedIn();
  }
}
