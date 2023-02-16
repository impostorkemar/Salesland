import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPersonalComponent } from './componentes/agregar-personal/agregar-personal.component';
import { EditarPersonalComponent } from './componentes/editar-personal/editar-personal.component';
import { ListarPersonalComponent } from './componentes/listar-personal/listar-personal.component';
import { LoginPersonalComponent } from './componentes/login-personal/login-personal.component';
import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { AgregarCentroCostoComponent } from './componentes/agregar-centro-costo/agregar-centro-costo.component';
import { EditarCentroCostoComponent } from './componentes/editar-centro-costo/editar-centro-costo.component';
import { ListarCentrosCostosComponent} from './componentes/listar-centros-costos/listar-centros-costos.component';
import { AgregarCargoComponent } from './componentes/agregar-cargo/agregar-cargo.component';
import { EditarCargoComponent } from './componentes/editar-cargo/editar-cargo.component';
import { ListarCargosComponent } from './componentes/listar-cargos/listar-cargos.component';
import { AgregarContratoComponent} from './componentes/agregar-contrato/agregar-contrato.component';
import { EditarContratoComponent } from './componentes/editar-contrato/editar-contrato.component';
import { ListarContratosComponent } from './componentes/listar-contratos/listar-contratos.component';
import { AgregarExperienciaLaboralComponent } from './componentes/agregar-experiencia-laboral/agregar-experiencia-laboral.component';
import { EditarExperienciaLaboralComponent } from './componentes/editar-experiencia-laboral/editar-experiencia-laboral.component';
import { ListarExperienciasLaboralesComponent} from './componentes/listar-experiencias-laborales/listar-experiencias-laborales.component';
import { AgregarCandidatoComponent } from './componentes/agregar-candidato/agregar-candidato.component';
import { EditarCandidatoComponent} from './componentes/editar-candidato/editar-candidato.component';
import { ListarCandidatosComponent } from './componentes/listar-candidatos/listar-candidatos.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ConsultaComponent } from './componentes/consulta/consulta.component';



const routes: Routes = [

  {path: '',pathMatch:'full',redirectTo:'login-personal'},
  {path: 'login-personal', component: LoginPersonalComponent},
  {path: 'agregar-personal', component: AgregarPersonalComponent },
  {path: 'editar-personal/:id', component: EditarPersonalComponent },
  {path: 'editar-personal', component: EditarPersonalComponent },
  {path: 'listar-personal', component: ListarPersonalComponent },
  {path: 'login-personal', component: LoginPersonalComponent },
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
  {path: 'menu', component: MenuComponent},
  {path: 'consulta', component: ConsultaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
