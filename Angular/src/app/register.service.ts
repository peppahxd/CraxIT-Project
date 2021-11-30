import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { IPersonDto } from "./DTO/IPersonDto";
import { HousesComponent } from "./houses/houses.component";

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private http: HttpClient, private app: AppComponent, private router: Router) { }

  data!: IPersonDto;
  repeatPassword!: string;
  houseComp!: HousesComponent;

  Init(houseComp: HousesComponent, data: IPersonDto, repeatPassword: string) : void {
    this.houseComp = houseComp;
    this.data = data;
    this.repeatPassword = repeatPassword;
  }

  Validate(): string {
    var arr = [this.data.UserName, this.data.FirstName, this.data.LastName, this.data.Email, this.data.Password, this.repeatPassword];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toString().length == 0) {
        return "Not all inputs were filled in.";
      }
    }

    if (this.data.Email.indexOf('@') <= 0 || this.data.Email.indexOf('.') <= 0) {
      return "A valid email is required";
    }

    if (this.data.Password != this.repeatPassword) {
      return "Passwords did not match";
    }

    if (this.data.Password.length <= 6) {
      return "Password must be longer than 6 characters";
    }

    if (!this.hasNumber(this.data.Password)) {
      return "Password does not have a number";
    }

    var uppercase = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
    if (!uppercase.test(this.data.Password)) {
      return "Password does not have an uppercase";
    }


    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!format.test(this.data.Password)) {
      return "Password does not have a special character";
    }

    return "";
  }

  Register(): void {

    this.http.post(environment.apiRoute + "/register", this.data).subscribe(x => {

      localStorage.setItem("privKey", x.toString());
      this.houseComp.ngOnInit();
      this.router.navigate(["/"]);
    })
  }

  private hasNumber(val: string) {
    return /\d/.test(val);
  }

}
