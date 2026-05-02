import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SellRent',
  standalone: false
})
export class SellRentPipe implements PipeTransform {

  transform(value: number): string {
    return value == 1 ? 'Purchase' : 'Rent';
  }

}
