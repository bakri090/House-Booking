import { Component, Input } from '@angular/core';
import { Icard } from './icard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Input() Proprety: Icard;
}
