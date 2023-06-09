import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-admin',
  templateUrl: './listar-admin.component.html',
  styleUrls: ['./listar-admin.component.css']
})
export class ListarAdminComponent {
  VacacionesPendientesBySupervisor: any;
  VacacionesNegadasBySupervisor: any;
  VacacionesAprobadasBySupervisor: any;
  user!: String;
  passw!: String;
  formularioDeVacacion: FormGroup;
  consults: any;

  VacacionesBySupervisor: any[] = [];
  pagedVacaciones: any[] = [];
  currentPage = 1;
  pageSize = 10; // Number of rows per page
  totalPages = 0;
  pages: number[] = [];
  searchKeyword: string = '';
  btnRechazar: boolean = false;
  btnAceptar: boolean = false;

  sortColumn: string = '';
  sortDirection: string = '';

  constructor(
    private crudService: CrudService,
    private exportList: ExportListService,
    public formulario: FormBuilder,
    private router: Router,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
    this.formularioDeVacacion = this.formulario.group({
      motivo: [''],
      searchKeyword: [''],
    });
  }

  ngOnInit(): void {
    this.getVacaciones();
  }

  getVacaciones(): void {
    this.crudService.ObtenerVacacionesPersonal(this.user, this.passw).subscribe(respuesta => {
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
      this.precargaVacaciones();
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

  precargaVacaciones() {
    this.crudService.ObtenerVacacionesPersonal(this.user, this.passw).subscribe(respuesta => {
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
    if (this.sortColumn === prop) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = prop;
      this.sortDirection = 'asc';
    }

    this.VacacionesBySupervisor.sort((a, b) => {
      if (a[this.sortColumn] < b[this.sortColumn]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (a[this.sortColumn] > b[this.sortColumn]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.changePage(this.currentPage);
  }

  borrarRegistro(id: any, iControl: any) {
    //console.log(id);
    //console.log(iControl);
    this.crudService.EliminarSolicitudVacacion(id).subscribe(respuesta => {
      console.log("respuesta: ", respuesta)
      this.reloadMenuComponent();
      this.getVacaciones();

    })
  }


  AceptarRegistro(id: any, iControl: any) {
    //console.log(id);    
    var aux = "";
    aux = "Aprobado"
    this.crudService.AceptarSolicitudVacacionBySupervisor(id).subscribe(respuesta => {
      console.log("respuesta: ", respuesta)
      this.reloadMenuComponent();
      this.getVacaciones();
      this.crudService.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15 => {
        console.log("respuesta15:", respuesta15)
      })

    })

  }

  RechazarRegistro(id: any, iControl: any) {
    //console.log(id);    
    var aux = "";
    if (!this.formularioDeVacacion.get('motivo')?.value) {
      aux = "Sin observaciones"
      window.confirm("Rellene motivo")
    } else {
      aux = this.formularioDeVacacion.get('motivo')?.value
      this.crudService.RechazarSolicitudVacacionBySupervisor(id, aux).subscribe(respuesta => {
        console.log("respuesta: ", respuesta)
        this.reloadMenuComponent();
        this.getVacaciones();
        this.crudService.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15 => {
          console.log("respuesta15:", respuesta15)
        })

      })

    }

  }

  exportToCSV() {
    this.exportList.downloadFileSolicitudesVacaciones(this.VacacionesBySupervisor, "Vacaciones");
  }

  reloadMenuComponent() {
    this.router.navigateByUrl('/menu', { skipLocationChange: true }).then(() => {
      window.location.reload();
    });
  }
}
