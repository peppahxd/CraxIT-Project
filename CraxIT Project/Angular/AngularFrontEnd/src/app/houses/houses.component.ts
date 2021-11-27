import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'houses-root',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  constructor(private cookie: CookieService, private service: SharedService, public _router: Router) { }

  houses!: IHouse[];


  ngOnInit(): void {
    if (!this.validate())
      return;

    this.service.RetrieveHouses().subscribe(data => {
      this.houses = data;
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
      id:0,
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
  name: string;

}
