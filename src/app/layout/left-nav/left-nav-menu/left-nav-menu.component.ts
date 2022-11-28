import { Component, Input, OnInit } from '@angular/core';
import { IleftNavMenu } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';

@Component({
  selector: 'app-left-nav-menu',
  templateUrl: './left-nav-menu.component.html',
  styleUrls: ['./left-nav-menu.component.css']
})
export class LeftNavMenuComponent implements OnInit {


 
  public cond = this.authService.getUser.TipoUsuario;
  @Input()data!:IleftNavMenu;
  constructor(public authService:ApiService) { 
    
    
  }

  ngOnInit(): void {
    // console.log(this.data.title.length);
    // console.log(this.cond);
   
    // if (this.cond == 'cliente') {

    //   const indexOfObject2 = this.data.links.findIndex((object) => {
    //     return object.id === 7;
    //   });
  
    //   if (indexOfObject2 !== -1) {
    //     this.data.links.splice(indexOfObject2, 1);
    //   }

    //   const indexOfObject3 = this.data.links.findIndex((object) => {
    //     return object.id === 8;
    //   });
  
    //   if (indexOfObject3 !== -1) {
    //     this.data.links.splice(indexOfObject3, 1);
    //   }

    //      const indexOfObject4 = this.data.links.findIndex((object) => {
    //     return object.id === 10;
    //   });
  
    //   if (indexOfObject4 !== -1) {
    //     this.data.links.splice(indexOfObject4, 1);
    //   }

    // }
    
    //  if (this.cond == 'fisioterapeuta') {
      

    //   const indexOfObject2 = this.data.links.findIndex((object) => {
    //     return object.id === 4;
    //   });
  
    //   if (indexOfObject2 !== -1) {
    //     this.data.links.splice(indexOfObject2, 1);
    //   }
    // }

    
  }

}
