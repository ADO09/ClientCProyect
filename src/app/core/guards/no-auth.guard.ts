import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { INTERNAL_PATHS, INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiService } from '@data/services/api/login/api.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor (
    private router:Router,
    private authService:ApiService
    )
    {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = this.authService.getUser;

      if (currentUser) {
        this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PAGPRINCP)
        return false;
      }
      return true;
    
  }
  
}
