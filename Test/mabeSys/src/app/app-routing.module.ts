import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/intranet/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MenuComponent } from './components/intranet/menu/menu.component';
import { HomeComponent } from './components/intranet/home/home.component';
import { InicioComponent } from './components/intranet/inicio/inicio.component';
import { EnConstruccionComponent } from './components/intranet/en-construccion/en-construccion.component';
import { SeguroComponent } from './components/seguros/seguro/seguro.component';
import { MenuInicioComponent } from './components/intranet/menu-inicio/menu-inicio.component';
import { MenuBotonesComponent } from './components/intranet/menu-botones/menu-botones.component';
import { AgregarViajeComponent } from './components/viajes/agregar-viaje/agregar-viaje.component';
import { MenuViajesComponent } from './components/viajes/menu-viajes/menu-viajes.component';3
import { AgregarRolpagoComponent } from './components/rol-pagos/agregar-rolpago/agregar-rolpago.component';
import { MenuRolpagoComponent } from './components/rol-pagos/menu-rolpago/menu-rolpago.component';
import { PoliticsComponent } from './components/intranet/politics/politics.component';
import { PublicidadFooterComponent } from './components/intranet/publicidad-footer/publicidad-footer.component';
import { ListarAdminComponent } from './components/vacaciones/listar-admin/listar-admin.component';
import { AppModule } from './app.module';
import { Publicidad1Component } from './components/intranet/publicidad1/publicidad1.component';
import { Publicidad2Component } from './components/intranet/publicidad2/publicidad2.component';
import { Publicidad3Component } from './components/intranet/publicidad3/publicidad3.component';
import { Publicidad4Component } from './components/intranet/publicidad4/publicidad4.component';
import { Publicidad5Component } from './components/intranet/publicidad5/publicidad5.component';
import { Publicidad6Component } from './components/intranet/publicidad6/publicidad6.component';
import { ReglamentoInternoComponent } from './components/intranet/reglamento-interno/reglamento-interno.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},  
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'inicio', component: InicioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'inicio', component: InicioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'menuBotones', component: MenuBotonesComponent,
  canActivate: [AuthGuard],
  data: {
    role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
  }
},
  {path: 'menuInicio', component: MenuInicioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'menu', component: MenuComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'seguros', component: SeguroComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },  
  {path: 'enContruccion', component: EnConstruccionComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'agregarViaje', component: AgregarViajeComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'menuViaje', component: MenuViajesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'agregarRolPago', component: AgregarRolpagoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'menuRolPago', component: MenuRolpagoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'politics', component: PoliticsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'publicidad1', component: Publicidad1Component,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'publicidad2', component: Publicidad2Component,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'publicidad3', component: Publicidad3Component,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'publicidad4', component: Publicidad4Component,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'publicidad5', component: Publicidad5Component,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'publicidad6', component: Publicidad6Component,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'reglamentointerno', component: ReglamentoInternoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },
  {path: 'politics', component: PoliticsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_USER' ,'ROLE_SUPERVISOR','ROLE_SUP_SUPERVISOR' ]
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
