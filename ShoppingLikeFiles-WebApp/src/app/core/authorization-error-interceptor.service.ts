import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationErrorInterceptorService implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router,
        private spinner: NgxSpinnerService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
          catchError((err) => {
            if (err.status == 401) {
              if (this.authService.getAccessToken != null) {
                this.authService.clear();
              }
              this.router.navigate(['/caffs']);
              this.spinner.hide();
            } else {
                // TODO: do not console.log error
              console.log(err);
            }
            return throwError(() => err);
          }),
        );
    }
}
