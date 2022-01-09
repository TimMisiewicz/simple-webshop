import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Product} from "../../../models/product.model";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public products: Product[];

  constructor(private apiService: ApiService,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe(data => {
      this.products = data;
    })
  }

}
