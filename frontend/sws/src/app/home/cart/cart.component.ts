import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {OrderLine} from "../../models/order-line.model";
import {ApiService} from "../../services/api.service";

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

  constructor(private productService: ProductService,
              private cartService: CartService,
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
        this.productService.searchByID(orderLine.productId).priceInCents *  orderLine.amount;
    }

    return cost / 100;
  }

  emptyCart(){
    if (!confirm("Are you sure you want to empty your cart?")){
      return;
    }
    this.cartService.emptyCart();
  }

  submitCart() {
    if (!confirm("Are you sure you want to order this cart?")){
      return;
    }
    this.apiClient.submitOrder(this.cart).then(() => {
      alert("order created")
    }).catch(() => {
      alert("error")
    })
  }
}
