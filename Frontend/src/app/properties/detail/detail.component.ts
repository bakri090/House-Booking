import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../model/property';
import { HousingService } from '../../services/housing.service';
// import { TabDirective, TabsetComponent } from "ngx-bootstrap/tabs";
import { switchMap } from 'rxjs';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-property-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  standalone: false
})
export class DetailComponent implements OnInit {
public propertyId: number;
property = new Property();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService,
            private cdf:ChangeDetectorRef) { }
            images = [
    'https://swiperjs.com/demos/images/nature-1.jpg',
    'https://swiperjs.com/demos/images/nature-2.jpg',
    'https://swiperjs.com/demos/images/nature-3.jpg',
  ];
ngOnInit() {
  this.route.data.subscribe(
    (data: Property) => {
      this.property = data['prp'];
      // if prop is null return to main page
      if (!this.property)
    this.router.navigate(['/']);

      console.log(this.property);
    }
  )
  // this.route.params.pipe(
  //   switchMap(params => {
  //     this.propertyId = +params['id'];
  //     return this.housingService.getProperty(this.propertyId);
  //   })
  // ).subscribe({
  //   next: (data: Property) => {
  //     if (data) {
  //       this.property = data;
  //     } else {
  //       // إذا رجعت البيانات فارغة ولكن بدون خطأ HTTP
  //       this.router.navigate(['/']);
  //     }
  //   },
  //   error: (err) => {
  //     console.error('حدث خطأ أثناء جلب البيانات:', err);
  //     this.router.navigate(['/']); // هذا سيعيدك للرئيسية عند فشل الطلب
  //   }
  // });
}
  er(e:any){
    // console.log(e);
    this.router.navigate(['/']);
}
}
