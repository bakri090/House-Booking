import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProperty } from '../../model/iproperty';
import { HousingServiceService } from '../../services/housingService.service';
import { IPropertyBase } from '../../model/ipropertyBase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: false,
})
export class ListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingServiceService,
    private cdr: ChangeDetectorRef,
  ) {}
  SellRent = 1;
  Propreties: IPropertyBase[];
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
  this.housingService.getProperties(this.SellRent).subscribe({
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


}
