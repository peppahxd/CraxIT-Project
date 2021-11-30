import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HousesComponent } from './houses/houses.component';
import { RegisterService } from './register.service';
import { LoginService } from './login.service';
import { HousesService } from './houses.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HousesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RegisterService, LoginService, HousesService, CookieService, AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
