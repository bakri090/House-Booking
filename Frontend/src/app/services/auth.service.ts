import { Injectable } from '@angular/core';
import { IuserForLogin, IuserForRegister } from '../model/iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http:HttpClient) {}

  isAuthenticated(user: IuserForLogin) :Observable<IuserForLogin>{
    return this.http.post<IuserForLogin>('http://localhost:5066/api/account/login', user);
  }
  RegisterForm(user: IuserForRegister) {
    return this.http.post('http://localhost:5066/api/account/register', user);
  }
}
