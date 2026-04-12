import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IuserForLogin } from '../../model/iuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:false
})
export class LoginComponent {
  constructor(private auth: Auth,private toastr: ToastrService,private router: Router) {

  }
onLogin(loginForm: NgForm){
  console.log(loginForm.value);
  const token = this.auth.isAuthenticated(loginForm.value).subscribe((response: IuserForLogin) => {
    console.log(response);
    if(typeof window  !== 'undefined'){
      localStorage.setItem('token',response.token);
      localStorage.setItem('userName', response.userName);
    }
  },(error) => {
    this.toastr.error(error.error,'Login Failed');
    console.log(error);
  });
}
}
