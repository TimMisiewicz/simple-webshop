import {Component, Input, OnInit} from '@angular/core';
import {OrderLine} from "../../../models/order-line.model";
import {ProductService} from "../../../services/product.service";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-order-line',
  templateUrl: './order-line.component.html',
  styleUrls: ['./order-line.component.scss']
})
export class OrderLineComponent implements OnInit {

  @Input('line') orderLine: OrderLine;
  public productName: string;

  constructor(private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.productName = this.productService.searchByID(this.orderLine.productId).name;
  }

  increment(){
    this.cartService.incrementAmountByID(this.orderLine.productId);
  }

  decrement(){
    this.cartService.decrementAmountByID(this.orderLine.productId);
  }

}
