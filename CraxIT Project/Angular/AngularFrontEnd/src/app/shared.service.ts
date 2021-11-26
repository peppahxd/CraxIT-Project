import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly url = "https://localhost:44366/api";

  constructor(private http: HttpClient) { }


  Register(data: any) {
    return this.http.post(this.url + "/register", data);
  }

  Login(data: any) {
    return this.http.post(this.url + "/login", data);
  }

}

