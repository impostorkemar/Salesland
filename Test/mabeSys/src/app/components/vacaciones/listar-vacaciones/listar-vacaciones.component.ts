import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-listar-vacaciones',
  templateUrl: './listar-vacaciones.component.html',
  styleUrls: ['./listar-vacaciones.component.css']
})
export class ListarVacacionesComponent implements OnInit {
  VacacionesPendientes: any;
  VacacionesNegadas: any;
  VacacionesAprobadas: any;
  user!: string;
  passw!: string;
  formularioDeVacacion: FormGroup;

  Vacaciones: any[] = [];
  pagedVacaciones: any[] = [];
  currentPage = 1;
  pageSize = 5; // Number of rows per page
  totalPages = 0;
  pages: number[] = [];
  searchKeyword: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(
    private crudService: CrudService,
    private exportList: ExportListService,
    public formulario: FormBuilder,
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
    this.crudService.ObtenerVacacionesByUserAndPass(this.user, this.passw).subscribe(respuesta => {
      console.log(respuesta);
      this.Vacaciones = respuesta; // Actualiza el array con la propiedad correspondiente

      // Filtrar los datos según la búsqueda
      this.filterVacaciones();

      this.totalPages = Math.ceil(this.Vacaciones.length / this.pageSize);
      this.changePage(1);
    });
  }

  filterVacaciones(): void {
    const searchKeyword = this.formularioDeVacacion.value.searchKeyword;

    if (searchKeyword.trim() !== '') {
      this.Vacaciones = this.Vacaciones.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        )
      );
    } else {
      this.precargaVacaciones();
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
  }

  precargaVacaciones() {
    this.crudService.ObtenerVacacionesByUserAndPass(this.user, this.passw).subscribe(respuesta => {
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
    if (this.sortColumn === prop) {
      // Si ya está ordenado por la misma columna, cambiar la dirección de ordenamiento
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Si es una columna diferente, establecer la dirección de ordenamiento predeterminada (ascendente)
      this.sortDirection = 'asc';
    }

    // Actualizar la columna de ordenamiento
    this.sortColumn = prop;

    // Implementar la lógica de ordenamiento basada en la propiedad 'prop'
    this.Vacaciones.sort((a, b) => {
      const valA = a[prop].toLowerCase();
      const valB = b[prop].toLowerCase();

      if (valA < valB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.changePage(this.currentPage);
  }

  borrarRegistro(id: any, iControl: any) {
    this.crudService.BorrarVacacion(id);
  }

  solicitarCancelacion(id: any, iControl: any) {
    let aux = this.formularioDeVacacion.value.motivo ? this.formularioDeVacacion.value.motivo : "Solicitar cancelacion";
    this.crudService.ModificarSolicitudVacacionACancelar(id, aux, this.VacacionesPendientes, this.VacacionesAprobadas, this.VacacionesNegadas, iControl);
  }

  AceptarRegistro(id: any, iControl: any) {
    this.crudService.BorrarVacacion(id);
  }

  RechazarRegistro(id: any, iControl: any) {
    this.crudService.BorrarVacacion(id);
  }

  exportToCSV() {
    this.exportList.downloadFileSolicitudesVacaciones(this.Vacaciones, "Vacaciones");
  }

  onSort(event: any) {
    // Lógica para ordenar los datos
  }

  onPage(event: any) {
    // Lógica para cambiar de página
  }

  onActivate(event: any) {
    // Lógica para resaltar la celda seleccionada
  }

  getDynamicRowHeight(row: any): number {
    // Lógica para calcular la altura de las filas según los datos de la fila
    return 30; // Cambia 30 por el valor calculado dinámicamente
  }
}
