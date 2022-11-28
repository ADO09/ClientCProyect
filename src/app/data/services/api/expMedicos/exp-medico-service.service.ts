import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES } from '@data/constants/routes';
import { ExpMedicoInterface } from '@data/interfaces';
import { Observable, delay, map, catchError, of } from 'rxjs';
import { ApiService } from '../login/api.service';

@Injectable({
  providedIn: 'root'
})
export class ExpMedicoServiceService {

  constructor(
    protected http: HttpClient,
    private authService:ApiService,
    private router:Router
  ) { }


  getExpMedico(id?:number): 
  Observable<{
    error: boolean;
    msg: string;
    data:  ExpMedicoInterface[];
  }> {

    const response = { error: false, msg: '', data: [] as ExpMedicoInterface[] };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.get<{error:boolean ,msg:string ,data:ExpMedicoInterface[] }>
      (API_ROUTES.EXPEDIENTESMEDICOS.EXPEDIENTERG + id)
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
