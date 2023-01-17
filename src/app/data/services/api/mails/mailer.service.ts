import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { ExpMedicoInterface } from '@data/interfaces';
import { Observable, delay, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  constructor(
    protected http: HttpClient,
  ) { }


  SendMessage(data:any): 
  Observable<{
    error: boolean;
    msg: string;
  }> {

    const response = { error: false, msg: '' };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.post<{error:boolean ,msg:string  }>
      (API_ROUTES.MAILER.MAILERMSSE,data)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }


  MessageAcptFisio(data:any): 
  Observable<{
    error: boolean;
    msg: string;
  }> {

    const response = { error: false, msg: '' };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.post<{error:boolean ,msg:string  }>
      (API_ROUTES.MAILER.MAILERACPTFISIO,data)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }


  
  MessageForgotPassword(correo:any): 
  Observable<{
    error: boolean;
    msg: string;
  }> {

     console.log(API_ROUTES.MAILER.MAILERFORGOTPASSWORD + correo);
    const response = { error: false, msg: '' };
    return this.http.get<{error:boolean ,msg:string}>
      (API_ROUTES.MAILER.MAILERFORGOTPASSWORD + correo)
      .pipe(delay(100),
        map(r => {
          // console.log(data)
          response.error = r.error;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }





  MessageAcptClient(data:any): 
  Observable<{
    error: boolean;
    msg: string;
  }> {

    const response = { error: false, msg: '' };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.post<{error:boolean ,msg:string  }>
      (API_ROUTES.MAILER.MAILERACPTCLIENT,data)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }



  messbaneoCuenta(data:any): 
  Observable<{
    error: boolean;
    msg: string;
  }> {

    const response = { error: false, msg: '' };
    // console.log(API_ROUTES.PLANES.PLANESONEFISIO);
    return this.http.post<{error:boolean ,msg:string  }>
      (API_ROUTES.MAILER.MAILERBANEOCUENTA,data)
      .pipe(delay(100),
        map(r => {
          response.error = r.error;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}
