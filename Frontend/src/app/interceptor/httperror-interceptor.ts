import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay, of, retry, throwError } from 'rxjs';
import { Errorcode } from '../enums/enums';

export const httperrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);
  return next(req)
  .pipe(
    retryRequest(2)
    ,
    catchError((error: HttpErrorResponse) => {
      let erMes = setError(error);
      console.log(error);
      toast.error(erMes);
      return throwError(() => erMes);
    })
  );
};
function retryRequest(count: number) {
  return retry<HttpEvent<any>>({
    count: count, // number of retry attempts
    delay: (error: HttpErrorResponse) => {
      switch(error.status){
        // Only retry for network errors (status === 0)
        // status 0 : wepAPI is down
        case Errorcode.internalError:
        return of(error).pipe(delay(500)); // retry after half second

        // case Errorcode.unotherized:
        // return of(error).pipe(delay(500)); // retry after half second
      }
      return throwError(() => error);
    }
  });
}
function setError (error:HttpErrorResponse ): string {
  let erMes = "Unknwon erro occured";
  if( error.error instanceof ErrorEvent){
    erMes = error.error.message
  }else {
    if(error.status !== 0){
      erMes = error.error.errorMessage;
    }
  }
  return erMes;
}

