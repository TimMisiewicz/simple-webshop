import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Product[];

  constructor(private apiService: ApiService) {
    this.apiService.getAllProducts().subscribe(data => {
      this.products = data;
    })
  }

  getAllProductsFromApi(){
    this.apiService.getAllProducts().subscribe(data => {
      return data;
    })
  }

  searchByID(id:string): Product{
    let result = this.products.find(product => {
      return product.id == id
    })

    return result;
  }
}
