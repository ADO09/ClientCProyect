import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { ERROR_CONST } from '@data/constants/errors/errors.const';
import {  INTERNAL_ROUTES } from '@data/constants/routes/internal.routes';
import { API_ROUTES } from '@data/constants/routes';
import { ApiResponse } from '@data/interfaces/Interfaces';
import Swal from 'sweetalert2';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Database, getDatabase, ref, set, onValue, update } from "firebase/database";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public currentUser!:BehaviorSubject<ApiResponse>  ;
  public nameUserLS = "currentUser";
  public TipoUsuario!:string; 
  public title = 'firechat';
  public app!: FirebaseApp;
  public db!: Database;
  constructor(private http:HttpClient,
   private router:Router ) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this.nameUserLS)!)  
    ) 

    console.log(this.nameUserLS);

    this.app = initializeApp(environment.firebase);
    this.db = getDatabase(this.app);
    
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

          console.log(r);
         // var estatusC =  (Object.values(response.data)[8]);
          
          if (response.data.estatusCuenta == '1') {
            console.log(this.nameUserLS);
            this.setUserToLocalStorage(r.data);
            this.currentUser.next(r.data);
            console.log(r);
            if (!response.error) {
            console.log(response.data);
             this.TipoUsuario =  (Object.values(response.data)[3]);
            console.log(this.TipoUsuario);
 
            const online:any = {
              estatusOnline:"1"
            } 
            set(ref(this.db, `chats/usersOnline/${this.getUser.usuario}`), online);
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
            
          } else if(response.data.estatusCuenta == '2'){
            
            Swal.fire({
              icon:'warning',
              title: 'Tu cuenta ha sido baneada pero mira que bonita alerta Verifica tu correo.',
              width: 600,
               
              padding: '3em',
              color: '#716add',
              background: '#fff url(/images/trees.png)',
              backdrop: `
                rgba(0,0,123,0.4)
                url("https://media.tenor.com/JucrwBIhVokAAAAC/bob-esponja.gif")
                left top
                no-repeat
              `
            })
          }
      
          return response;
        }),
        catchError(e => {
          return of(response);
        })
      );
    }


    


    logout(){
  
      if (this.currentUser) {
        set(ref(this.db, `chats/usersOnline/${this.getUser.usuario}`), {"estatusOnline":"2"});
      }
    
      localStorage.removeItem(this.nameUserLS);
      this.currentUser.next(null!);
      this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
    }

    public setUserToLocalStorage (user:ApiResponse){
     
      localStorage.setItem(this.nameUserLS,JSON.stringify(user));
    }

   
}


