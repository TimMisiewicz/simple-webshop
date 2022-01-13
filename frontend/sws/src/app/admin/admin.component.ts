import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {ProductService} from "../services/product.service";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  productsSubscription;
  productObserver = {
    next: (products) => {
      this.products = products;
    }
  }

  constructor(private apiService: ApiService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.productObservable.subscribe(this.productObserver);
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  refresh(){
    this.productService.getAllProductsFromApi();
  }

}
