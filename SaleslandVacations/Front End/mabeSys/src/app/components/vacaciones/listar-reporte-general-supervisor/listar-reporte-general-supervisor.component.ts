import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-listar-reporte-general-supervisor',
  templateUrl: './listar-reporte-general-supervisor.component.html',
  styleUrls: ['./listar-reporte-general-supervisor.component.css']
})
export class ListarReporteGeneralSupervisorComponent {
  VacacionesBySupervisor:any;
  VacacionesPendientesBySupervisor:any;
  VacacionesNegadasBySupervisor:any;
  VacacionesAprobadasBySupervisor:any;
  user!:String;
  passw!:String;
  formularioDeVacacion:FormGroup;
  pP: number = 1;
  pA: number = 1;
  pN: number = 1;
  totalP: number = 0;
  totalA: number = 0;
  totalN: number = 0;
  consults:any;
  
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

    this.crudService.ObtenerVacacionesPersonalBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalPendientesBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesPendientesBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalNegadasBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesNegadasBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalAprobadasBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesAprobadasBySupervisor=respuesta;
    });
  }  

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesPendientesBySupervisor, iControl);
  }

  AceptarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    var aux = "";
    if(!this.formularioDeVacacion.value.motivo){
      aux = "Sin observaciones"
      window.confirm("Rellene motivo")
    }else{
      aux = this.formularioDeVacacion.value.motivo
      this.crudService.AceptarSolicitudVacacion(id,aux,this.VacacionesPendientesBySupervisor, this.VacacionesAprobadasBySupervisor
        , this.VacacionesNegadasBySupervisor, iControl)
    }
    
    
  }

  RechazarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    var aux = "";
    if(!this.formularioDeVacacion.value.motivo){
      aux = "Sin observaciones"
      window.confirm("Rellene motivo")
    }else{
      aux = this.formularioDeVacacion.value.motivo
      this.crudService.RechazarSolicitudVacacion(id,aux,this.VacacionesPendientesBySupervisor, this.VacacionesAprobadasBySupervisor
        , this.VacacionesNegadasBySupervisor, iControl)
    }
    
  }

  exportToCSV(){
    this.exportList.downloadFileSolicitudesVacaciones(this.VacacionesBySupervisor,"Vacaciones");
  }
  getDataPendientes(){
    this.crudService.ObtenerVacacionesPersonalPendientesBySupervisor(this.user, this.passw).subscribe((respuesta:any) =>{
      //console.log(respuesta);
      this.VacacionesPendientesBySupervisor=respuesta;
      this.consults = respuesta.data;
      this.totalP = respuesta.total;
      
    });   
  }

  getDataNegadas(){
    this.crudService.ObtenerVacacionesPersonalNegadasBySupervisor(this.user, this.passw).subscribe((respuesta:any) =>{
      //console.log(respuesta);
      this.VacacionesNegadasBySupervisor=respuesta;
      this.consults = respuesta.data;
      this.totalN = respuesta.total;
    });
  }

  getDataAprobadas(){
    this.crudService.ObtenerVacacionesPersonalAprobadasBySupervisor(this.user, this.passw).subscribe((respuesta:any) =>{
      //console.log(respuesta);
      this.VacacionesAprobadasBySupervisor=respuesta;
      this.consults = respuesta.data;
      this.totalA = respuesta.total;
    });    
  }

  pageChangeEventPendientes(event: number){
    this.pP = event;
    this.getDataPendientes();
  }

  pageChangeEventNegadas(event: number){
    this.pN = event;
    this.getDataNegadas();
  }

  pageChangeEventAprobadas(event: number){
    this.pA = event;
    this.getDataAprobadas();
  }

}
