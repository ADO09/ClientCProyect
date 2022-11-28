import { Component, OnInit } from '@angular/core';
import { ApiService } from '@data/services/api/login/api.service';
import { UsersService } from '@data/services/api/user/users.service';

@Component({
  selector: 'app-conf-pagina',
  templateUrl: './conf-pagina.component.html',
  styleUrls: ['./conf-pagina.component.css']
})
export class ConfPaginaComponent implements OnInit {

  constructor(
    private authService:ApiService,
    private userService:UsersService
  ) { }

  ngOnInit(): void {
  }


  cambiarTemaRed(){
    console.log('akjsdnaksjdns');
    this.authService.getUser.TemaPagina ='red';
    this.authService.setUserToLocalStorage(this.authService.getUser);
    if (this.authService.getUser.TipoUsuario=='cliente') {
      this.userService.setTemaPC().subscribe( r=>{
        
        console.log(r);
      })
    }else{
      this.userService.setTemaPF().subscribe( r=>{
        
        console.log(r);
      })
    }
    window.location.reload();
  }

  cambiarTemayellow(){
    console.log('akjsdnaksjdns');
    this.authService.getUser.TemaPagina ='yellow';
    this.authService.setUserToLocalStorage(this.authService.getUser);
    if (this.authService.getUser.TipoUsuario=='cliente') {
      this.userService.setTemaPC().subscribe( r=>{
        
        console.log(r);
      })
    }else{
      this.userService.setTemaPF().subscribe( r=>{
        
        console.log(r);
      })
    }
    window.location.reload();
  }

  cambiarTemaBlack(){
    console.log('akjsdnaksjdns');
    this.authService.getUser.TemaPagina ='dark';
    this.authService.setUserToLocalStorage(this.authService.getUser);
    if (this.authService.getUser.TipoUsuario=='cliente') {
      this.userService.setTemaPC().subscribe( r=>{
        
        console.log(r);
      })
    }else{
      this.userService.setTemaPF().subscribe( r=>{
        
        console.log(r);
      })
    }
    window.location.reload();
  }

  cambiarTemaDarkBlue(){
    console.log('akjsdnaksjdns');
    this.authService.getUser.TemaPagina ='blue-dark';
    this.authService.setUserToLocalStorage(this.authService.getUser);
    if (this.authService.getUser.TipoUsuario=='cliente') {
      this.userService.setTemaPC().subscribe( r=>{
        
        console.log(r);
      })
    }else{
      this.userService.setTemaPF().subscribe( r=>{
        
        console.log(r);
      })
    }
    window.location.reload();
  }

}
