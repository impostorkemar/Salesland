import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresarVentaComponent } from './components/ingresar-venta/ingresar-venta.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/verificaciones/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificaciones/verificar-correo/verificar-correo.component';
import { AuthGuard } from './services/auth.guard';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrarPuntoVentaComponent } from './components/registrar-punto-venta/registrar-punto-venta.component';
import { ListarPersonalComponent } from './components/personal/listar-personal/listar-personal.component';
import { AgregarPersonalComponent } from './components/personal/agregar-personal/agregar-personal.component';
import { EditarPersonalComponent } from './components/personal/editar-personal/editar-personal.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { AgregarUsuarioComponent } from './components/usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/usuario/editar-usuario/editar-usuario.component';
import { ListarCandidatosComponent } from './components/candidato/listar-candidatos/listar-candidatos.component';
import { AgregarCandidatoComponent} from './components/candidato/agregar-candidato/agregar-candidato.component';
import { EditarCandidatoComponent } from './components/candidato/editar-candidato/editar-candidato.component';
import { ListarCargosComponent } from './components/cargo/listar-cargos/listar-cargos.component';
import { AgregarCargoComponent } from './components/cargo/agregar-cargo/agregar-cargo.component';
import { EditarCargoComponent } from './components/cargo/editar-cargo/editar-cargo.component';
import { ListarCentrosCostosComponent } from './components/centro_costo/listar-centros-costos/listar-centros-costos.component';
import { AgregarCentroCostoComponent } from './components/centro_costo/agregar-centro-costo/agregar-centro-costo.component';
import { EditarCentroCostoComponent } from './components/centro_costo/editar-centro-costo/editar-centro-costo.component';
import { ListarContratosComponent } from './components/contrato/listar-contratos/listar-contratos.component';
import { AgregarContratoComponent } from './components/contrato/agregar-contrato/agregar-contrato.component';
import { EditarContratoComponent } from './components/contrato/editar-contrato/editar-contrato.component';
import { ListarExperienciasLaboralesComponent } from './components/experiencias_laborales/listar-experiencias-laborales/listar-experiencias-laborales.component';
import { AgregarExperienciaLaboralComponent } from './components/experiencias_laborales/agregar-experiencia-laboral/agregar-experiencia-laboral.component';
import { EditarExperienciaLaboralComponent } from './components/experiencias_laborales/editar-experiencia-laboral/editar-experiencia-laboral.component';


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
  {path: 'listar-personal', component: ListarPersonalComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_SUPERVISOR']
    }
  },
  {path: 'agregar-personal', component: AgregarPersonalComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_SUPERVISOR']
    }
  },
  {path: 'editar-personal', component: EditarPersonalComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_SUPERVISOR']
    }
  },
  {path: 'editar-personal/:id', component: EditarPersonalComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_SUPERVISOR']
    }
  },
  {path: 'listar-usuarios', component: ListarUsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'agregar-usuario', component: AgregarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-usuario', component: EditarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-usuario/:id', component: EditarUsuarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'listar-candidatos', component: ListarCandidatosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'agregar-candidato', component: AgregarCandidatoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-candidato', component: EditarCandidatoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-candidato/:id', component: EditarCandidatoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'listar-cargos', component: ListarCargosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'agregar-cargo', component: AgregarCargoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-cargo', component: EditarCargoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-cargo/:id', component: EditarCargoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'listar-centros-costos', component: ListarCentrosCostosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'agregar-centro-costo', component: AgregarCentroCostoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-centro-costo', component: EditarCentroCostoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-centro-costo/:id', component: EditarCentroCostoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'listar-centros-costos', component: ListarContratosComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'agregar-contrato', component: AgregarContratoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-contrato', component: EditarContratoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-contrato/:id', component: EditarContratoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'listar-experiencias-laborales', component: ListarExperienciasLaboralesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'agregar-experiencia-laboral', component: AgregarExperienciaLaboralComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-experiencia-laboral', component: EditarExperienciaLaboralComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {path: 'editar-experiencia-laboral/:id', component: EditarExperienciaLaboralComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
