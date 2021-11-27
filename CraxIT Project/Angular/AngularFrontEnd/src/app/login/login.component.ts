import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';
import { HousesComponent } from '../houses/houses.component';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _router: Router, private service: SharedService, private cookie: CookieService) { }

  

  ngOnInit(): void {}



  userName = '';
  password = '';
  processForm() {

    if (this.userName.length < 1 || this.password.length < 1)
      return;

    this.service.Login(new LoginModel(this.userName, this.password)).subscribe(data => {

      this.cookie.set("id", data.toString(), 1);
      this._router.navigate(["/"]);
    })

  }

}

class LoginModel {
  UserName : string;
  Password: string;

  constructor(username : string, password : string) {
    this.UserName = username;
    this.Password = password;
  }
}
