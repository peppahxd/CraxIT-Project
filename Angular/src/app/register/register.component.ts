import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { IPersonDto } from '../DTO/IPersonDto';
import { RegisterService } from '../register.service';

@Component({
  selector: 'register-root',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public _router: Router, private registerService: RegisterService, private app: AppComponent) { }

  ngOnInit(): void {  }

  errorMessage = "";

  userName = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  repeatPassword = '';

  processForm() : void {


    var personDto: IPersonDto = {
      FirstName : this.firstName,
      LastName : this.lastName,
      UserName : this.userName,
      Email : this.email,
      Password : this.password
    }

    this.registerService.Init(this.app.houseComp, personDto, this.repeatPassword);
    this.errorMessage = this.registerService.Validate();

    if (this.errorMessage == "")
      this.registerService.Register();
  }
}



