import { HousingService } from './../../services/housing.service';
import { Injectable } from '@angular/core';
import { Resolver } from 'dns';
import { Property } from '../../model/property';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailResolver  implements Resolve<Property>{
  constructor(private house:HousingService, private router :Router) {  }
  resolve(route :ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> | Property {
    let propId = +route.params['id'];
    return this.house.getProperty(propId).pipe(
      catchError(er => {
        this.router.navigate(['/']);
        return of(null)
      })
    );
  }
}
