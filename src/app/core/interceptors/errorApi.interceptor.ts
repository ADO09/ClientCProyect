import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { INTERNAL_ROUTES } from "@data/constants/routes";
import { catchError, Observable, throwError } from "rxjs";
import Swal from "sweetalert2";

@Injectable()

export class ErrorInterceptorAPI implements HttpInterceptor{

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
                [500,503,0].indexOf(err.status) !== -1
            ) {
                // this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN , err.status);
                console.log("SERVICIO API NO DISPONIBLE",err.status);
                Swal.fire({
                    icon: 'error',
                    title: 'Servicio api no disponible',
                    text: 'Vuelva mas tarde lo sentimos te amo!',
                    footer: '❄ 🎁 🎅 🏂 ☃'
                  })
            }
            return throwError(err);
        })
      );
    }
}