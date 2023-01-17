


import { IleftNavMenu } from "@data/interfaces";
import {faUser,faCode,faClipboard,faComment,faHeart,faBookmark,faChartLine,faCog,faCogs,faCalendarDay,faMoneyCheckDollar,faBarsProgress,faList} from '@fortawesome/free-solid-svg-icons';
import { INTERNAL_ROUTES } from "../routes";
import { ApiService } from "@data/services/api/login/api.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class LEFT_NAV_MENUSCLASS{
    public LEFT_NAV_MENUS!:IleftNavMenu[];
    public linkP:any;
    constructor(
        private authService:ApiService,
        router:Router
    ){ 

        if (this.authService.getUser.TipoUsuario == 'fisioterapeuta'  || this.authService.getUser.TipoUsuario == 'admin') {
            
            this.linkP = INTERNAL_ROUTES.MODULO_PERFILFISIOS + authService.getUser.id_fisio;

            this.LEFT_NAV_MENUS = [

                {
                    title:'Mi cuenta',
                    links:[
                        {
                            id:1,
                            icon:faUser,
                            name:'Perfil',
                          
                            link: (this.linkP)
                        },
    
                        {
                            id:2,
                            icon:faCog,
                            name:'Mi cuenta',
                            link:INTERNAL_ROUTES.MODULO_CONFFISIO + this.authService.getUser.id_fisio
                        },
              
                        {
                            id:3,
                            icon:faComment,
                            name:'Chat',
                            link:INTERNAL_ROUTES.MODULO_CHAT
                        },
                    ]
                },
                {
                    title:'Servicios',
                    links:[
            
                        // {
                        //     id:4,
                        //     icon:faHeart,
                        //     name:'Favoritos',
                        //     link:INTERNAL_ROUTES.MODULO_FAVORITOSFISIOS,
                        // },
                        {
                            id:16,
                            icon:faList,
                            name:'Fisioterapeutas',
                            link:INTERNAL_ROUTES.MODULO_PAGPRINCP,
                        },
                        {
                            id:5,
                            icon:faClipboard,
                            name:'Citas',
                            link:INTERNAL_ROUTES.MODULO_PAGPRINCF,
                            vistas:{
                                name:'perro',
                                agendado:'esto',
                                Ciliente:'esta'
                            }
                        },
                        {
                            id:6,
                            icon:faCalendarDay,
                            name:'Citas(Historial)',
                            link:INTERNAL_ROUTES.MODULO_CITASHISTORIAL,
                        },
                        {
                            id:7,
                            icon:faChartLine,
                            name:'Balance de cuenta',
                            link:INTERNAL_ROUTES.MODULO_BALANCEGENERAL
                        },
                        {
                            id:8,
                            icon:faMoneyCheckDollar,
                            name:'Balance historial'
                        },
                        {
                            id:9,
                            icon:faCogs,
                            name:'Settings',
                            link:INTERNAL_ROUTES.MODULO_CONFPAGINA
                            
                        },
                        {
                            id:10,
                            icon:faBookmark,
                            name:'Planes',
                            link:INTERNAL_ROUTES.MODULO_PLANESFISIOLIST,
                        },
                    ]
                },
                
            
            ]
        }else if (this.authService.getUser.TipoUsuario == 'cliente' || this.authService.getUser.TipoUsuario == 'admin') {
           
            this.linkP = INTERNAL_ROUTES.MODULO_PERFILCLIENTES + authService.getUser.id_cliente
            this.LEFT_NAV_MENUS = [

                {
                    title:'Mi cuenta',
                    links:[
                        {
                            id:1,
                            icon:faUser,
                            name:'Perfil',
                          
                            link: (this.linkP)
                        },
    
                        {
                            id:2,
                            icon:faCog,
                            name:'Mi cuenta',
                            link:(INTERNAL_ROUTES.MODULO_CONFPACIENTE + this.authService.getUser.id_cliente)
                        },
              
                        {
                            id:3,
                            icon:faComment,
                            name:'Chat',
                            link:INTERNAL_ROUTES.MODULO_CHAT
                            
                        },
                    ]
                },
            
                {
                    title:'Servicios',
                    links:[
            
                        {
                            id:4,
                            icon:faHeart,
                            name:'Favoritos',
                            link:INTERNAL_ROUTES.MODULO_FAVORITOSFISIOS,
                        },
                        {
                            id:16,
                            icon:faList,
                            name:'Fisioterapeutas',
                            link:INTERNAL_ROUTES.MODULO_PAGPRINCP,
                        },
                        {
                            id:5,
                            icon:faClipboard,
                            name:'Citas',
                            link:INTERNAL_ROUTES.MODULO_PAGPRINCF,
                            vistas:{
                                name:'perro',
                                agendado:'esto',
                                Ciliente:'esta'
                            }
                        },
                        {
                            id:6,
                            icon:faCalendarDay,
                            name:'Citas(Historial)',
                            link:INTERNAL_ROUTES.MODULO_CITASHISTORIAL,
                        },
                        // {
                        //     id:7,
                        //     icon:faChartLine,
                        //     name:'Balance de cuenta'
                        // },
                        // {
                        //     id:8,
                        //     icon:faMoneyCheckDollar,
                        //     name:'Balance historial'
                        // },
                        {
                            id:9,
                            icon:faCogs,
                            name:'Settings',
                            link:INTERNAL_ROUTES.MODULO_CONFPAGINA
                            
                        },
                        // {
                        //     id:10,
                        //     icon:faBookmark,
                        //     name:'Planes',
                        //     link:INTERNAL_ROUTES.MODULO_PLANESFISIOLIST,
                        // },
                    ]
                },
                
            
            ]
        }
      
     
    }
  
    get getLeftNavMenu():IleftNavMenu[]{
            return this.LEFT_NAV_MENUS;
    }


}





