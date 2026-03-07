import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor() {}
  isAuthenticated(user: any) {
    let userArr =[];
    if( localStorage.getItem('Users')){
      userArr = JSON.parse(localStorage.getItem('Users'));
    }
    return userArr.find(u => u.userName == user.userName && u.password == user.password);
  }
}
