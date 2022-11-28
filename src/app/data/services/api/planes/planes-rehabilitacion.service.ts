import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES } from '@data/constants/routes';
import { ListFisioCard,ListPlanCard } from '@data/interfaces';
import { Observable, delay, map, catchError, of } from 'rxjs';
import { ApiService } from '../login/api.service';

@Injectable({
  providedIn: 'root'
})
export class PlanesRehabilitacionService {

  constructor(
    protected http: HttpClient,
    private authService:ApiService,
    private router:Router
  ) { }


  getAllPlanF(id?:number): 
  Observable<{
    error: boolean;
    msg: string;
    data:  ListPlanCard[];
  }> {

    const response = { error: false, msg: '', data: [] as ListPlanCard[] };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.get<{error:boolean ,msg:string ,data:ListPlanCard[] }>
      (API_ROUTES.PLANES.PLANESONEFISIO + id)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }



  getOnePlanF(id?:number): 
  Observable<{
    error: boolean;
    msg: string;
    data:  ListPlanCard;
  }> {

    const response = { error: false, msg: '', data: {} as ListPlanCard };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.get<{error:boolean ,msg:string ,data:ListPlanCard }>
      (API_ROUTES.PLANES.PLANES + id)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }

  
  delPlanF(id?:number): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {

    const response = { error: false, msg: '', data: {} as ListPlanCard };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.delete<{error:boolean ,msg:string ,data:any }>
      (API_ROUTES.PLANES.PLANES + id)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }


  
  AddPlan( data:any ): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
   
    const response = { error: false, msg: '', data: {} as any };
    
    return this.http.post<{error:boolean ,msg:string ,data:any }>
      (API_ROUTES.PLANES.PLANES,data)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }


  
  estatusPlan( id?:number ): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('estatus','2');
    const response = { error: false, msg: '', data: [] as any };
    
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (API_ROUTES.PLANES.PLANES + id,formData)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }



  updPlan( data:any,id?:number ): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
   
    const response = { error: false, msg: '', data: [] as any };
    
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (API_ROUTES.PLANES.PLANES + id,data)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}




