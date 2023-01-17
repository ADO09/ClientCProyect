import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR_CONST } from '@data/constants';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { ApiResponse, cliTPinterface } from '@data/interfaces';
import { Observable, map, catchError, of } from 'rxjs';
import { ApiService } from '../login/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroClientService  {


  constructor(private http: HttpClient,
    ) { }

  RegClient(
    data: any
  ): Observable<{
    error: boolean;
    msg: string;
  }> {
    console.log(data);
    const response = { error: true, msg: '', data: data as FormData };
    return this.http.post<{ error: boolean, msg: string }>(API_ROUTES.USUARIOS.CLIENT, data)
      .pipe(
        map(r => {
          response.msg = r.msg;
          response.error = r.error;
          
          // this.setUserToLocalStorage(r.data);
          // this.currentUser.next(r.data);
          console.log(r);
          console.log(response.error);

          return response;
        }),
        catchError(e => {
          return of(response);
        })
      );
  }

  RegFisio(
    data: any
  ): Observable<{
    error: boolean;
    msg: string;
    data:any;
  }> {
    //console.log(data);
    const response = { error: true, msg: '', data: [] as any | null };
    return this.http.post<{ error: boolean, msg: string, data:any }>(API_ROUTES.USUARIOS.FISIOS, data)
      .pipe(
        map(r => {
          
          console.log(r);
          
          response.msg = r.msg;
          response.error = r.error;
          
          response.data=r.data;
          // this.setUserToLocalStorage(r.data);
          // this.currentUser.next(r.data);
          
          

          return response;
        }),
        catchError(e => {
          return of(response);
        })
      );
  }
}
