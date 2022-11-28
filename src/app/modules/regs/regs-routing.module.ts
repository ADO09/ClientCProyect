import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RegistrosClientFisioComponent } from './registros-client-fisio/registros-client-fisio.component';
import { RegistrarClienteComponent } from '@modules/regs/registro-cliente/registrar-cliente.component';
import { RegistroFisioComponent } from './registro-fisio/registro-fisio.component';
import { NoAuthGuard } from '@core/guards/no-auth.guard';

const routes:Routes = [
 {
    path:'tipoReg',
    component:RegistrosClientFisioComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path:'regFisio',
    component:RegistroFisioComponent,
    canActivate:[NoAuthGuard]
  },
  {
    path:'regClient',
    component:RegistrarClienteComponent,
    canActivate:[NoAuthGuard]
  },

]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class RegsRoutingModule{}