import { Component } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';


@Component({
  selector: 'app-menu-rolpago',
  templateUrl: './menu-rolpago.component.html',
  styleUrls: ['./menu-rolpago.component.css']
})
export class MenuRolpagoComponent {
  cedula: any;
  nombre: any;
  apellido: any;
  cargo: any;
  inicioContrato: any;
  user!:String;
  passw!:String;
  formularioDeVacacion:FormGroup;

  constructor(
    private crudService:CrudService,
    public formulario:FormBuilder,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string
    this.formularioDeVacacion = this.formulario.group({      
      motivo:[''],      
    });
   }

   ngOnInit(): void {
    this.crudService.ObtenerDatosRolPagos().subscribe(respuesta => {
      console.log(respuesta);
      this.nombre = respuesta.nombre;
      this.cedula = respuesta.cedula;
      this.apellido = respuesta.apellido;
      this.inicioContrato = respuesta.fecha_inicio_contrato;
      this.cargo = respuesta.nombre_cargo
       })
   }



}
