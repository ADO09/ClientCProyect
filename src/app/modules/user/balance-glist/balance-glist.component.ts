import { Component, OnInit } from '@angular/core';
import { ListCitaCard } from '@data/interfaces';
import { CitasServicesTsService } from '@data/services/api/citas/citas-services.ts.service';
import { ApiService } from '@data/services/api/login/api.service';

@Component({
  selector: 'app-balance-glist',
  templateUrl: './balance-glist.component.html',
  styleUrls: ['./balance-glist.component.css']
})
export class BalanceGListComponent implements OnInit {

  public CitaDatos!:ListCitaCard[];
  public totalCostoCita = 0;
  constructor(
    private authService:ApiService,
    private citaService:CitasServicesTsService
  ) {

    this.citaService.getAllCitasFHISTORYBALANCE(this.authService.getUser.id_fisio).subscribe( r => {

      console.log(r);
      
      this.CitaDatos = r.data;
    

      this.CitaDatos.forEach(element => {
        

        console.log(element.costo)
        this.totalCostoCita+= element.costo;
        

      });



      var table:any = document.getElementById("tableBalance"),
      
      sumVal = 0;
      // for (var i = 1; i < table?.rows.length; i++) {
      //   sumVal = sumVal + parseFloat(table?.rows[i].cells[10].innerHTML);
      // }
      console.log(sumVal);
    
      console.log(table?.rows[1][10]);
    })



   }


   searchText:string = '';

   onSearchTextEntered(searvalue:string){
     this.searchText = searvalue;
     console.log(this.searchText);
   }
  ngOnInit(): void {
  }

}
