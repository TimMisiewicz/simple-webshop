import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Message} from "../../../models/message.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  private message: Message;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onSignup(username: string, password: string, passwordConfirm: string) {
    if (password != passwordConfirm){
      alert("The passwords entered are not the same!");
      return;
    }

    if (password.length < 1){
      alert("You need to enter a password!");
      return;
    }

    if (username.length < 1){
      alert("You need to enter a username!");
      return;
    }

    let message = this.api.signUp({username, password});

    message.then((response) => {
      this.message = response;
      alert(this.message.message)
    }).catch((error) => {
      this.message = error;
      alert(this.message.message)
    })
  }
}
