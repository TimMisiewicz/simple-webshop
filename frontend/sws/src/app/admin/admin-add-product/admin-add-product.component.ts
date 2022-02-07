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

  message: String;
  isError: boolean = false;

  constructor(private apiService: ApiService,
              private productService: ProductService) { }

  ngOnInit(): void {
  }

  addProduct (name: string, price: number, image: string){
    if (name.length < 1 || price < 1 || image.length < 1){
      this.message = "Please fill in the form correctly";
      this.isError = true;
      return;
    }
    let product = new Product();

    product.name = name;
    product.image = image;
    product.priceInCents = price;

    this.apiService.addNewProduct(product).then(() => {
      this.message = "Product successfully added";
      this.isError = false;
      this.productService.getAllProductsFromApi();
    }).catch(() => {
      this.message = "An error occured while adding the new product";
      this.isError = true;
      this.productService.getAllProductsFromApi();
    })
  }
  messageIsEmpty(){
    return this.message == null;
  }

  closeAlert() {
    this.message = null;
  }
}
