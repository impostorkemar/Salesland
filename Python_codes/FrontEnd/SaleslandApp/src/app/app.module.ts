import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//httpClientModule
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { AgregarPersonalComponent } from './componentes/agregar-personal/agregar-personal.component';
import { EditarPersonalComponent } from './componentes/editar-personal/editar-personal.component';
import { ListarPersonalComponent } from './componentes/listar-personal/listar-personal.component';
import { LoginPersonalComponent } from './componentes/login-personal/login-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { AgregarUsuarioComponent } from './componentes/agregar-usuario/agregar-usuario.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { AgregarCentroCostoComponent } from './componentes/agregar-centro-costo/agregar-centro-costo.component';
import { EditarCentroCostoComponent } from './componentes/editar-centro-costo/editar-centro-costo.component';
import { ListarCentrosCostosComponent } from './componentes/listar-centros-costos/listar-centros-costos.component';
import { AgregarContratoComponent } from './componentes/agregar-contrato/agregar-contrato.component';
import { EditarContratoComponent } from './componentes/editar-contrato/editar-contrato.component';
import { ListarContratosComponent } from './componentes/listar-contratos/listar-contratos.component';
import { AgregarCargoComponent } from './componentes/agregar-cargo/agregar-cargo.component';
import { EditarCargoComponent } from './componentes/editar-cargo/editar-cargo.component';
import { ListarCargosComponent } from './componentes/listar-cargos/listar-cargos.component';
import { AgregarExperienciaLaboralComponent } from './componentes/agregar-experiencia-laboral/agregar-experiencia-laboral.component';
import { EditarExperienciaLaboralComponent } from './componentes/editar-experiencia-laboral/editar-experiencia-laboral.component';
import { ListarExperienciasLaboralesComponent } from './componentes/listar-experiencias-laborales/listar-experiencias-laborales.component';
import { AgregarCandidatoComponent } from './componentes/agregar-candidato/agregar-candidato.component';
import { EditarCandidatoComponent } from './componentes/editar-candidato/editar-candidato.component';
import { ListarCandidatosComponent } from './componentes/listar-candidatos/listar-candidatos.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ConsultaComponent } from './componentes/consulta/consulta.component';


@NgModule({
  declarations: [
    AppComponent,
    AgregarPersonalComponent,
    EditarPersonalComponent,
    ListarPersonalComponent,
    LoginPersonalComponent,    
    EditarUsuarioComponent, 
    AgregarUsuarioComponent,
    ListarUsuariosComponent,
    AgregarCentroCostoComponent,
    EditarCentroCostoComponent,
    ListarCentrosCostosComponent,
    AgregarContratoComponent,
    EditarContratoComponent,
    ListarContratosComponent,
    AgregarCargoComponent,
    EditarCargoComponent,
    ListarCargosComponent,
    AgregarExperienciaLaboralComponent,
    EditarExperienciaLaboralComponent,
    ListarExperienciasLaboralesComponent,
    AgregarCandidatoComponent,
    EditarCandidatoComponent,
    ListarCandidatosComponent,
    MenuComponent,
    ConsultaComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
