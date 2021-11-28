import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'houses-root',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
})
export class HousesComponent implements OnInit, AfterViewInit {

  constructor(private cookie: CookieService, private service: SharedService, public _router: Router, public app: AppComponent) {

  }

  houses!: IHouse[];

  @ViewChild("houseTable") houseTable!: ElementRef;
  @ViewChild("header") header!: ElementRef;

  ngOnInit(): void {
    if (!this.cookie.check("id")) {
      return;
    }


    this.retrieveHouses();
  }

  ngAfterViewInit(): void {}

  reloadComponent() {
    this.ngOnInit();
    this._router.navigate(["/"]);
  }
  
  retrieveHouses() : void {

    this.service.RetrieveHouses(this.cookie.get("id")).subscribe(res => {

      console.dir(res);

      this.houses = res.body as IHouse[];
    })
  }

  editHouse(id: number) {
    if (!this.validate())
      return;

    var input = prompt("Enter a new name for the current house", ' ');
    if (input?.length == 0)
      return;

    var house: IHouse = {
      id: id,
      privKey: this.cookie.get("id"),
      name: input!
    }

    this.service.EditHouse(house).subscribe(data => {
      this.ngOnInit();
    })
  }

  createHouse() {
    if (!this.validate())
      return;

    var input = prompt("Enter a new name for a house", ' ');
    if (input?.length == 0)
      return;

    var house: IHouse = {
      id: 0,
      privKey: this.cookie.get("id"),
      name: input!
    }




    this.service.CreateHouse(house).subscribe(data => {
      this.ngOnInit();
    })
  }

  validate(): boolean {
    var id = this.cookie.get("id");
    if (id == null)
      return false;

    return true;
  }
}


export interface IHouse {
  id: number;
  privKey: string;
  name: string;
}
