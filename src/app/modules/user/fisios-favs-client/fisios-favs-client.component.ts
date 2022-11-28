import { Component, OnInit } from '@angular/core';
import { ListFisioCard } from '@data/interfaces';
import { ApiService } from '@data/services/api/login/api.service';
import { UsersService } from '@data/services/api/user/users.service';

@Component({
  selector: 'app-fisios-favs-client',
  templateUrl: './fisios-favs-client.component.html',
  styleUrls: ['./fisios-favs-client.component.css']
})
export class FisiosFavsClientComponent implements OnInit {
  public users!: ListFisioCard[];
  constructor(
    private userService: UsersService,
    private authService: ApiService
  ) {

    this.userService.getAllUsersfavsF().subscribe( r =>{
      
      this.users = r.data;
    })
   }

  ngOnInit(): void {
  }

  
  searchText: string = '';
  onSearchTextEntered(searvalue: string) {
    this.searchText = searvalue;
    console.log(this.searchText);
  }
}
