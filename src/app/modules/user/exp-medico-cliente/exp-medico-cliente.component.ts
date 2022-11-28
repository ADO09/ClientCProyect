import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';
import { ExpMedicoInterface } from '@data/interfaces';
import { ExpMedicoServiceService } from '@data/services/api/expMedicos/exp-medico-service.service';

@Component({
  selector: 'app-exp-medico-cliente',
  templateUrl: './exp-medico-cliente.component.html',
  styleUrls: ['./exp-medico-cliente.component.css']
})
export class ExpMedicoClienteComponent implements OnInit {

  public id!: number;
  public dataExpMedicos!:ExpMedicoInterface[];
  public CitasList = INTERNAL_ROUTES.MODULO_PAGPRINCF;
  public citaNum:any;
  constructor(
    private expMedicoService:ExpMedicoServiceService,
    private route: ActivatedRoute,
  ) { 
    this.id = +this.route.snapshot.params['id_cliente'];
   
    
  }

  ngOnInit(): void {
   
    this.expMedicoService.getExpMedico(this.id).subscribe( r =>{
      this.dataExpMedicos = r.data;
      console.log(r);
       this.citaNum = (this.dataExpMedicos.length);
    })
  }

}
