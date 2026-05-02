import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProperty } from '../model/iproperty';

import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}
getAllCities(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:5066/api/city');
}
  getProperty(id: number) : Observable<Property> {
    return this.http.get<Property>(environment.apiUrl+ 'property/detail/' + id);
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(environment.apiUrl+'property/list/' + SellRent);
  }
  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    const existingProp = localStorage.getItem('newProp');
    if (existingProp) {
      newProp = [property, ...JSON.parse(existingProp)];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    const pidValue = localStorage.getItem('PID');
    if (pidValue) {
      const newPid = String(+pidValue + 1);
      localStorage.setItem('PID', newPid);
      return +newPid;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
  getPropertyAge(dateOfestablish:Date) : string{
    const today = new Date();
    const estDate  = new Date(dateOfestablish);
    console.log(today);
    console.log(estDate);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    if(m < 0 || (m ===0 && today.getDate() < estDate.getDate()))
      age --;

    if(today.getFullYear() < estDate.getFullYear()){

      return '011';
    }

    if(age === 0)
      return 'Less than a year';

    return age.toString();
  }
}
