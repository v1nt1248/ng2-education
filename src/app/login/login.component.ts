import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: {
    login: string;
    password: string;
  };

  constructor() { }

  ngOnInit() {
    this.user = {
      login: "",
      password: ""
    };
  }

  onSubmit() {
    console.log(this.user);
  }


}
