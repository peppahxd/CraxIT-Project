import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CraxIT';
  loggedIn = false;
 

  constructor(public router: Router) { }

  @ViewChild(LoginComponent) loginComp!: LoginComponent;
  @ViewChild(RegisterComponent) registerComp!: RegisterComponent;
  @ViewChild(HousesComponent) houseComp!: HousesComponent;

  ngOnInit(): void {}


  Logout() {
    localStorage.setItem("privKey", "")!
    this.loggedIn = false;
    this.router.navigate(["/"]);
  }


}
