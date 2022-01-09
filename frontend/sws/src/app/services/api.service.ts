import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiToken} from "../models/api-token.model";
import {Product} from "../models/product.model";
import {map} from "rxjs";
import {OrderLine} from "../models/order-line.model";
import {Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase: string = "http://localhost:8080/sws/api/";
  public apiToken: ApiToken;

  constructor(private http: HttpClient) { }

  getRequestHeader() : HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.apiToken.accessToken
    })
  }

  login(userData: {username: string, password: string}): Promise<Boolean>{
    return new Promise<boolean>((res, rej) => {
      this.http
        .post<ApiToken>(this.urlBase + "auth/signin", userData)
        .subscribe({
          error: error => {
            rej(error);
          },
          next: responseData => {
            this.apiToken = responseData;
            res(true);
          }
        })
    });
  }

  signUp(userData: {username: string, password: string}){
    return new Promise<any>((res, rej) => {
      this.http
        .post<string>(this.urlBase + "auth/signup", userData)
        .subscribe({
          error: error => {
            rej(error);
          },
          next: responseData => {
            res(responseData);
          }
        })
    });
  }

  getAllProducts(){
    return this.http.get<Product[]>(this.urlBase + "product/all", {headers: this.getRequestHeader()})
      .pipe(map((response: Product[]) => {
        return response;
      }))
  }

  submitOrder(cart: OrderLine[]): Promise<boolean>{
    return new Promise<boolean>(((resolve, reject) => {
      this.http.post<Order>(this.urlBase + "order", {}, {headers: this.getRequestHeader()})
        .subscribe(
          {next: value => {
            for (let orderLine of cart) {
              orderLine.order = value.id;
            }
            this.http.post(this.urlBase + "order/" + value.id + "/lines",
              cart,
              {headers: this.getRequestHeader()})
              .subscribe({
                next: () => {
                  resolve(true);
                }, error: (err) => {
                  reject(err);
                }
              })
              resolve(true);
            },
          error: (err) => {
            reject(err);
          }}
        )
    }))
  }
}
