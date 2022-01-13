import { Injectable } from '@angular/core';
import {OrderLine} from "../models/order-line.model";
import {Product} from "../models/product.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: OrderLine[] = [];
  public cartObservable = of(this.cart)

  constructor() { }

  addProduct(product: Product){
    let orderLine: OrderLine = new OrderLine();
    orderLine.product = product.id;
    orderLine.amount = 1;

    if (this.isAlreadyInCart(product)){
      this.incrementAmountByID(product.id)
      return;
    }

    this.cart.push(orderLine);
  }

  isAlreadyInCart(product: Product): boolean {
    for (let orderline of this.cart) {
      if (product.id == orderline.product){
        return true;
      }
    }
    return false;
  }

  incrementAmountByID(id: string) {
    for (let i = 0; i < this.cart.length; i++){
      if (this.cart[i].product === id){
        this.cart[i].amount++;
      }
    }
  }

  decrementAmountByID(id: string){
    for (let i = 0; i < this.cart.length; i++){
      if (this.cart[i].product === id){
        if (this.cart[i].amount === 1){
          return;
        }
        this.cart[i].amount--;
      }
    }
  }

  emptyCart(){
    this.cart.length = 0;
  }
}
