import { IPropertyBase } from './../model/ipropertyBase';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProperty } from '../model/iproperty';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingServiceService {

constructor(private http:HttpClient) { }
getProperties(SellRent:number):Observable<IProperty[]>{
  return this.http.get("data/properties.json").pipe(
    map(data => {
      const propertiesArray: IProperty[] = [];
      if (typeof window !== 'undefined') {
      const LocalProps = JSON.parse(localStorage.getItem('AddProp'));
      if(LocalProps){
        for (const id in LocalProps) {
        if (LocalProps.hasOwnProperty(id) && LocalProps[id].SellRent == SellRent) {
          propertiesArray.push(LocalProps[id] as IProperty);
        }
      }
      }
    }

      for (const id in data) {
        if (data.hasOwnProperty(id) && data[id].SellRent == SellRent) {
          propertiesArray.push(data[id] as IProperty);
        }
      }
      return propertiesArray;
    })
  );
}
AddProprety(prop:Property){
  let props = [prop];
  if(localStorage.getItem('AddProp')){
    props = [prop,...JSON.parse(localStorage.getItem('AddProp'))];
  }
  localStorage.setItem('AddProp',JSON.stringify(props))
}
getAutoId() :number {
  if(localStorage.getItem('PID')){
    localStorage.setItem('PID', String(+localStorage.getItem('PID') +1));
    return +localStorage.getItem('PID');
  }else{
    localStorage.setItem('PID','101');
    return 101;
  }
}
}
