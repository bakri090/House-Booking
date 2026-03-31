import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: false,
})
export class SortPipe implements PipeTransform {

  // في ملف sort-pipe.ts
transform(value: Array<any>, args: any[]): any {
    // 1. تحقق من وجود المصفوفة قبل البدء
    if (!value || value === undefined || value.length === 0) {
      return value;
    }

    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    // 2. استخدم slice() لإنشاء نسخة من المصفوفة قبل الفرز
    // هذا يمنع خطأ الـ ExpressionChanged ويحمي البيانات الأصلية
    return value.slice().sort((a: any, b: any) => {
      if (a[sortField] < b[sortField]) {
        return -1 * multiplier;
      } else if (a[sortField] > b[sortField]) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });
}

}
