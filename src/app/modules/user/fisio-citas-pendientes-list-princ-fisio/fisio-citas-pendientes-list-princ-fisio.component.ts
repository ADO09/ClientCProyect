import { Component, OnInit } from '@angular/core';
import { ListCitaCard, ListCitaCardC } from '@data/interfaces';
import { CitasServicesTsService } from '@data/services/api/citas/citas-services.ts.service';
import { ApiService } from '@data/services/api/login/api.service';

@Component({
  selector: 'app-fisio-citas-pendientes-list-princ-fisio',
  templateUrl: './fisio-citas-pendientes-list-princ-fisio.component.html',
  styleUrls: ['./fisio-citas-pendientes-list-princ-fisio.component.css']
})
export class FisioCitasPendientesListPrincFisioComponent implements OnInit {

  public citas!: ListCitaCard[];
  public citasC!:ListCitaCardC[];
  public id!: number | undefined;
  public condUser:boolean = true;
  constructor(
    private citasService:CitasServicesTsService,
    private authService:ApiService,
    
  ) { 
    if (authService.getUser.TipoUsuario == 'fisioterapeuta') {
      this.id = authService.getUser.id_fisio;
     this.condUser = true;
    
    } else {
      this.id = authService.getUser.id_cliente;
      this.condUser = false;
    }

   
  }

  searchText:string = '';

  ngOnInit(): void {

    if (this.authService.getUser.TipoUsuario == 'fisioterapeuta') {
      this.citasService.getAllCitasF(this.id).subscribe( r =>{
        if (!r.error) {
          this.citas = r.data;
          
          // console.log(this.citas);
         
        }
       
      })
    }else if (this.authService.getUser.TipoUsuario == 'cliente'){
      this.citasService.getAllCitasC(this.id).subscribe( r =>{
        if (!r.error) {
          this.citasC = r.data;
          
          console.log(this.citasC);
         
        }
       
      })
    }
   
  }

  onSearchTextEntered(searvalue:string){
    this.searchText = searvalue;
    console.log(this.searchText);
  }

}
