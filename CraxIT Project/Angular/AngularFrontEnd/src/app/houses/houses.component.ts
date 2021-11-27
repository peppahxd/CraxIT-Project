import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'houses-root',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {

  constructor(private cookie: CookieService, private service: SharedService) { }

  houses!: IHouse[];

  ngOnInit(): void {
    var id = this.cookie.get("id");
    if (id == null)
      return;

    this.service.RetrieveHouses().subscribe(data => {
      this.houses = data;

    })
  }

  removeHouse(id: number) {

  }
}

export interface IHouse {
  id: number;
  name: string;

}
