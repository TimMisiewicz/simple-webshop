import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Message} from "../../../models/message.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public message: Message;
  isError: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.message = new Message();
  }

  onSignup(username: string, password: string, passwordConfirm: string) {
    if (password != passwordConfirm){
      this.message.message = "The passwords entered are not the same!";
      this.isError = true;
      return;
    }

    if (password.length < 8){
      this.message.message = "Password is too short!";
      this.isError = true;
      return;
    }

    if (username.length < 8){
      this.message.message = "You need to enter a username!";
      this.isError = true;
      return;
    }

    let message = this.api.signUp({username, password});

    message.then((response) => {
      this.message = response;
      this.isError = false;
    }).catch((error) => {
      this.isError = true;
      this.message = error;
    })
  }

  messageIsEmpty(){
    return this.message.message == null;
  }

  closeAlert() {
    this.message.message = null;
  }
}
