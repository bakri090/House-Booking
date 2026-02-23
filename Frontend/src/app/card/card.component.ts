import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent {
Proprety: {name: string, price: number, type: string} = {
name: "Birla house",
price: 150000,
type: "Apartment"
}
}
