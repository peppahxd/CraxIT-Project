import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HousesComponent } from './houses/houses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'CraxIT';
  loggedIn!: boolean;

  constructor(private router: Router, private cookie: CookieService) { }

  @ViewChild(LoginComponent) loginComp!: LoginComponent;
  @ViewChild(RegisterComponent) registerComp!: RegisterComponent;

  ngOnInit(): void {
    var cookie = this.cookie.get("id");

    if (cookie == null || cookie == "") {
      this.loggedIn = false;
    }
    else
      this.loggedIn = true;
  }

  ngAfterViewInit(): void {
  }

  Navigate(route: string) {
    switch (route) {
      case "login": {
        this.loginComp.ngOnInit();
        break;
      }

      case "register": {
        this.registerComp.ngOnInit();
        break;
      }

      case "": {
        this.ngOnInit();
        break;
      }
    }

    this.router.navigate(["/" + route]);
  }

  Logout() {
    this.cookie.delete("id");
    this.loggedIn = false;

    this.ngOnInit();
  }


}
