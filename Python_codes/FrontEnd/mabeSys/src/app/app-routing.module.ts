import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IngresarVentaComponent } from './components/ingresar-venta/ingresar-venta.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'ingresar_venta', component: IngresarVentaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent},
  {path: 'recuperar-password', component: RecuperarPasswordComponent},
  {path: 'verificar-correo', component: VerificarCorreoComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
