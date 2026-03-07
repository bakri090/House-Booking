import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../../services/auth';
import { ToastrService } from 'ngx-toastr';

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
  const token = this.auth.isAuthenticated(loginForm.value);
  if(token){
    localStorage.setItem('token',token.userName);
    this.toastr.success('Login successful','Login');
    if(this.router)
    this.router.navigate(['/']);
  }else{
    this.toastr.error('Invalid username or password','Login Failed');
  }
}

}
