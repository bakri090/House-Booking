import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common'
import { Inject, PLATFORM_ID } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone:false
})
export class NavbarComponent {
  LoggedUser: string | null = null;
constructor(private toast:ToastrService,@Inject(PLATFORM_ID) private platformId: Object) {}
LoggedIn(){
if(isPlatformBrowser(this.platformId)){
  this.LoggedUser = localStorage.getItem('userName');
return this.LoggedUser;
}
return null;
}
onLogout(){
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  this.toast.success('Logout successful','Logout');
}
}
