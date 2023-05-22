import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listar-reporte-general-personal',
  templateUrl: './listar-reporte-general-personal.component.html',
  styleUrls: ['./listar-reporte-general-personal.component.css']
})
export class ListarReporteGeneralPersonalComponent {
  //Vacaciones:any;
  VacacionesPendientes:any;
  VacacionesNegadas:any;
  VacacionesAprobadas:any;
  user!:String;
  passw!:String;
  formularioDeVacacion:FormGroup;

  Vacaciones:any[] = [];
  pagedVacaciones: any[] = [];
  currentPage = 1;
  pageSize = 5; // Number of rows per page
  totalPages = 0;
  pages: number[] = [];
  searchKeyword: string = '';
  btnRechazar: boolean = false;
  btnAceptar: boolean = false;
  btnEliminar: boolean = false;

  constructor(
    private crudService:CrudService,
    private exportList:ExportListService,
    public formulario:FormBuilder,
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
    this.crudService.ObtenerVacacionesPersonal(this.user, this.passw).subscribe(respuesta=>{
      console.log(respuesta);
      this.Vacaciones = respuesta; // Actualiza el array con la propiedad correspondiente
  
      // Filtrar los datos según la búsqueda
      this.filterVacaciones();

      // Verificar si se debe mostrar los botones de "Aceptar" y "Rechazar"
      this.btnRechazar = this.Vacaciones.some(row => row.status === 'pendiente');
      this.btnAceptar = this.Vacaciones.some(row => row.status === 'pendiente');
      this.btnEliminar = this.Vacaciones.some(row => row.status === 'pendiente');
  
      this.totalPages = Math.ceil(this.Vacaciones.length / this.pageSize);
      this.changePage(1);
    });
  }

  filterVacaciones(): void {
    console.log("Entre vacaciones");
    const searchKeyword = this.formularioDeVacacion.get('searchKeyword')?.value;
  
    if (searchKeyword.trim() !== '') {
      this.Vacaciones = this.Vacaciones.filter(row =>
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
    if (this.Vacaciones.length === 0) {
      this.pagedVacaciones = [];
      this.totalPages = 0;
      this.currentPage = 1;
      this.pages = [];
      return;
    }
  
    console.log("Vacaciones:", this.Vacaciones);
  }

  precargaVacaciones(){
    this.crudService.ObtenerVacacionesPersonalBySupervisor(this.user, this.passw).subscribe(respuesta=>{
      console.log(respuesta);
      this.Vacaciones = respuesta; // Actualiza el array con la propiedad correspondiente
      this.totalPages = Math.ceil(this.Vacaciones.length / this.pageSize);
      this.changePage(1);
    });
  }
  
  
  searchVacaciones(): void {
    this.filterVacaciones();
    this.totalPages = Math.ceil(this.Vacaciones.length / this.pageSize);
    this.changePage(1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.pagedVacaciones = this.Vacaciones.slice(
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
    this.Vacaciones.sort((a, b) => {
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
    this.crudService.BorrarVacacion(id).subscribe(respuesta=>{
      console.log("respuesta: ",respuesta) 
      this.getVacaciones();
    });
  }

  AceptarRegistro(id:any,iControl:any){
    //console.log(id);    
    var aux = "";
    aux = "Aprobado"
    this.crudService.AceptarSolicitudVacacionBySupervisor(id).subscribe(respuesta=>{
      console.log("respuesta: ",respuesta) 
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
        this.getVacaciones();
        this.crudService.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
          console.log("respuesta15:",respuesta15)
        })        
        
      })
        
    }
    
  }

  exportToCSV(){
    this.crudService.ObtenerVacacionesPersonal(this.user, this.passw).subscribe(respuesta=>{
      //console.log(respuesta);
      this.Vacaciones=respuesta;
    });
    this.exportList.downloadFileSolicitudesVacaciones(this.Vacaciones,"Vacaciones");
  }
}
