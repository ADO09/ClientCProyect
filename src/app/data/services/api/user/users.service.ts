import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES, INTERNAL_ROUTES } from '@data/constants/routes';
import { cliTPinterface, ListFisioCard } from '@data/interfaces';
import { ApiClass } from '@data/schema/apiClass.class';
import { catchError, delay, map, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from '../login/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ApiClass {

  public fav:any ='';
  public spl!:any;
  constructor( protected http: HttpClient,
    private authService:ApiService,
    private router:Router
    
    ) {
    super();
  }

  getAllUsersF(): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {

    const response = { error: false, msg: '', data: [] as ListFisioCard[] };
    console.log(this.url+'clientesF');
    return this.http.get<{error:boolean ,msg:string ,data:ListFisioCard[] }>
      (this.url+'clientesF')
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

  getAllUsersC(): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {

    const response = { error: false, msg: '', data: [] as cliTPinterface[] };
    console.log(this.url+'clientesF');
    return this.http.get<{error:boolean ,msg:string ,data:cliTPinterface[] }>
      (this.url+'clientesP')
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

  getoneUsersC(id:number): Observable<{
    error: boolean,
    msg: string,
    data:  cliTPinterface
  }> {

    const response = { error: false, msg: '', data: {} as cliTPinterface };
   
    return this.http.get<cliTPinterface>
      (this.url+'clientesP/'+id)
      .pipe(
        map(r => {
       
          response.data= r;
          return response;
        }),
        catchError(() => of(response))
      );
  }



  getoneUsersF(id:number): Observable<{
    error: boolean,
    msg: string,
    data:  ListFisioCard
  }> {

    const response = { error: false, msg: '', data: {} as ListFisioCard };
    // console.log(this.url+'clientesF/' + id);
    return this.http.get<{error:boolean ,msg:string ,data:ListFisioCard }>
      (this.url+'clientesF/'+id)
      .pipe(
        map(r => {
          console.log(r);
          
       response.error =r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }

  

  getonePuntF(id:number): Observable<{
    error: boolean,
    msg: string,
    data:  any
  }> {

    const response = { error: false, msg: '', data: {} as any };
    // console.log(this.url+'clientesF/' + id);
    return this.http.get<{error:boolean ,msg:string ,data:any}>
      (API_ROUTES.USUARIOS.PUNTUACIONFISIO+id)
      .pipe(
        map(r => {
       response.error =r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }

 

  getAllfavF(id?:string){
    
   
    
    // this.fav += id +',';
    this.authService.getUser.favoritos += id + ',';
    //this.spl =this.fav.substring(0,this.fav.length-1).split(',');
    //this.authService.getUser.favoritos.push(id?.toString());
    this.authService.setUserToLocalStorage(this.authService.getUser);
    console.log(this.authService.getUser.favoritos);

     

    
    
   this.setAllUsersfavsF(this.authService.getUser.favoritos).subscribe( r =>{
    console.log(r);
    if (!r.error) {
      Swal.fire({
        icon: 'success',
        title: 'Agregado a favoritos',
        showConfirmButton: false,
        timer: 1500
      })
    }
    // setTimeout(() => window.location.reload(), 2000);
    this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_FAVORITOSFISIOS);
   })
    
    
  }

  setAllUsersfavsF( cadena:string ): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('favoritos',cadena);
    const response = { error: false, msg: '', data: {} as any };
    console.log(this.url+'clientesC');
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (this.url+'clientesP/'+this.authService.getUser.id_cliente,formData)
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

  

  getAllUsersnotfavsF(): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('favoritos',this.authService.getUser.favoritos);
    const response = { error: false, msg: '', data: [] as any };
    console.log(this.url+'clientesF');
    return this.http.post<{error:boolean ,msg:string ,data:any }>
      (this.url+'clientesF/noFavoritos',formData)
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

  
  
  getAllUsersfavsFBut(favsCadn:any): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('favoritos',favsCadn);
    const response = { error: false, msg: '', data: [] as any };
    console.log(this.url+'clientesF');
    return this.http.post<{error:boolean ,msg:string ,data:any }>
      (this.url+'clientesF/Favoritos',formData)
      .pipe(delay(100),
        map(r => {
          
          if (!r.error) {
            this.setAllUsersfavsF(favsCadn).subscribe( r => {
              console.log(r);
            });
          }
        console.log(r);
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }

  
  getAllUsersfavsF(): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('favoritos',this.authService.getUser.favoritos);
    const response = { error: false, msg: '', data: [] as any };
    console.log(this.url+'clientesF');
    return this.http.post<{error:boolean ,msg:string ,data:any }>
      (this.url+'clientesF/Favoritos',formData)
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


  setTemaPC(): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('TemaPagina',this.authService.getUser.TemaPagina);
    const response = { error: false, msg: '', data: {} as any };
    console.log(this.url+'clientesC');
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (this.url+'clientesP/'+this.authService.getUser.id_cliente,formData)
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

  setTemaPF(): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const formData = new FormData();
    formData.append('TemaPagina',this.authService.getUser.TemaPagina);
    const response = { error: false, msg: '', data: {} as any };
    console.log(this.url+'clientesC');
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (this.url+'clientesF/'+this.authService.getUser.id_fisio,formData)
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


  updateFisio(data:any,id:any): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
    const response = { error: false, msg: '', data: {} as any };
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (API_ROUTES.USUARIOS.ONEFISIOS +id,data)
      .pipe(delay(100),
        map(r => {
          console.log(r);
          response.error = r.error;
          response.data= r.data;
          response.msg = r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }


  updateClient(data:any,id:any): 
  Observable<{
    error: boolean;
    msg: string;
    data:  any;
  }> {
   
   
    const response = { error: false, msg: '', data: {} as any };
    return this.http.put<{error:boolean ,msg:string ,data:any }>
      (API_ROUTES.USUARIOS.ONECLIENT +id,data)
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


