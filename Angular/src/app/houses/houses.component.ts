import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HousesService, IHouse } from '../houses.service';

@Component({
  selector: 'houses-root',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css'],
})

export class HousesComponent implements OnInit {

  constructor(private housesService: HousesService, public router: Router, public app: AppComponent) {}

  houses!: IHouse[];

  ngOnInit(): void {
    if (localStorage.getItem("privKey") != "")
      this.app.loggedIn = true;
    else
      return;

    this.housesService.Init(this);
    this.retrieveHouses();
  }


  retrieveHouses(): void {
    this.housesService.RetrieveHouses()!.subscribe(res => {
      this.houses = res.body as IHouse[];
    })
  }

  editHouse(id: number) : void {
    this.housesService.EditHouse(id);
  }

  createHouse() : void {
    this.housesService.CreateHouse();
  }
}

