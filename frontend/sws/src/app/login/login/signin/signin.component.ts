import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  message: String;

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(username: string, password: string) {
    if (username.length < 1 || password.length < 1){
      alert("Please enter a username and password!");
      return;
    }

    let loginStatus = this.api.login({username,password})

    loginStatus.then((token) => {
      if (this.api.apiToken.roles[0] == 'ADMIN'){
        this.router.navigate(["/admin"])
      } else if (token) {
        this.router.navigate(["/home"])
      }
    }).catch(reason => {
      alert("Username and/or password are incorrect!");
    })
  }
}
