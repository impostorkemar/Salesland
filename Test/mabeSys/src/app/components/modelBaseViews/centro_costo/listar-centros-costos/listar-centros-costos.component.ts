import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({  
  selector: 'app-listar-centros-costos',
  templateUrl: './listar-centros-costos.component.html',
  styleUrls: ['./listar-centros-costos.component.css']
})
export class ListarCentrosCostosComponent implements OnInit {
  Centrocostos:any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerCentrosCostos().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Centrocostos=respuesta;
    });
  }

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarCentroCosto(id, this.Centrocostos, iControl);
  }

  exportToCSV(){
    this.exportList.downloadFileCentrosCosto(this.Centrocostos,"Centro_costos");
  } 

}
