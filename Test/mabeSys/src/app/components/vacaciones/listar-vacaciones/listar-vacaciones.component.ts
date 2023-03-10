import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
@Component({
  selector: 'app-listar-vacaciones',
  templateUrl: './listar-vacaciones.component.html',
  styleUrls: ['./listar-vacaciones.component.css']
})
export class ListarVacacionesComponent {
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
    this.passw = localStorage.getItem('PASS') as string;
    this.formularioDeVacacion = this.formulario.group({      
      motivo:[''],      
    });
   }

  ngOnInit(): void {

    this.crudService.ObtenerVacacionesByUserAndPass(this.user,this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.Vacaciones=respuesta;
    });
    this.crudService.ObtenerVacacionesByUserAndPassPendientes(this.user,this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesPendientes=respuesta;
    });
    this.crudService.ObtenerVacacionesByUserAndPassNegadas(this.user,this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesNegadas=respuesta;
    });
    this.crudService.ObtenerVacacionesByUserAndPassAprobadas(this.user,this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesAprobadas=respuesta;
    });
  }  

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesPendientes, iControl);
  }

  solicitarCancelacion(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    var aux = "";
    if(!this.formularioDeVacacion.value.motivo){
      aux = "Solicitar cancelacion"
    }else{
      aux = this.formularioDeVacacion.value.motivo
    }
    this.crudService.ModificarSolicitudVacacionACancelar(id,aux,this.VacacionesPendientes, this.VacacionesAprobadas, this.VacacionesNegadas, iControl);
    
    
    
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
