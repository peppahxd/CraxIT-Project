import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from 'src/app/shared.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  constructor(public _router: Router, private service: SharedService, private cookie: CookieService, private app: AppComponent) { }

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

    var personDto: IPersonDto = {
      FirstName : this.firstName,
      LastName : this.lastName,
      UserName : this.userName,
      Email : this.email,
      Password : this.password
    }


    this.service.Register(personDto).subscribe(data => {
      this.cookie.set("id", data.toString(), 1);
      this.app.ngOnInit();
      this._router.navigate(["/"]);
    })
  }
}

export interface IPersonDto {
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
}

