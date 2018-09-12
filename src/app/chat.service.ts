import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Cookie } from "ng2-cookies/ng2-cookies";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = "https://chatapi.edwisor.com";

  constructor(public http: HttpClient) {} // end constructor

  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) =>{

    localStorage.setItem('userInfo', JSON.stringify(data))


  }

  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("mobileNumber", data.mobileNumber)
      .set("email", data.email)
      .set("password", data.password)
      .set("apiKey", data.apiKey);
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  } // end of signupFunction function.

  public signinFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password);
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of signinFunction function.


}
