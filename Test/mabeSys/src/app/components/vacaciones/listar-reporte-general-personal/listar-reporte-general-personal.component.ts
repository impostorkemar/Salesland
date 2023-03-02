import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listar-reporte-general-personal',
  templateUrl: './listar-reporte-general-personal.component.html',
  styleUrls: ['./listar-reporte-general-personal.component.css']
})
export class ListarReporteGeneralPersonalComponent {
  Vacaciones:any;
  user!:String;
  passw!:String;

  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string
   }

  ngOnInit(): void {

    this.crudService.ObtenerVacacionesPersonal().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Vacaciones=respuesta;
    });
  }  

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.Vacaciones, iControl);
  }

  exportToCSV(){
    this.exportList.downloadFileVacaciones(this.Vacaciones,"Vacaciones");
  }
}
