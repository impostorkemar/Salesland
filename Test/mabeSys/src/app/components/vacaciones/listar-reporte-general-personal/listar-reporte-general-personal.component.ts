import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listar-reporte-general-personal',
  templateUrl: './listar-reporte-general-personal.component.html',
  styleUrls: ['./listar-reporte-general-personal.component.css']
})
export class ListarReporteGeneralPersonalComponent {
  Vacaciones:any;
  VacacionesPendientes:any;
  VacacionesNegadas:any;
  VacacionesAprobadas:any;
  user!:String;
  passw!:String;
  formularioDeVacacion:FormGroup;

  constructor(
    private crudService:CrudService,
    private exportList:ExportListService,
    public formulario:FormBuilder,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string
    this.formularioDeVacacion = this.formulario.group({      
      motivo:[''],      
    });
   }

  ngOnInit(): void {

    this.crudService.ObtenerVacacionesPersonal().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Vacaciones=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalPendientes().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesPendientes=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalNegadas().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesNegadas=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalAprobadas().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesAprobadas=respuesta;
    });
  }  

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesPendientes, iControl);
  }

  AceptarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.Vacaciones, iControl);
  }

  RechazarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.Vacaciones, iControl);
  }

  exportToCSV(){
    this.exportList.downloadFileVacaciones(this.Vacaciones,"Vacaciones");
  }
}
