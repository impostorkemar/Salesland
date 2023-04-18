import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listar-contratos',
  templateUrl: './listar-contratos.component.html',
  styleUrls: ['./listar-contratos.component.css']
})
export class ListarContratosComponent implements OnInit {
  Contratos:any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerContratos().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Contratos=respuesta;
    });
  }

  exportToCSV(){
    this.exportList.downloadFileContratos(this.Contratos,"Contratos");
  } 

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarContrato(id, this.Contratos, iControl);
  }
}
