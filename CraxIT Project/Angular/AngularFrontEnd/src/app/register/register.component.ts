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


  userName = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  repeatPassword = '';

  processForm() {


    var arr = [this.userName, this.firstName, this.lastName, this.email, this.password, this.repeatPassword];

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

    var model = new RegisterModel(this.userName, this.firstName, this.lastName, this.email, this.password);

    console.dir(model);
    this.service.Register(model).subscribe(data => {
      console.dir(data);
    })
  }
}


class RegisterModel {
  FirstName : string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;


  constructor(firstname: string, lastname: string, username: string, email: string, password: string) {
    this.UserName = username;
    this.FirstName = firstname;
    this.LastName = lastname;
    this.Email = email;
    this.Password = password;
  }

}
