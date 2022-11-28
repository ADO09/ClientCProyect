import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRutingModule } from './user-routing.module';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { FisiosListComponent } from './fisios-list/fisios-list.component';
// import { RegistrarClienteComponent } from '../regs/registro-cliente/registrar-cliente.component';
// import { RegistroFisioComponent } from './registro-fisio/registro-fisio.component';
import { UserFProfileComponent } from './user-fprofile/user-fprofile.component';
import { FisioCitasPendientesListPrincFisioComponent } from './fisio-citas-pendientes-list-princ-fisio/fisio-citas-pendientes-list-princ-fisio.component';
import { UserCprofileComponent } from './user-cprofile/user-cprofile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CitasHistorialComponent } from './citas-historial/citas-historial.component';
import { ConfPaginaComponent } from './conf-pagina/conf-pagina.component';
import { RegistrarSolicitudCitaComponent } from '@modules/regs/registrar-solicitud-cita/registrar-solicitud-cita.component';
import { FisiosFavsClientComponent } from './fisios-favs-client/fisios-favs-client.component';
import { FisioPlanesListComponent } from './fisio-planes-list/fisio-planes-list.component';
import { ExpMedicoClienteComponent } from './exp-medico-cliente/exp-medico-cliente.component';
import { ConfiguracionPacienteComponent } from './configuracion-paciente/configuracion-paciente.component';
import { GestionFisioComponent } from '@modules/admin/gestion-fisio/gestion-fisio.component';

import { GestionPacienteComponent } from '@modules/admin/gestion-paciente/gestion-paciente.component';
import { ConfiguracionFisioComponent } from './configuracion-fisio/configuracion-fisio.component';
import { BalanceGListComponent } from './balance-glist/balance-glist.component';


@NgModule({
  declarations: [
    FisiosListComponent,
    ClientesListComponent,
    UserFProfileComponent,
    FisioCitasPendientesListPrincFisioComponent,
    UserCprofileComponent,
    CitasHistorialComponent,
    ConfPaginaComponent,
    RegistrarSolicitudCitaComponent,
    FisiosFavsClientComponent,
    FisioPlanesListComponent,
    ExpMedicoClienteComponent,
    ConfiguracionPacienteComponent,
    GestionFisioComponent,
     GestionPacienteComponent,
     ConfiguracionFisioComponent,
     BalanceGListComponent
  
  ],
  imports: [
   
    SharedModule,
    UserRutingModule,
    Ng2SearchPipeModule,

    
  ],
  exports:[
   
  ]
})
export class UserModule { }
