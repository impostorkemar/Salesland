import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
@Component({
  selector: 'app-listar-vacaciones',
  templateUrl: './listar-vacaciones.component.html',
  styleUrls: ['./listar-vacaciones.component.css']
})
export class ListarVacacionesComponent {
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

    this.crudService.ObtenerVacacionesByUserAndPass(this.user,this.passw).subscribe(respuesta=>{
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
