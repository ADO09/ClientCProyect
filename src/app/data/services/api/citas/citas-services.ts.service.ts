import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { ListCitaCard, ListCitaCardC } from '@data/interfaces';
import { CitaSearchResult } from '@data/models/citaSerachResult.model';
import { ApiClass } from '@data/schema/apiClass.class';
import { catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasServicesTsService  {

  constructor(
    protected http: HttpClient
  ) { }

//FISIOTERAPEUTAS

getCountCitasF(id?:number): Observable<{
  error: boolean,
  msg: string,
  data: any
}> {

  const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: {} as any };
  // console.log(API_ROUTES.CITASF.CITASFISIO);
  return this.http.get<{error:boolean,msg:string,data:any}>
    (API_ROUTES.CITASF.CITASCOUNT+id)
    .pipe(delay(100),
      map(r => {
        
        response.data= r.data;
    
        return response;
      }),
      catchError(() => of(response))
    );
}

  
  getAllCitasF(id?:number): Observable<{
    error: boolean,
    msg: string,
    data:  ListCitaCard[]
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: [] as ListCitaCard[] };
    // console.log(API_ROUTES.CITASF.CITASFISIO);
    return this.http.get<{error:boolean,msg:string,data:ListCitaCard[]}>
      (API_ROUTES.CITASF.CITASFISIO+id)
      .pipe(delay(100),
        map(r => {
          
          response.data= r.data;
      
          return response;
        }),
        catchError(() => of(response))
      );
  }

  delCitasF(id?:number): Observable<{
    error: boolean,
    msg: string,
    data:  any
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: [] as any };
    // console.log(API_ROUTES.CITASF.CITASFISIO);
    return this.http.delete<{error:boolean,msg:string, data: any }>
      (API_ROUTES.CITASF.DELETECITAFISIO+id)
      .pipe(delay(100),
        map(r => {
          response.error= r.error;
          response.data= r.data;
          response.msg= r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }



  getAllCitasFHISTORY(id?:number): Observable<{
    error: boolean,
    msg: string,
    data:  ListCitaCard[]
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: [] as ListCitaCard[] };
    // console.log(API_ROUTES.CITASF.CITASFISIOHISTORY);
    return this.http.get<{error:boolean,msg:string,data:ListCitaCard[]}>
      (API_ROUTES.CITASF.CITASFISIOHISTORY+id)
      .pipe(delay(100),
        map(r => {
          
          response.data= r.data;
      
          return response;
        }),
        catchError(() => of(response))
      );
  }


  uptdCitaFisio(id:number,data:any): Observable<{
    error: boolean,
    msg: string,
    data:  any
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: [] as any };
    // console.log(API_ROUTES.CITASF.CITASFISIOHISTORY);
    return this.http.put<{error:boolean,msg:string,data:any}>
      (API_ROUTES.CITASF.UPDATECITAFISIO+id,data)
      .pipe(delay(100),
        map(r => {
          response.error= r.error;
          response.data= r.data;
          response.msg= r.msg;
          console.log(r)
          return response;
        }),
        catchError(() => of(response))
      );
  }



  //CLIENTES -------------------------------------------------------------------
  getAllCitasCHISTORY(id?:number): Observable<{
    error: boolean,
    msg: string,
    data:  ListCitaCardC[]
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: [] as ListCitaCardC[] };
    // console.log(API_ROUTES.CITASC.CITASCLIENTHISTORY);
    return this.http.get<{error:boolean,msg:string,data:ListCitaCardC[]}>
      (API_ROUTES.CITASC.CITASCLIENTHISTORY+id)
      .pipe(delay(100),
        map(r => {
          
          response.data= r.data;
      
          return response;
        }),
        catchError(() => of(response))
      );
  }

  getAllCitasC(id?:number): Observable<{
    error: boolean,
    msg: string,
    data:  ListCitaCardC[]
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: [] as ListCitaCardC[] };
    // console.log(API_ROUTES.CITASF.CITASFISIO);
    return this.http.get<{error:boolean,msg:string,data:ListCitaCardC[]}>
      (API_ROUTES.CITASC.CITASCLIENT+id)
      .pipe(delay(100),
        map(r => {
          
          response.data= r.data;
      
          return response;
        }),
        catchError(() => of(response))
      );
  }


  
  addCita(data:any): Observable<{
    error: boolean,
    msg: string,
    data:  any
  }> {

    const response = { error: false, msg: 'SE A REGISTRADO LA CITA', data: [] as any };
    // console.log(API_ROUTES.CITASF.CITASFISIOHISTORY);
    return this.http.post<{error:boolean,msg:string,data:any}>
      (API_ROUTES.CITASC.ADDCITAFISIO,data)
      .pipe(delay(100),
        map(r => {
          response.error= r.error;
          response.data= r.data;
          response.msg= r.msg;
          console.log(r)
          return response;
        }),
        catchError(() => of(response))
      );
  }

  
  

}
