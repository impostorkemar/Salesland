import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { ExportListService } from 'src/app/servicio/export-list.service';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})
export class ListarCargosComponent implements OnInit {
  Cargos:any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerCargos().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Cargos=respuesta;
    });
  }

  exportToCSV(){
    this.exportList.downloadFileCargos(this.Cargos,"Cargos");
  } 

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarCargo(id, this.Cargos, iControl);
  }
}
