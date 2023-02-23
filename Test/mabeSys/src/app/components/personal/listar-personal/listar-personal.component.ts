import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listar-personal',
  templateUrl: './listar-personal.component.html',
  styleUrls: ['./listar-personal.component.css']
})
export class ListarPersonalComponent implements OnInit {
  Personal: any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerPersonales().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Personal=respuesta;
    });
  }
  exportToCSV(){
    this.exportList.downloadFilePersonal(this.Personal,"Personal");
  } 
  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarPersonal(id, this.Personal, iControl);
  }

}
