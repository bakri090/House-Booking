import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '../model/property';

@Pipe({
  name: 'filter',
  standalone: false,
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString:string, propName:string): any[] {
    let propArr : any[] = [];
    if(!value ||value.length == 0 || filterString == '' || propName == '')
      return value;
    // for(const prop of value){
    //   if(prop[propName] == filterString)
    //     propArr.push(prop);
    // }
    propArr = value.filter(p =>
      {
        if(p[propName]){
          return p[propName].toString().toLowerCase()
          .includes(filterString.toLowerCase());
        }
      })
    console.log(propArr);
    if(propArr.length == 0)
      return value;
    return propArr;
  }

}
