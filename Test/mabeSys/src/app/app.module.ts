import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerificarCorreoComponent } from './components/verificaciones/verificar-correo/verificar-correo.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
import { RecuperarPasswordComponent } from './components/verificaciones/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresarVentaComponent } from './components/ingresar-venta/ingresar-venta.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistrarPuntoVentaComponent } from './components/registrar-punto-venta/registrar-punto-venta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
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
import { ListarVacacionesComponent } from './components/vacaciones/listar-vacaciones/listar-vacaciones.component';
import { AgregarVacacionComponent } from './components/vacaciones/agregar-vacacion/agregar-vacacion.component';
import { ListarReporteGeneralPersonalComponent } from './components/vacaciones/listar-reporte-general-personal/listar-reporte-general-personal.component';
import { DatepickerRangeTsComponent } from './components/datepicker-range/datepicker-range.ts/datepicker-range.ts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarReporteGeneralSupervisorComponent } from './components/vacaciones/listar-reporte-general-supervisor/listar-reporte-general-supervisor.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VerificarCorreoComponent,
    RegistrarUsuarioComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    LoginComponent,
    IngresarVentaComponent,
    MenuComponent,
    RegistrarPuntoVentaComponent,
    PopupComponent,
    ListarPersonalComponent,
    AgregarPersonalComponent,
    EditarPersonalComponent,
    ListarUsuariosComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    ListarCandidatosComponent,
    AgregarCandidatoComponent,
    EditarCandidatoComponent,
    ListarCargosComponent,
    AgregarCargoComponent,
    EditarCargoComponent,
    ListarCentrosCostosComponent,
    AgregarCentroCostoComponent,
    EditarCentroCostoComponent,
    ListarContratosComponent,
    AgregarContratoComponent,
    EditarContratoComponent,
    ListarExperienciasLaboralesComponent,
    AgregarExperienciaLaboralComponent,
    EditarExperienciaLaboralComponent,    
    ListarVacacionesComponent,
    AgregarVacacionComponent,
    ListarReporteGeneralPersonalComponent,
    DatepickerRangeTsComponent,
    ListarReporteGeneralSupervisorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
