import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { INTERNAL_ROUTES } from "@data/constants/routes";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()

export class ErrorInterceptor implements HttpInterceptor{

    constructor(
        private router:Router
    ){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req)
      .pipe(
        catchError((err) => {
            console.log(err);
            console.log('Interceptor');
            if (
                [401,403,404].indexOf(err.status) !== -1
            ) {
                // this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN , err.status);
            }
            return throwError(err);
        })
      );
    }
}