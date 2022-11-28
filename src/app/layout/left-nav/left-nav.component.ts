import { Component, ENVIRONMENT_INITIALIZER, EventEmitter, OnInit, Output } from '@angular/core';
import { LEFT_NAV_MENUSCLASS } from '@data/constants/layouts/left-nav-menu.const';
import { enviroment as ENV } from 'environments/enviroments.dev';
import { IleftNavMenu } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { icon } from '@fortawesome/fontawesome-svg-core';
import {faBars,faBarsProgress,faBell,faComment, faTimes} from '@fortawesome/free-solid-svg-icons';
import { INTERNAL_ROUTES } from '@data/constants/routes';
@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  @Output() showMenu = new EventEmitter<any>();

  public faBars = faBars;
  public faBell = faBell;
  public faComment = faComment;
  public condicionAdmin = false;
  public urlIMG = ENV.urlAPI + this.authService.getUser.fotografia;
  // public name = 'andrea';
  // public position = 'gerente';
  // public avatar = 'assets/images/avatar.jpg';
  public logo = 'assets/images/logo.png';

  public menus:IleftNavMenu[]= this.leftNavMenu.getLeftNavMenu;
  
  public logoutMenu!:IleftNavMenu;
  public adminMenu!:IleftNavMenu;

  constructor(
    public authService:ApiService,
    public leftNavMenu:LEFT_NAV_MENUSCLASS
   
    
  ) {
  //  console.log(this.menus);
   
    if (authService.getUser.TipoUsuario == 'admin') {
      this.condicionAdmin = true;
    }

    this.adminMenu = {
      title:'Administrador',
      links:[

          {
              id:11,
              icon:faBarsProgress,
              name:'Gestion de clientes',
              link:INTERNAL_ROUTES.MODULO_GESTCLIENT
          },
          {
              id:12,
              icon:faBarsProgress,
              name:'Gestion de fisioterapeutas',
              link:INTERNAL_ROUTES.MODULO_GESTFISIO
          },
          {
              id:13,
              icon:faBarsProgress,
              name:'Gestion de citas generales'
          },
      ]
      }


    this.logoutMenu = {

      title:'',
      links: [
        {
          id:14,
          icon:faTimes,
          name:'Cerrar Sesion',
          method: () => this.authService.logout()
        }

      ]
    }
   }

  ngOnInit(): void {
   
  }

}
