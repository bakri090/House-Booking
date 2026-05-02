import { Component, Input } from '@angular/core';
import { IProperty } from '../../model/iproperty';
import { IPropertyBase } from '../../model/ipropertyBase';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone:false
})
export class CardComponent {
@Input() Proprety: IPropertyBase;
@Input() hideIcons: boolean;
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  console.log(this.Proprety.readyToMove);
  console.log(this.Proprety);
}
}
