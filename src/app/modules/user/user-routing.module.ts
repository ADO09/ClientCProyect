import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { FisiosListComponent } from './fisios-list/fisios-list.component';
import { UserFProfileComponent } from './user-fprofile/user-fprofile.component';
import { FisioCitasPendientesListPrincFisioComponent } from './fisio-citas-pendientes-list-princ-fisio/fisio-citas-pendientes-list-princ-fisio.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { UserCprofileComponent } from './user-cprofile/user-cprofile.component';
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

const routes: Routes = [

  {
    path:'pagPrincipalp',
    component:FisiosListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'pagPrincipalf',
    component:FisioCitasPendientesListPrincFisioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'listClient',
    component:ClientesListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'perfilUserf/:id_fisio',
    component:UserFProfileComponent,
    canActivate:[AuthGuard]
  }
  ,{
    path:'perfilUserC/:id_cliente',
    component:UserCprofileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'historialCitas',
    component:CitasHistorialComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'confPagina',
    component:ConfPaginaComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'regSolcCita/:id_fisio',
    component:RegistrarSolicitudCitaComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'favoritos',
    component:FisiosFavsClientComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'planes',
    component:FisioPlanesListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'expMedicoCliente/:id_cliente',
    component:ExpMedicoClienteComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'ConfigCliente/:id_cliente',
    component:ConfiguracionPacienteComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'Configfisio/:id_fisio',
    component:ConfiguracionFisioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'gestionPacientes',
    component:GestionPacienteComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'gestionFisios',
    component:GestionFisioComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'BalanceGList',
    component:BalanceGListComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRutingModule { }
