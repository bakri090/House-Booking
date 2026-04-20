import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const sp = inject(NgxSpinnerService);
  sp.show();

  return next(req).pipe(
    delay(100), // سيتم تأخير وصول البيانات للمشترك لمدة نصف ثانية
    finalize(() => {
      sp.hide(); // سيتم التنفيذ بعد انتهاء التأخير وصول البيانات
    })
  );
};
