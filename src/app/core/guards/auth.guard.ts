import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiService } from '@data/services/api/login/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: ApiService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getUser;
    if (currentUser) {
      return true;
    }

    this.router.navigate([INTERNAL_ROUTES.AUTH_LOGIN],{
      queryParams:{returnUrl:state.url}
    });
    return false;
  }

}
