import {HttpClient,HttpErrorResponse,HttpHeaderResponse} from '@angular/common/http'
import { enviroment } from 'environments/enviroments.dev'
import { of } from 'rxjs';


export class ApiClass {
 

    public url = enviroment.url;
     public isProduction = enviroment.production;


  error(error: HttpErrorResponse){
    let errorMsg = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    }else{
      errorMsg = `Error Code ${error.status}\nMessage:_${error.message}`;
    }
    //return of({error:true, msg:errorMsg, data: null })
    return of({error:true, msg:errorMsg, data: null })
  }
    
}

