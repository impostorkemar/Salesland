import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { ExportListService } from 'src/app/servicio/export-list.service';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  Usuarios:any;
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService
  ) { }

  ngOnInit(): void {
    this.crudService.ObtenerUsuarios().subscribe(respuesta=>{
      //console.log(respuesta);
      this.Usuarios=respuesta;
    });

  }
  borrarRegistro(id:any,iControl:any){
    console.log(id);
    console.log(iControl);
    this.crudService.BorrarUsuario(id, this.Usuarios, iControl);
  }
  exportToCSV(){
    this.exportList.downloadFileUsuarios(this.Usuarios,"Usuarios");
  }
  


}
