import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
import {MatSort, Sort} from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-reporte-general-supervisor',
  templateUrl: './listar-reporte-general-supervisor.component.html',
  styleUrls: ['./listar-reporte-general-supervisor.component.css']
})
export class ListarReporteGeneralSupervisorComponent {
  
  VacacionesPendientesBySupervisor:any;
  VacacionesNegadasBySupervisor:any;
  VacacionesAprobadasBySupervisor:any;
  user!:String;
  passw!:String;
  formularioDeVacacion:FormGroup;
  pP: number = 1;
  pA: number = 1;
  pN: number = 1;
  totalP: number = 0;
  totalA: number = 0;
  totalN: number = 0;
  consults:any;

  VacacionesBySupervisor: any[] = [];
  pagedVacaciones: any[] = [];
  currentPage = 1;
  pageSize = 5; // Number of rows per page
  totalPages = 0;
  pages: number[] = [];
  searchKeyword: string = '';
  btnRechazar: boolean = false;
  btnAceptar: boolean = false;

  
  constructor(
    private crudService:CrudService,
    private exportList:ExportListService,
    public formulario:FormBuilder,
    private router:Router,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string
    this.formularioDeVacacion = this.formulario.group({      
      motivo:[''],
      searchKeyword:[''],
    });
   }

  ngOnInit(): void {    
    this.getVacaciones();
  }
  
  getVacaciones(): void {
    this.crudService.ObtenerVacacionesPersonalBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      console.log(respuesta);
      this.VacacionesBySupervisor = respuesta; // Actualiza el array con la propiedad correspondiente
  
      // Filtrar los datos según la búsqueda
      this.filterVacaciones();

      // Verificar si se debe mostrar los botones de "Aceptar" y "Rechazar"
      this.btnRechazar = this.VacacionesBySupervisor.some(row => row.status === 'pendiente');
      this.btnAceptar = this.VacacionesBySupervisor.some(row => row.status === 'pendiente');
  
      this.totalPages = Math.ceil(this.VacacionesBySupervisor.length / this.pageSize);
      this.changePage(1);
    });
  }

  filterVacaciones(): void {
    console.log("Entre vacaciones");
    const searchKeyword = this.formularioDeVacacion.get('searchKeyword')?.value;
  
    if (searchKeyword.trim() !== '') {
      this.VacacionesBySupervisor = this.VacacionesBySupervisor.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    } else {
      //this.getVacaciones();
      this.precargaVacaciones()
      return;
    }
  
    // Verificar si no se encontraron resultados
    if (this.VacacionesBySupervisor.length === 0) {
      this.pagedVacaciones = [];
      this.totalPages = 0;
      this.currentPage = 1;
      this.pages = [];
      return;
    }
  
    console.log("Vacaciones:", this.VacacionesBySupervisor);
  }

  precargaVacaciones(){
    this.crudService.ObtenerVacacionesPersonalBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      console.log(respuesta);
      this.VacacionesBySupervisor = respuesta; // Actualiza el array con la propiedad correspondiente
      this.totalPages = Math.ceil(this.VacacionesBySupervisor.length / this.pageSize);
      this.changePage(1);
    });
  }
  
  
  searchVacaciones(): void {
    this.filterVacaciones();
    this.totalPages = Math.ceil(this.VacacionesBySupervisor.length / this.pageSize);
    this.changePage(1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.pagedVacaciones = this.VacacionesBySupervisor.slice(
      (page - 1) * this.pageSize,
      page * this.pageSize
    );
    this.updatePages();
  }

  updatePages(): void {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);

    this.pages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  sort(prop: string): void {
    // Implement sorting logic based on the property 'prop'
    // You can use Array.sort() or a custom sorting function
    this.VacacionesBySupervisor.sort((a, b) => {
      if (a[prop] < b[prop]) {
        return -1;
      } else if (a[prop] > b[prop]) {
        return 1;
      } else {
        return 0;
      }
    });
  
    this.changePage(this.currentPage);
  }

  borrarRegistro(id:any,iControl:any){
    //console.log(id);
    //console.log(iControl);
    this.crudService.BorrarVacacion(id);
  }

  AceptarRegistro(id:any,iControl:any){
    //console.log(id);    
    var aux = "";
    aux = "Aprobado"
    this.crudService.AceptarSolicitudVacacionBySupervisor(id).subscribe(respuesta=>{
      console.log("respuesta: ",respuesta)
      this.reloadMenuComponent(); 
      this.getVacaciones();
      this.crudService.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
        console.log("respuesta15:",respuesta15)
      })        
      
    })
    
  }

  RechazarRegistro(id:any,iControl:any){
    //console.log(id);    
    var aux = "";
    if(!this.formularioDeVacacion.get('motivo')?.value){
      aux = "Sin observaciones"
      window.confirm("Rellene motivo")
    }else{
      aux = this.formularioDeVacacion.get('motivo')?.value
      this.crudService.RechazarSolicitudVacacionBySupervisor(id,aux).subscribe(respuesta=>{
        console.log("respuesta: ",respuesta) 
        this.reloadMenuComponent();
        this.getVacaciones();
        this.crudService.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
          console.log("respuesta15:",respuesta15)
        })        
        
      })
        
    }
    
  }

  exportToCSV(){
    this.exportList.downloadFileSolicitudesVacaciones(this.VacacionesBySupervisor,"Vacaciones");
  }
  getDataPendientes(){
    this.crudService.ObtenerVacacionesPersonalPendientesBySupervisor(this.user, this.passw).subscribe((respuesta:any) =>{
      //console.log(respuesta);
      this.VacacionesPendientesBySupervisor=respuesta;
      this.consults = respuesta.data;
      this.totalP = respuesta.total;
      
    });   
  }

  getDataNegadas(){
    this.crudService.ObtenerVacacionesPersonalNegadasBySupervisor(this.user, this.passw).subscribe((respuesta:any) =>{
      //console.log(respuesta);
      this.VacacionesNegadasBySupervisor=respuesta;
      this.consults = respuesta.data;
      this.totalN = respuesta.total;
    });
  }

  getDataAprobadas(){
    this.crudService.ObtenerVacacionesPersonalAprobadasBySupervisor(this.user, this.passw).subscribe((respuesta:any) =>{
      //console.log(respuesta);
      this.VacacionesAprobadasBySupervisor=respuesta;
      this.consults = respuesta.data;
      this.totalA = respuesta.total;
    });    
  }

  pageChangeEventPendientes(event: number){
    this.pP = event;
    this.getDataPendientes();
  }

  pageChangeEventNegadas(event: number){
    this.pN = event;
    this.getDataNegadas();
  }

  pageChangeEventAprobadas(event: number){
    this.pA = event;
    this.getDataAprobadas();
  }

  reloadMenuComponent() {
    this.router.navigateByUrl('/menu', { skipLocationChange: true }).then(() => {
      window.location.reload();
    });
  }

}
