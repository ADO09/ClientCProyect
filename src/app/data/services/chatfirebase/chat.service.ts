import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from '@data/constants/routes';
import { Observable, delay, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public useSendMessage:any;
  constructor(
    private http:HttpClient,
  ) { }



  set setUsuario(usuario:any){
    this.useSendMessage = usuario;
  }

  GetDataUserChatSave(user?:any): Observable<{
    error: boolean,
    msg: string,
    data:  any
  }> {

    const response = { error: false, msg: 'AQUI ESTAN LOS DATOS', data: {} as any };
    // console.log(API_ROUTES.CITASF.CITASFISIO);
    return this.http.get<{error:boolean,msg:string, data: any }>
      (API_ROUTES.CHAT.USERDATACHAT+user)
      .pipe(
        map(r => {
          response.error= r.error;
          response.data= r.data;
          response.msg= r.msg;
          return response;
        }),
        catchError(() => of(response))
      );
  }
}
