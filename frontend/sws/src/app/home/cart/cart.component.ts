import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {OrderLine} from "../../models/order-line.model";
import {ApiService} from "../../services/api.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  cartObserver = {
    next: (cart) => {
      this.cart = cart;
    }
  }
  cartSubscription;
  public cart: OrderLine[] = [];
  message: String;
  isError: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private apiClient: ApiService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartObservable.subscribe(this.cartObserver)
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  getTotalCartPrice(): number {
    let cost: number = 0;

    for (let orderLine of this.cart){
      cost = cost +
        this.productService.searchByID(orderLine.product).priceInCents *  orderLine.amount;
    }

    return cost / 100;
  }

  emptyCart(){
    this.cartService.emptyCart();
  }

  submitCart() {
    if (!this.apiClient.isLoggedIn()){
      this.router.navigate(["/login"]);
      return;
    }
    this.apiClient.submitOrder(this.cart).then(() => {
      this.message = "Your order was successfully created!";
      this.isError = false;
      this.cartService.emptyCart();
      this.orderService.refresh();
    }).catch(() => {
      this.message = "Your order could not be created!";
      this.isError = true;
    })
  }

  messageIsEmpty(){
    return this.message == null;
  }

  closeAlert() {
    this.message = null;
  }
}
