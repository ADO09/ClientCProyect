import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RegistrosClientFisioComponent } from './registros-client-fisio/registros-client-fisio.component';
import { RegistrarClienteComponent } from '@modules/regs/registro-cliente/registrar-cliente.component';
import { RegistroFisioComponent } from './registro-fisio/registro-fisio.component';
import { RegsRoutingModule } from './regs-routing.module';


@NgModule({
  declarations: [
    RegistrosClientFisioComponent,
    RegistrarClienteComponent,
    RegistroFisioComponent,
  
  ],
  imports: [
    SharedModule,
    RegsRoutingModule,
    CommonModule
  ]
})
export class RegsModule { }
