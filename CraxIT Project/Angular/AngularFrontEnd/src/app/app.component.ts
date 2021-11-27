import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HousesComponent } from './houses/houses.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CraxIT';
  loggedIn!: boolean;

  constructor(private router: Router, private cookie: CookieService) { }


  ngOnInit(): void {
    var cookie = this.cookie.get("id");

    if (cookie == null || cookie == "") {
      this.loggedIn = false;
    }
    else
      this.loggedIn = true;
  }

  Logout() {
    this.cookie.delete("id");
    this.loggedIn = false;

    this.ngOnInit();
  }


}
