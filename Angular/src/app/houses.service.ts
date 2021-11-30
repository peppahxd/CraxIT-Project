import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HousesComponent } from './houses/houses.component';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  houseComp!: HousesComponent;

  constructor(private http: HttpClient) { }

  Init(house: HousesComponent): void {
    this.houseComp = house;
  }

  RetrieveHouses() {
    if (!this.authorize())
      return;

    return this.http.get(environment.apiRoute + "/houses?privKey=" + localStorage.getItem("privKey")!, { observe: 'response' });
  }

  EditHouse(_id: number): void {

    if (!this.authorize())
      return;

    var input = prompt("Enter a new name for the current house", ' ');
    if (input?.length == 0)
      return;

    var house: IHouse = {
      id: _id,
      privKey: localStorage.getItem("privKey")!,
      name: input!
    }

    this.http.put(environment.apiRoute + "/editHouse", house).subscribe(x => {
      this.houseComp.ngOnInit();
    })
  }

  CreateHouse(): void {

    if (!this.authorize())
      return;

    var input = prompt("Enter a new name for a house", ' ');
    if (input?.length == 0)
      return;

    var house: IHouse = {
      id: 0,
      privKey: localStorage.getItem("privKey")!,
      name: input!
    }

    this.http.post(environment.apiRoute + "/createHouse", house).subscribe(x => {
      this.houseComp.ngOnInit();
    })
  }

  private authorize(): boolean {
    var id = localStorage.getItem("privKey");
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

