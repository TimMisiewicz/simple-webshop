import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {ApiService} from "./api.service";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public products: Product[] = [];
  public productObservable = of(this.products)


  constructor(private apiService: ApiService) {
    this.apiService.getAllProducts().subscribe(data => {
      this.products.length = 0;
      for (let product of data) {
        this.products.push(product);
      }
    })
  }

  getAllProductsFromApi(){
    this.apiService.getAllProducts().subscribe(data => {

      this.products.length = 0;
      for (let product of data) {
        this.products.push(product);
      }

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
