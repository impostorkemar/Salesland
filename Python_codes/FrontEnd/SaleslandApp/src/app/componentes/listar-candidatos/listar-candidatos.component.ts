import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { ExportListService } from 'src/app/servicio/export-list.service';

@Component({
  selector: 'app-listar-candidatos',
  templateUrl: './listar-candidatos.component.html',
  styleUrls: ['./listar-candidatos.component.css']
})
export class ListarCandidatosComponent implements OnInit {
  Candidatos:any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerCandidatos().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Candidatos=respuesta;
    });
  }

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarCandidato(id, this.Candidatos, iControl);
  }

  exportToCSV(){
    this.exportList.downloadFileCandidatos(this.Candidatos,"Candidatos");
  } 
}
