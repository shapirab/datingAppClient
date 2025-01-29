import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcountService } from '../services/acount.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  token: string | undefined;
  constructor(private accountService: AcountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.accountService.currentUser$){
      this.accountService.currentUser$.subscribe({
        next: res => this.token = res?.token
      });
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    return next.handle(request);
  }
}
