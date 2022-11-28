import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INTERNAL_ROUTES } from '@data/constants/routes';

@Component({
  selector: 'app-registros-client-fisio',
  templateUrl: './registros-client-fisio.component.html',
  styleUrls: ['./registros-client-fisio.component.css']
})
export class RegistrosClientFisioComponent implements OnInit {

  regFisio = INTERNAL_ROUTES.MODULO_REGFISIO;
  regClient = INTERNAL_ROUTES.MODULO_REGCLIENT;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }




}
