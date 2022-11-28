import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';

// import { RegistrosClientFisioComponent } from '@modules/user/registros-client-fisio/registros-client-fisio.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m)=>m.AuthModule)
  },
  {
    path: 'registros',
    loadChildren: () =>
      import('@modules/regs/regs.module').then((m)=>m.RegsModule)
  },
  {
    path: 'panel',
    component: SkeletonComponent,
    children: [
      {
        path: 'userauth',
        loadChildren: () =>
          import('@modules/user/user.module').then((m) => m.UserModule)
      },
      {
        path: '**',
        redirectTo: 'panel/auth/login',
        pathMatch: 'full'
      },
    

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
