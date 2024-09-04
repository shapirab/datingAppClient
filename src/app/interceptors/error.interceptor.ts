import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch(error.status){
            case 400:
              this.toastr.error(error.error, error.status);
              break;
            case 401:
              this.toastr.error('unauthorised', error.status);
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              let navigationExtras: NavigationExtras = {
                state: {
                  error: error.error
                }
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
              default:
                this.toastr.error('Something unexpected occured');
          }
        }
        throw error;
      })
    )
  }
}
