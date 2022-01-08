import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  message: String;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onLogin(username: string, password: string) {
    if (username.length < 1 || password.length < 1){
      alert("Please enter a username and password!");
      return;
    }

    let loginStatus = this.api.login({username,password})

    loginStatus.then((token) => {
      //TODO redirect
      console.log("YEEES");
    }).catch(reason => {
      alert("Username and/or password are incorrect!");
    })
  }
}
