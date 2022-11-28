import { Component, OnInit } from '@angular/core';
import { USERS_DATA } from '@data/constants/users/users.const';
import { ListFisioCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { UsersService } from '@data/services/api/user/users.service';

@Component({
  selector: 'app-fisios-list',
  templateUrl: './fisios-list.component.html',
  styleUrls: ['./fisios-list.component.css'],
})
export class FisiosListComponent implements OnInit {
  public users!: ListFisioCard[];
  constructor(
    private userService: UsersService,
    private authService: ApiService
  ) {

    if (this.authService.getUser.TipoUsuario=='cliente') {
      this.userService.getAllUsersnotfavsF().subscribe( r =>{
      
        this.users = r.data;
      })
    } else {
      this.userService.getAllUsersF().subscribe((r) => {
        console.log('ESTE SON LOS FISIOS:', r);
        if (!r.error) {
          this.users = r.data;
  
          // for (let i = 0; i < this.users.length; i++) {
          //   for (let j = 0; j < this.authService.getUser.favoritos.length; j++) {
          //     if (
          //       this.users[i].id_fisio == this.authService.getUser.favoritos[j]
          //     ) {
          //       console.log('ASJDHIAHDI');
  
          //     }
          //   }
          // }
          console.log('DATOS: ', this.users);
        }
      });
    }
  


    
  }

  ngOnInit(): void { }

  searchText: string = '';
  onSearchTextEntered(searvalue: string) {
    this.searchText = searvalue;
    console.log(this.searchText);
  }
}
