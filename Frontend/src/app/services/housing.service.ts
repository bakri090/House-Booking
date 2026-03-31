import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IProperty } from '../model/iproperty';

import { Property } from '../model/property';
import { IPropertyBase } from '../model/ipropertyBase';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map((propertiesArray) => {
        // let prop = propertiesArray.find((p) => p.Id === id);
        // if(!prop)
        // throw new Error("error")
        // return prop
        return propertiesArray.find((p) => p.Id === id);
      }),
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        if (typeof window !== 'undefined') {
          const localProperties = JSON.parse(localStorage.getItem('newProp'));

          if (localProperties) {
            if (SellRent) {
            for (const id in localProperties) {
                if (
                  localProperties.hasOwnProperty(id) &&
                  localProperties[id].SellRent === SellRent
                ) {
                  propertiesArray.push(localProperties[id]);
                }}
              } else {
            for (const id in localProperties)
                propertiesArray.push(localProperties[id]);
            }
          }
        }
        if (SellRent) {
          for (const id in data) {
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          }
        } else {
          for (const id in data) propertiesArray.push(data[id]);
        }
        return propertiesArray;
      }),
    );
  }
  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
