import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';
import { HousesComponent } from '../houses/houses.component';
import { AppComponent } from '../app.component';
import { IPersonDto } from '../register/register.component';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _router: Router, private service: SharedService, private cookie: CookieService, private app: AppComponent) { }

  

  ngOnInit(): void {}



  userName = '';
  password = '';
  processForm() {

    if (this.userName.length < 1 || this.password.length < 1)
      return;

    var personDto: IPersonDto = {
      FirstName: '',
      LastName: '',
      Email: '',
      UserName: this.userName,
      Password: this.password
    }

    this.service.Login(personDto).subscribe(data => {

      this.cookie.set("id", data.toString(), 1);
      this.app.ngOnInit();
      this._router.navigate(["/"]);
      
    })

  }

}

