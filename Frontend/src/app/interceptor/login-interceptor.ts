import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  if(typeof window !== 'undefined'){
    const token = localStorage.getItem('token');
    const router = inject(Router);
    console.log('router');
    console.log(router);
    if(!token){
      router.navigate(['user/login']);
    }

  }
  return next(req);
};
