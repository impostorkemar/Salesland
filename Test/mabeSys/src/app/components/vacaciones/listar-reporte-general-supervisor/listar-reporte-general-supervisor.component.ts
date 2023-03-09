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

    this.crudService.ObtenerVacacionesPersonal().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalPendientes().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesPendientesBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalNegadas().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesNegadasBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalAprobadas().subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesAprobadasBySupervisor=respuesta;
    });
  }  

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesBySupervisor, iControl);
  }

  AceptarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesBySupervisor, iControl);
  }

  RechazarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesBySupervisor, iControl);
  }

  exportToCSV(){
    this.exportList.downloadFileVacaciones(this.VacacionesBySupervisor,"Vacaciones");
  }

}
