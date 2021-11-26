import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly url = "https://localhost:7201/api";

  constructor(private http: HttpClient) { }


  Register(val:any){
    return this.http.post(this.url + "/register", val);
  }
}