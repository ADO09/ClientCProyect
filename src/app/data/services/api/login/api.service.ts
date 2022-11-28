import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ERROR_CONST } from '@data/constants/errors/errors.const';
import {  INTERNAL_ROUTES } from '@data/constants/routes/internal.routes';
import { API_ROUTES } from '@data/constants/routes';
import { ApiResponse } from '@data/interfaces/Interfaces';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public currentUser!:BehaviorSubject<ApiResponse>  ;
  public nameUserLS = "currentUser";
  public TipoUsuario!:string; 
  constructor(private http:HttpClient,
   private router:Router ) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)!)  
    ) 

    console.log(this.nameUserLS);
    }

    get getUser():ApiResponse{

      return this.currentUser.value;
    }

    login(
      data: {
        usuario:string;
        contrasena:string;
      }  
    ):Observable <{
        error:boolean;
        msg:string;
        data:ApiResponse;
    }>{
      const response = {error:true,msg:ERROR_CONST.LOGIN.ERROR,data:{} as ApiResponse};
      return this.http.post<{error:boolean,msg:string,data:ApiResponse}>(API_ROUTES.AUTH.LOGIN,data)
      .pipe(
        map(r=> {
          response.msg = r.msg;
          response.data = r.data;
          // r.data.favoritos = r.data.favoritos.split(',');
          response.error = r.error;
          console.log(this.nameUserLS);
          this.setUserToLocalStorage(r.data);
          this.currentUser.next(r.data);
          console.log(r);
          if (!response.error) {
          console.log(response.data);
           this.TipoUsuario =  (Object.values(response.data)[3]);
          console.log(this.TipoUsuario);

          if (this.TipoUsuario=='cliente') {
            console.log("CLIENTE");
            this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PAGPRINCP);
          } else if(this.TipoUsuario=='fisioterapeuta'){
            console.log("FISIO");
            this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PAGPRINCF);
          } else if(this.TipoUsuario=='admin'){
            
            this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PAGPRINCF);
          }
           // 
          }
          
          return response;
        }),
        catchError(e => {
          return of(response);
        })
      );
    }


    logout(){
      localStorage.removeItem(this.nameUserLS);
      this.currentUser.next(null!);
      this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
    }

    public setUserToLocalStorage (user:ApiResponse){
     
      localStorage.setItem(this.nameUserLS,JSON.stringify(user));
    }

    public SetTemaLocalStorage(Tema:any){
      
    }
}


