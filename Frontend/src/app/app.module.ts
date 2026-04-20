import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './properties/card/card.component';
import { NavbarComponent } from './properties/navbar/navbar.component';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ListComponent } from './properties/list/list.component';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './properties/detail/detail.component';
import { AddComponent } from './properties/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HousingService } from './services/housing.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailResolver } from './properties/detail/detail-resolver';
import { register } from 'swiper/element/bundle';
import { FilterPipe } from './pipes/filter-pipe';
import { SortPipe } from './pipes/sort-pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { spinnerInterceptor } from './interceptor/spinner-interceptor';
import { httperrorInterceptor } from './interceptor/httperror-interceptor';
import { loginInterceptor } from './interceptor/login-interceptor';

register();
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ListComponent,
    NavbarComponent,
    DetailComponent,
    AddComponent,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: true,
      newestOnTop:true
    }),
    BrowserModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgbModule,
    NgxSpinnerModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([spinnerInterceptor,httperrorInterceptor,loginInterceptor])),
    provideAnimations(),
    HousingService,
    DetailResolver
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
