import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {ApiService} from "../../services/api.service";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.scss']
})
export class AdminProductListComponent implements OnInit {

  public products: Product[] = [];
  productsSubscription;
  productObserver = {
    next: (products) => {
      this.products = products;
    }
  }

  constructor(private apiService: ApiService,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.productObservable.subscribe(this.productObserver);
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  getProductName(product: Product){
    return this.productService.searchByID(product.id).name;
  }

  openImage(url: string) {
    window.open(url, "_blank");
  }

  editProduct(product: Product) {
    this.router.navigate(['admin/', {id: product.id}])
  }
}
