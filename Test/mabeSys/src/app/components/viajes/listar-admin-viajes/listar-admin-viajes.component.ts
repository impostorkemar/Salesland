import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-admin-viajes',
  templateUrl: './listar-admin-viajes.component.html',
  styleUrls: ['./listar-admin-viajes.component.css']
})
export class ListarAdminViajesComponent {  
  user!: String;
  passw!: String;
  formularioDeViaje: FormGroup;
  consults: any;
  ViajesBySupervisor: any[] = [];
  pagedViajes: any[] = [];
  currentPage = 1;
  pageSize = 10; // Number of rows per page
  totalPages = 0;
  pages: number[] = [];
  searchKeyword: string = '';
  btnRechazar: boolean = false;
  btnAceptar: boolean = false;

  sortColumn: string = '';
  sortDirection: string = '';
  showDetalle: boolean[] = [];
  detalleComprobantes!: any;

  constructor(
    private crudService: CrudService,
    private exportList: ExportListService,
    public formulario: FormBuilder,
    private router: Router,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
    this.formularioDeViaje = this.formulario.group({
      motivo: [''],
      searchKeyword: [''],
    });
  }

  ngOnInit(): void {
    this.getViajes();
  }

  calcularSuma(row: any): number {
    return row.base_imponible + row.cero_base_imponible + row.iva + row.servicio10 + row.importe_sin_facturas;
  }

  toggleDetalle(index: number, idviaje: any) {
    //console.log("index:\t", index)
    for (let i = 0; i <= this.pagedViajes.length; i++) {
      //console.log("i:\t",i)
      if (i === index) {
        this.showDetalle[i] = !this.showDetalle[i];
        this.crudService.ObtenerDetalleComprobanteById(idviaje as any as string).subscribe((response) => {
          this.detalleComprobantes = response;
          console.log("response:\n", response);
        });
      } else {
        this.showDetalle[i] = false;
      }
    }  
  }

  getViajes(): void {
    this.crudService.ObtenerViajesPersonal(this.user, this.passw).subscribe(respuesta => {
      //console.log(respuesta);
      this.ViajesBySupervisor = respuesta; // Actualiza el array con la propiedad correspondiente

      // Filtrar los datos según la búsqueda
      this.filterViajes();

      // Verificar si se debe mostrar los botones de "Aceptar" y "Rechazar"
      this.btnRechazar = this.ViajesBySupervisor.some(row => row.status === 'pendiente');
      this.btnAceptar = this.ViajesBySupervisor.some(row => row.status === 'pendiente');

      this.totalPages = Math.ceil(this.ViajesBySupervisor.length / this.pageSize);
      this.changePage(1);
    });
  }

  filterViajes(): void {
    //console.log("Entre Viajes");
    const searchKeyword = this.formularioDeViaje.get('searchKeyword')?.value;

    if (searchKeyword.trim() !== '') {
      this.ViajesBySupervisor = this.ViajesBySupervisor.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    } else {
      //this.getViajes();
      this.precargaViajes();
      return;
    }

    // Verificar si no se encontraron resultados
    if (this.ViajesBySupervisor.length === 0) {
      this.pagedViajes = [];
      this.totalPages = 0;
      this.currentPage = 1;
      this.pages = [];
      return;
    }

    console.log("Viajes:", this.ViajesBySupervisor);
  }

  precargaViajes() {
    this.crudService.ObtenerViajesPersonal(this.user, this.passw).subscribe(respuesta => {
      //console.log(respuesta);
      this.ViajesBySupervisor = respuesta; // Actualiza el array con la propiedad correspondiente
      this.totalPages = Math.ceil(this.ViajesBySupervisor.length / this.pageSize);
      this.changePage(1);
    });
  }


  searchViajes(): void {
    this.filterViajes();
    this.totalPages = Math.ceil(this.ViajesBySupervisor.length / this.pageSize);
    this.changePage(1);
    this.showDetalle = this.showDetalle.map(() => false);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.pagedViajes = this.ViajesBySupervisor.slice(
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
    if (this.sortColumn === prop) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = prop;
      this.sortDirection = 'asc';
    }

    this.ViajesBySupervisor.sort((a, b) => {
      if (a[this.sortColumn] < b[this.sortColumn]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (a[this.sortColumn] > b[this.sortColumn]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.changePage(this.currentPage);
    this.showDetalle = this.showDetalle.map(() => false);
  }

  borrarRegistro(id: any, iControl: any) {
    //console.log(id);
    //console.log(iControl);
    this.crudService.EliminarSolicitudViaje(id).subscribe(respuesta => {
      console.log("respuesta: ", respuesta)
      this.getViajes();
      this.reloadMenuComponent();
    })
  }


  AceptarRegistro(id: any, iControl: any) {
    //console.log(id);    
    var aux = "";
    aux = "Aprobado"
    this.crudService.AceptarSolicitudViaje(id).subscribe(respuesta => {
      //console.log("id: ", id)
      console.log("respuesta: ", respuesta)      
      if(respuesta){
        this.reloadMenuComponent();
        this.getViajes();
        this.crudService.EnviarCorreoCambioEstadoSolicitudViaje(id).subscribe(respuesta15 => {
          console.log("respuesta15:", respuesta15)
        })
      }
      
      
    })

  }

  RechazarRegistro(id: any, iControl: any) {
    //console.log(id);    
    var aux = "";
    if (!this.formularioDeViaje.get('motivo')?.value) {
      aux = "Sin observaciones"
      alert("Rellene motivo")
    } else {
      aux = this.formularioDeViaje.get('motivo')?.value
      this.crudService.RechazarSolicitudViaje(id, aux).subscribe(respuesta => {
        console.log("respuesta: ", respuesta)        
        if(respuesta){
          this.reloadMenuComponent();
          this.getViajes();
          this.crudService.EnviarCorreoCambioEstadoSolicitudViaje(id).subscribe(respuesta15 => {
            console.log("respuesta15:", respuesta15)
          })
        }   
      })

    }

  }

  exportToCSV() {
    this.exportList.downloadFileSolicitudesViaje(this.ViajesBySupervisor, "Viajes");
  }

  reloadMenuComponent() {
    this.router.navigateByUrl('/menu', { skipLocationChange: true }).then(() => {
      window.location.reload();
    });
  }
}
