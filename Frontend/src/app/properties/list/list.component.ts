import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IPropertyBase } from '../../model/ipropertyBase';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { Property } from '../../model/property';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: false,
})
export class ListComponent implements OnInit {
  SellRent = 1;
  Propreties: IPropertyBase[] = []; // تم تعريفها كمصفوفة فارغة لتجنب خطأ undefined
  City = '';
  SearchCity = '';
  SortByParm = 'City';
  SortByDirection = 'asc';
  Today = new Date();

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const currentPath = url[0]?.path;
      this.SellRent = (currentPath === 'rent') ? 2 : 1;
      this.loadProperties();
    });
  }

  loadProperties() {
    this.housingService.getAllProperties(this.SellRent).subscribe({
      next: (data:Property[]) => {
        this.Propreties = data;

        // الفحص لضمان العمل في بيئة المتصفح فقط (بسبب SSR)
        // if (typeof window !== 'undefined') {
        //   // ✅ تصحيح الخطأ المطبعي من get1Item إلى getItem
        //   const storedData = localStorage.getItem('AddProp');

        //   if (storedData) {
        //     const newProperty = JSON.parse(storedData);

        //     if (newProperty && newProperty.SellRent === this.SellRent) {
        //       // إضافة العقار الجديد في بداية المصفوفة
        //       this.Propreties = [newProperty, ...this.Propreties];
        //     }
        //   }
        // }

        // إخبار أنجلر يدوياً بوجود تغيير لتجنب خطأ ExpressionChanged
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('فشل في جلب البيانات، تأكد من تشغيل الـ Backend:', err);
      }
    });
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onClear() {
    this.SearchCity = this.City = '';
  }

  onSortDirection() {
    this.SortByDirection = (this.SortByDirection === 'desc') ? 'asc' : 'desc';
  }
}
