import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IngresarVentaComponent } from './components/ingresar-venta/ingresar-venta.component';
import { AccesRoutesDirective } from './directives/acces-routes.directive';

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
    AccesRoutesDirective    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
