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
import { AgregarPersonalComponent } from './components/agregar-personal/agregar-personal.component';
import { EditarPersonalComponent } from './components/editar-personal/editar-personal.component';
import { ListarPersonalComponent } from './components/listar-personal/listar-personal.component';
import { AgregarUsuarioComponent } from './components/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { AgregarCentroCostoComponent } from './components/agregar-centro-costo/agregar-centro-costo.component';
import { EditarCentroCostoComponent } from './components/editar-centro-costo/editar-centro-costo.component';
import { ListarCentrosCostosComponent } from './components/listar-centros-costos/listar-centros-costos.component';
import { AgregarCargoComponent } from './components/agregar-cargo/agregar-cargo.component';
import { EditarCargoComponent } from './components/editar-cargo/editar-cargo.component';
import { ListarCargosComponent } from './components/listar-cargos/listar-cargos.component';
import { AgregarContratoComponent } from './components/agregar-contrato/agregar-contrato.component';
import { EditarContratoComponent } from './components/editar-contrato/editar-contrato.component';
import { ListarContratosComponent } from './components/listar-contratos/listar-contratos.component';
import { AgregarExperienciaLaboralComponent } from './components/agregar-experiencia-laboral/agregar-experiencia-laboral.component';
import { EditarExperienciaLaboralComponent } from './components/editar-experiencia-laboral/editar-experiencia-laboral.component';
import { ListarExperienciasLaboralesComponent } from './components/listar-experiencias-laborales/listar-experiencias-laborales.component';
import { AgregarCandidatoComponent } from './components/agregar-candidato/agregar-candidato.component';
import { EditarCandidatoComponent } from './components/editar-candidato/editar-candidato.component';
import { ListarCandidatosComponent } from './components/listar-candidatos/listar-candidatos.component';
import { ConsultaComponent } from './components/consulta/consulta.component';


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
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'agregar-personal', component: AgregarPersonalComponent },
  {path: 'editar-personal/:id', component: EditarPersonalComponent },
  {path: 'editar-personal', component: EditarPersonalComponent },
  {path: 'listar-personal', component: ListarPersonalComponent },
  {path: 'agregar-usuario', component: AgregarUsuarioComponent },
  {path: 'editar-usuario/:id', component: EditarUsuarioComponent },
  {path: 'editar-usuario', component: EditarUsuarioComponent },
  {path: 'listar-usuarios', component: ListarUsuariosComponent },
  {path: 'agregar-centro-costo', component: AgregarCentroCostoComponent},
  {path: 'editar-centro-costo/:id', component: EditarCentroCostoComponent},
  {path: 'listar-centros-costos', component: ListarCentrosCostosComponent},
  {path: 'agregar-cargo', component: AgregarCargoComponent},
  {path: 'editar-cargo/:id', component: EditarCargoComponent},
  {path: 'listar-cargos', component: ListarCargosComponent},
  {path: 'agregar-contrato', component: AgregarContratoComponent},
  {path: 'editar-contrato/:id', component: EditarContratoComponent},
  {path: 'listar-contratos', component: ListarContratosComponent},
  {path: 'agregar-experiencia-laboral', component: AgregarExperienciaLaboralComponent},
  {path: 'editar-experiencia-laboral/:id', component: EditarExperienciaLaboralComponent},
  {path: 'listar-experiencias-laborales', component: ListarExperienciasLaboralesComponent},
  {path: 'agregar-candidato', component: AgregarCandidatoComponent},
  {path: 'editar-candidato/:id-:idCen-:idCed', component: EditarCandidatoComponent},
  {path: 'listar-candidatos', component: ListarCandidatosComponent},  
  {path: 'consulta', component: ConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
