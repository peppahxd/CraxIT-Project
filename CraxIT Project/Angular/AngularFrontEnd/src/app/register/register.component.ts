import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  constructor(public _router: Router, private service: SharedService) { }

    ngAfterViewInit(): void {}

  ngOnInit(): void {}


  firstName = '';
  lastName = '';
  email = '';
  password = '';
  repeatPassword = '';

  processForm() {


    var arr = [this.firstName, this.lastName, this.email, this.password, this.repeatPassword];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toString().length == 0) {
        alert("Empty input");
        return;
      }
    }

    if (this.password != this.repeatPassword) {
      alert("passwords did not match");
      return;
    }

    this.service.Register(new RegisterModel(this.firstName, this.lastName, this.email, this.password)).subscribe();
  }
}



class RegisterModel {
  firstName : string;
  lastName : string;
  email: string;
  password: string;


  constructor(firstname: string, lastname: string, email: string, password: string) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.password = password;
  }

}
