import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Solicitudes } from '../../model/Solicitudes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-listar-reporte-general-supervisor',
  templateUrl: './listar-reporte-general-supervisor.component.html',
  styleUrls: ['./listar-reporte-general-supervisor.component.css'],
})
export class ListarReporteGeneralSupervisorComponent {
  VacacionesBySupervisor:any;
  VacacionesPendientesBySupervisor:any;
  VacacionesNegadasBySupervisor:any;
  VacacionesAprobadasBySupervisor!:any;
  user!:String;
  passw!:String;
  formularioDeVacacion:FormGroup;  
  consults:any;
  displayedColumns: string[] = ['id_vacaciones','nombre','apellido','fecha_solicitud','fecha_inicio_vacaciones',
  'fecha_fin_vacaciones','fecha_respuesta','dias_lab_solicitados','dias_disponibles_acum','status','peticion',
  'observaciones'];
  datosA: Solicitudes[] = [];
  dataSourceA:any;
  
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService,
    public formulario:FormBuilder,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string
    this.formularioDeVacacion = this.formulario.group({      
      motivo:[''],
    });    
   } 

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; 
  @ViewChild('solicApr') solicApr = new MatSort();

  SortInfo() {
    this.dataSourceA.sort = this.solicApr;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceA.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  ngOnInit(): void {
    this.crudService.ObtenerVacacionesPersonalBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalPendientesBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesPendientesBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalNegadasBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesNegadasBySupervisor=respuesta;
    });
    this.crudService.ObtenerVacacionesPersonalAprobadasBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.VacacionesAprobadasBySupervisor=respuesta;
      this.datosA=respuesta;
      this.dataSourceA = new MatTableDataSource<Solicitudes>(this.datosA);
      this.dataSourceA.paginator = this.paginator;
      console.log("dataSource:",this.dataSourceA);
      console.log("dataSource.paginator:",  this.dataSourceA.paginator);
      this.SortInfo();
    });
    //this.loadVacacionesPersonalAprobadasBySupervisor({active: 'id_vacaciones', direction  : 'asc'})
  }  



  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id, this.VacacionesPendientesBySupervisor, iControl);
  }

  AceptarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    var aux = "";
    if(!this.formularioDeVacacion.value.motivo){
      aux = "Sin observaciones"
    }else{
      aux = this.formularioDeVacacion.value.motivo
    }
    this.crudService.AceptarSolicitudVacacion(id,aux,this.VacacionesPendientesBySupervisor, this.VacacionesAprobadasBySupervisor
      , this.VacacionesNegadasBySupervisor, iControl)
    
  }

  RechazarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    var aux = "";
    if(!this.formularioDeVacacion.value.motivo){
      aux = "Sin observaciones"
    }else{
      aux = this.formularioDeVacacion.value.motivo
    }
    this.crudService.RechazarSolicitudVacacion(id,aux,this.VacacionesPendientesBySupervisor, this.VacacionesAprobadasBySupervisor
      , this.VacacionesNegadasBySupervisor, iControl)
  }

  exportToCSV(){
    this.exportList.downloadFileSolicitudesVacaciones(this.VacacionesBySupervisor,"Vacaciones");
  }
  

  /*loadVacacionesPersonalAprobadasBySupervisor(sort: Sort): void{
    this.crudService.ObtenerVacacionesPersonalAprobadasBySupervisorSort(this.user, this.passw, sort).subscribe((respuesta)=>{
      //console.log(respuesta);
      this.VacacionesAprobadasBySupervisor = respuesta
    });
  }

  sortInfo(sort: Sort):void{
    this.loadVacacionesPersonalAprobadasBySupervisor(sort);
  }*/

}

