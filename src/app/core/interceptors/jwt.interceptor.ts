import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_ROUTES, INTERNAL_ROUTES } from "@data/constants/routes";
import { ApiService } from "@data/services/api/login/api.service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()

export class JwtInterceptor implements HttpInterceptor{

    constructor(
        // private router:Router,
        private authService:ApiService
    ){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser =  this.authService.getUser;
        const isAuthenticate = currentUser && currentUser.usuario;
        if(isAuthenticate || req.url !== API_ROUTES.AUTH.LOGIN){

            req =  req.clone({
                setHeaders:{
                    Authorization: `Bearer ${currentUser.usuario}`
                }
            });
        }else {
            console.log('no esta autenticado');
        }
        return next.handle(req)
    }
}