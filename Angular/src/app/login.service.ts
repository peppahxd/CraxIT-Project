import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { IPersonDto } from './DTO/IPersonDto';
import { HousesComponent } from './houses/houses.component';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http: HttpClient, private app: AppComponent, private router: Router) { }

  houseComp!: HousesComponent;

  

  Init(houseComp: HousesComponent) : void {
    this.houseComp = houseComp;
    //we have to initialize housecomp, in order to refresh the component.
  }

  Login(data: IPersonDto): void {

    this.http.post(environment.apiRoute + "/login", data).subscribe(x => {

      localStorage.setItem("privKey", x.toString());
      this.houseComp.ngOnInit();
      this.router.navigate(["/"]);
    });
  }
}

