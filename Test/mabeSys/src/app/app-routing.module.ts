import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { EnConstruccionComponent } from './components/en-construccion/en-construccion.component';
import { SeguroComponent } from './components/seguro/seguro.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { MenuInicioComponent } from './components/menu-inicio/menu-inicio.component';
import { MenuBotonesComponent } from './components/menu-botones/menu-botones.component';

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
  {path: 'viajes', component: ViajesComponent,
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
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
