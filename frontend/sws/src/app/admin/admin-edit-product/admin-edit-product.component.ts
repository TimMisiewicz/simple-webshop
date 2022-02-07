import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ProductService} from "../../services/product.service";
import {ApiService} from "../../services/api.service";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.scss']
})
export class AdminEditProductComponent implements OnInit {

  id: string;
  selectedProduct: Product;
  editMode: boolean = false;

  message: String;
  isError: boolean = false;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.id == null){
        this.editMode = false;
        return;
      }

      if (this.id.length > 1) {
        this.editMode = true;
        let searchResult = this.productService.searchByID(this.id);
        let product = new Product();

        product.id = searchResult.id;
        product.image = searchResult.image;
        product.name = searchResult.name;
        product.priceInCents = searchResult.priceInCents;

        this.selectedProduct  = product;
      }

    })
  }

  editProduct() {
    this.apiService.editProduct(this.selectedProduct).then(() => {
      this.message = "Product successfully edited!";
      this.isError = false;
      this.productService.getAllProductsFromApi();
      this.selectedProduct = new Product();
      this.id = '';
      this.editMode = false;
    }).catch(() => {
      this.message = "Product could not be edited!";
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
