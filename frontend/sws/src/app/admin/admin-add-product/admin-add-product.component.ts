import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {

  constructor(private apiService: ApiService,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct (name: string, price: number, image: string){
    if (name.length < 1 || price < 1 || image.length < 1){
      alert("Please fill in the form correctly!");
      return;
    }
    let product = new Product();

    product.name = name;
    product.image = image;
    product.priceInCents = price;

    this.apiService.addNewProduct(product).then(() => {
      alert("Product successfully added!");
      this.productService.getAllProductsFromApi();
    }).catch(() => {
      alert("An error has occurred while adding the product!");
      this.productService.getAllProductsFromApi();
    })
  }

}
