import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { CitasServicesTsService } from '@data/services/api/citas/citas-services.ts.service';
import { ApiService } from '@data/services/api/login/api.service';
import {faBars,faBell,faComment} from '@fortawesome/free-solid-svg-icons';
import { enviroment as ENV } from 'environments/enviroments.dev';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public urlIMG = ENV.urlAPI + this.authService.getUser.fotografia;
  @Output() showMenu = new EventEmitter<any>();
  public faBars = faBars;
  public faBell = faBell;
  public faComment = faComment;
  public chat = INTERNAL_ROUTES.MODULO_CHAT;
  public avatar = 'assets/images/avatar.jpg';
  public logo = 'assets/imagenes/logo.png';
  public numCitas = 0;
  constructor(
    public authService:ApiService,
    public router:Router,
    private citasService:CitasServicesTsService
  ) { 

    if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
      this.citasService.getCountCitasF(this.authService.getUser.id_fisio).subscribe( r => {

        console.log(r.data['COUNT(id_cita)']);
        this.numCitas = r.data['COUNT(id_cita)'];
      })
    }
    
  }

  ngOnInit(): void {
  }

  perfil(){

    if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
      this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PERFILFISIOS + this.authService.getUser.id_fisio);
    } else {
      this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_PERFILCLIENTES + this.authService.getUser.id_cliente);
    }

  }

  histCitas(){
   
      this.router.navigateByUrl(INTERNAL_ROUTES.MODULO_CITASHISTORIAL);
    
  }

}
