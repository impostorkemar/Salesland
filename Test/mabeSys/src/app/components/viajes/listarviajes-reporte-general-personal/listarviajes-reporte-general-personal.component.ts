import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listarviajes-reporte-general-personal',
  templateUrl: './listarviajes-reporte-general-personal.component.html',
  styleUrls: ['./listarviajes-reporte-general-personal.component.css']
})
export class ListarviajesReporteGeneralPersonalComponent {
  Viaje:any;  
  user!:String;
  passw!:String;
  formularioDeviaje:FormGroup;

  constructor(
    private crudService:CrudService,
    private exportList:ExportListService,
    public formulario:FormBuilder,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string
    this.formularioDeviaje = this.formulario.group({      
      motivo:[''],      
    });
   }

  ngOnInit(): void {

    this.crudService.ObtenerViajesPersonal(this.user,this.passw).subscribe(respuesta=>{
      console.log("respuestaViajes:",respuesta);
      this.Viaje=respuesta;
    });    
  }  
  
  exportToCSV(){
    this.crudService.ObtenerViajesPersonal(this.user,this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.Viaje=respuesta;
    });
    this.exportList.downloadFileSolicitudesViaje(this.Viaje,"Viajes");
  }
}
