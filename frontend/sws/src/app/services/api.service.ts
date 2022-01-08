import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiToken} from "../models/api-token.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlBase: string = "http://localhost:8080/sws/api/";
  private apiToken: ApiToken;

  constructor(private http: HttpClient) { }

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
}
