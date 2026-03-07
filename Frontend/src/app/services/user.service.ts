import { Injectable } from '@angular/core';
import { Iuser } from '../model/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  addUser(user:Iuser){
    let users =[];
    if(localStorage.getItem('Users')){
      users =JSON.parse(localStorage.getItem('Users'));
      users = [...users,user];
    }else{
      users = [user];
    }
    localStorage.setItem('Users',JSON.stringify(users));
  }
}
