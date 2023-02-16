import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresarVentaComponent } from './components/ingresar-venta/ingresar-venta.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { AuthGuard } from './services/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrarPuntoVentaComponent } from './components/registrar-punto-venta/registrar-punto-venta.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},  
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'ingresar-venta', component: IngresarVentaComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'registrar-puntoVenta', component: RegistrarPuntoVentaComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'recuperar-password', component: RecuperarPasswordComponent,
  canActivate: [AuthGuard],
  data: {
    role: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
  }
  },
  {path: 'verificar-correo', component: VerificarCorreoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
