import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedService } from './shared.service';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HousesComponent } from './houses/houses.component';


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
  providers: [SharedService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
