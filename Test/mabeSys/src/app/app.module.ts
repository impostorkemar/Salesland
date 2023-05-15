import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSortModule} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Components
import { DashboardComponent } from './components/ventasMABE/dashboard/dashboard.component';
import { VerificarCorreoComponent } from './components/verificaciones/verificar-correo/verificar-correo.component';
import { RegistrarUsuarioComponent } from './components/modelBaseViews/usuario/registrar-usuario/registrar-usuario.component';
import { RecuperarPasswordComponent } from './components/verificaciones/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './components/intranet/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresarVentaComponent } from './components/ventasMABE/ingresar-venta/ingresar-venta.component';
import { MenuComponent } from './components/intranet/menu/menu.component';
import { RegistrarPuntoVentaComponent } from './components/ventasMABE/registrar-punto-venta/registrar-punto-venta.component';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListarPersonalComponent } from './components/modelBaseViews/personal/listar-personal/listar-personal.component';
import { AgregarPersonalComponent } from './components/modelBaseViews/personal/agregar-personal/agregar-personal.component';
import { EditarPersonalComponent } from './components/modelBaseViews/personal/editar-personal/editar-personal.component';
import { ListarUsuariosComponent } from './components/modelBaseViews/usuario/listar-usuarios/listar-usuarios.component';
import { AgregarUsuarioComponent } from './components/modelBaseViews/usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './components/modelBaseViews/usuario/editar-usuario/editar-usuario.component';
import { ListarCandidatosComponent } from './components/modelBaseViews/candidato/listar-candidatos/listar-candidatos.component';
import { AgregarCandidatoComponent } from './components/modelBaseViews/candidato/agregar-candidato/agregar-candidato.component';
import { EditarCandidatoComponent } from './components/modelBaseViews/candidato/editar-candidato/editar-candidato.component';
import { ListarCargosComponent } from './components/modelBaseViews/cargo/listar-cargos/listar-cargos.component';
import { AgregarCargoComponent } from './components/modelBaseViews/cargo/agregar-cargo/agregar-cargo.component';
import { EditarCargoComponent } from './components/modelBaseViews/cargo/editar-cargo/editar-cargo.component';
import { ListarCentrosCostosComponent } from './components/modelBaseViews/centro_costo/listar-centros-costos/listar-centros-costos.component';
import { AgregarCentroCostoComponent } from './components/modelBaseViews/centro_costo/agregar-centro-costo/agregar-centro-costo.component';
import { EditarCentroCostoComponent } from './components/modelBaseViews/centro_costo/editar-centro-costo/editar-centro-costo.component';
import { ListarContratosComponent } from './components/modelBaseViews/contrato/listar-contratos/listar-contratos.component';
import { AgregarContratoComponent } from './components/modelBaseViews/contrato/agregar-contrato/agregar-contrato.component';
import { EditarContratoComponent } from './components/modelBaseViews/contrato/editar-contrato/editar-contrato.component';
import { ListarExperienciasLaboralesComponent } from './components/modelBaseViews/experiencias_laborales/listar-experiencias-laborales/listar-experiencias-laborales.component';
import { AgregarExperienciaLaboralComponent } from './components/modelBaseViews/experiencias_laborales/agregar-experiencia-laboral/agregar-experiencia-laboral.component';
import { EditarExperienciaLaboralComponent } from './components/modelBaseViews/experiencias_laborales/editar-experiencia-laboral/editar-experiencia-laboral.component';
import { ListarVacacionesComponent } from './components/vacaciones/listar-vacaciones/listar-vacaciones.component';
import { AgregarVacacionComponent } from './components/vacaciones/agregar-vacacion/agregar-vacacion.component';
import { ListarReporteGeneralPersonalComponent } from './components/vacaciones/listar-reporte-general-personal/listar-reporte-general-personal.component';
import { DatepickerRangeTsComponent } from './components/calendar/datepicker-range/datepicker-range.ts/datepicker-range.ts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListarReporteGeneralSupervisorComponent } from './components/vacaciones/listar-reporte-general-supervisor/listar-reporte-general-supervisor.component';
import { ReporteGeneralComponent } from './components/vacaciones/reporte-estadistico/reporte-general/reporte-general.component';
import { HomeComponent } from './components/intranet/home/home.component';
import { InicioComponent } from './components/intranet/inicio/inicio.component';
import { SeguroComponent } from './components/seguros/seguro/seguro.component';
import { EnConstruccionComponent } from './components/intranet/en-construccion/en-construccion.component';
import { MenuInicioComponent } from './components/intranet/menu-inicio/menu-inicio.component';
import { MenuBotonesComponent } from './components/intranet/menu-botones/menu-botones.component';
import { AgregarViajeComponent } from './components/viajes/agregar-viaje/agregar-viaje.component';
import { MenuViajesComponent } from './components/viajes/menu-viajes/menu-viajes.component';
import { MenuRolpagoComponent } from './components/rol-pagos/menu-rolpago/menu-rolpago.component';
import { AgregarRolpagoComponent } from './components/rol-pagos/agregar-rolpago/agregar-rolpago.component';
import { ListarviajesReporteGeneralPersonalComponent } from './components/viajes/listarviajes-reporte-general-personal/listarviajes-reporte-general-personal.component';
import { FormsModule } from '@angular/forms';
import { PoliticsComponent } from './components/intranet/politics/politics.component';


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
    ReporteGeneralComponent,
    HomeComponent,
    InicioComponent,
    SeguroComponent,    
    EnConstruccionComponent,
    MenuInicioComponent,
    MenuBotonesComponent,
    AgregarViajeComponent,
    MenuViajesComponent,
    MenuRolpagoComponent,
    AgregarRolpagoComponent,
    ListarviajesReporteGeneralPersonalComponent,
    PoliticsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,
    NgxPaginationModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
