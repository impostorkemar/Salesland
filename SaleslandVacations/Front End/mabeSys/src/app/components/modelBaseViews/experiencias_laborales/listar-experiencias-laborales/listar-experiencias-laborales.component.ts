import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listar-experiencias-laborales',
  templateUrl: './listar-experiencias-laborales.component.html',
  styleUrls: ['./listar-experiencias-laborales.component.css']
})
export class ListarExperienciasLaboralesComponent implements OnInit {
  ExperienciasLaborales: any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerExperienciasLaborales().subscribe(respuesta=>{
      //console.log(respuesta);
      this.ExperienciasLaborales=respuesta;
    });
  }

  exportToCSV(){
    this.exportList.downloadFileExperienciasLaborales(this.ExperienciasLaborales,"Experiencias_Laborales");
  }
  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarExperienciaLaboral(id, this.ExperienciasLaborales, iControl);
  }

}
