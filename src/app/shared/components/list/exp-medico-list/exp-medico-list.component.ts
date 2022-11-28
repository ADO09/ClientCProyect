import { Component, Input, OnInit } from '@angular/core';
import { INTERNAL_PATHS, INTERNAL_ROUTES } from '@data/constants/routes';
import { ExpMedicoInterface } from '@data/interfaces';

@Component({
  selector: 'app-exp-medico-list',
  templateUrl: './exp-medico-list.component.html',
  styleUrls: ['./exp-medico-list.component.css']
})
export class ExpMedicoListComponent implements OnInit {
  
 
  public perfilFisio = INTERNAL_ROUTES.MODULO_PERFILFISIOS;
  @Input() dataExpt!:ExpMedicoInterface;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
