import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input('productInput') product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(product: Product){
    this.cartService.addProduct(product);
  }

}
