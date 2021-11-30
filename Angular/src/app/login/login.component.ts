import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HousesComponent } from '../houses/houses.component';
import { AppComponent } from '../app.component';
import { IPersonDto } from '../DTO/IPersonDto';
import { LoginService } from '../login.service';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public _router: Router, private loginService: LoginService, private app: AppComponent) {}
  
  ngOnInit(): void {}

  userName = '';
  password = '';

  processForm() : void {

    if (this.userName.length < 1 || this.password.length < 1)
      return;

    var personDto: IPersonDto = {
      FirstName: '',
      LastName: '',
      Email: '',
      UserName: this.userName,
      Password: this.password
    }
    
    this.loginService.Init(this.app.houseComp);
    this.loginService.Login(personDto);
  }
}

