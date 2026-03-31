import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './properties/list/list.component';
import { AddComponent } from './properties/add/add.component';
import { DetailComponent } from './properties/detail/detail.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DetailResolver } from './properties/detail/detail-resolver';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'rent', component: ListComponent },
  {path: 'add',component:AddComponent },
  {path:'detail/:id',component:DetailComponent, resolve:{prp:DetailResolver}},
  {path:'user/login',component:LoginComponent},
  {path:'user/register',component:RegisterComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
