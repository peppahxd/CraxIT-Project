import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  ngAfterViewInit(): void { this.HideError(); }

  ngOnInit(): void { this.HideError();}


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
        this.AlertError("Not all inputs were filled in.");
        return;
      }
    }

    if (this.email.indexOf('@') <= 0 || this.email.indexOf('.') <= 0) {
      this.AlertError("A valid email is required");
      return;
    }


    if (this.password != this.repeatPassword) {
      this.AlertError("Passwords did not match");
      return;
    }

    if (this.password.length <= 6) {
      this.AlertError("Password must be longer than 6 characters");
      return;
    }

    if (!this.hasNumber(this.password)) {
      this.AlertError("Password does not have a number");
      return;
    }

    var uppercase = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    if (!uppercase.test(this.password)) {
      this.AlertError("Password does not have an uppercase");
      return;
    }


    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(this.password)) {
      this.AlertError("Password does not have a special character");
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

  @ViewChild("errormessage") errormessage!: ElementRef;

  AlertError(msg: string) {
    if (this.errormessage == null)
      return;

    this.errormessage.nativeElement.innerHTML = msg;
    this.errormessage.nativeElement.style.display = "block";
  }

  HideError() {
    if (this.errormessage == null)
      return;

    this.errormessage.nativeElement.style.display = 'none';
    this.errormessage.nativeElement.innerHTML = "";
  }

  hasNumber(val : string) {
    return /\d/.test(val);
  }

}

export interface IPersonDto {
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Password: string;
}

