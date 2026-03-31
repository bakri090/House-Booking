import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProperty } from '../../model/iproperty';
import { IPropertyBase } from '../../model/ipropertyBase';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: false,
})
export class ListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private cdr: ChangeDetectorRef,
  ) {}
  SellRent = 1;
  Propreties: IPropertyBase[];
  City = '';
  SearchCity = '';
  SortByParm ='City';
  SortByDirection ='asc';
  Today = new Date()
  ngOnInit() {
  this.route.url.subscribe(url => {
  const currentPath = url[0]?.path;

  if (currentPath === 'rent') {
    this.SellRent = 2;
  } else {
    this.SellRent = 1;
  }

  this.loadProperties();
});
}

loadProperties() {
  this.housingService.getAllProperties(this.SellRent).subscribe({
    next: (data) => {
      this.Propreties = data;

      if (typeof window !== 'undefined') {
        const newProprety = JSON.parse(localStorage.getItem('AddProp'));
        if(newProprety)
        if (newProprety.SellRent == this.SellRent) {
          this.Propreties = [newProprety, ...this.Propreties];
          console.log('s');
        }
        this.cdr.detectChanges();
      }
    }
  });
}

onCityFilter(){
  this.SearchCity =this.City ;
}
onClear(){
  this.SearchCity = this.City = '';
}
onSortDirection(){
  if(this.SortByDirection == 'desc')
    this.SortByDirection = 'asc'
  else
    this.SortByDirection = 'desc'

  console.log(this.SortByDirection);
}
}
