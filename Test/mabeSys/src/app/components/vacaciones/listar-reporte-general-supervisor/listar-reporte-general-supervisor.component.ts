import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

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
    }else{
      aux = this.formularioDeVacacion.value.motivo
    }
    this.crudService.AceptarSolicitudVacacion(id,aux,this.VacacionesPendientesBySupervisor, this.VacacionesAprobadasBySupervisor
      , this.VacacionesNegadasBySupervisor, iControl); 
  }

  RechazarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    var aux = "";
    if(!this.formularioDeVacacion.value.motivo){
      aux = "Sin observaciones"
    }else{
      aux = this.formularioDeVacacion.value.motivo
    }
    this.crudService.RechazarSolicitudVacacion(id,aux,this.VacacionesPendientesBySupervisor, this.VacacionesAprobadasBySupervisor
      , this.VacacionesNegadasBySupervisor, iControl);
  }

  exportToCSV(){
    this.exportList.downloadFileVacaciones(this.VacacionesBySupervisor,"Vacaciones");
  }

}
