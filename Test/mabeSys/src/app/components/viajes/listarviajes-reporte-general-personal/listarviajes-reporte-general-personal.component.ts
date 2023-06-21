import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { ExportListService } from 'src/app/services/export-list.service';

@Component({
  selector: 'app-listarviajes-reporte-general-personal',
  templateUrl: './listarviajes-reporte-general-personal.component.html',
  styleUrls: ['./listarviajes-reporte-general-personal.component.css']
})
export class ListarviajesReporteGeneralPersonalComponent {
  Viaje: any;
  user!: string;
  passw!: string;
  formularioDeviaje: FormGroup;
  pP: number = 1;
  totalP: number = 0;
  consults: any;

  sortBy: string = '';
  sortAsc: boolean = true;

  constructor(
    private crudService: CrudService,
    private exportList: ExportListService,
    public formulario: FormBuilder,
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
    this.formularioDeviaje = this.formulario.group({
      motivo: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  exportToCSV() {
    this.crudService.ObtenerDataHistoricaViajesPersonal(this.user, this.passw).subscribe(respuesta => {
      this.Viaje = respuesta;
      this.exportList.downloadFileSolicitudesViaje(this.Viaje, "Viajes");
    });
  }

  getData() {
    this.crudService.ObtenerDataHistoricaViajesPersonal(this.user, this.passw).subscribe((respuesta: any) => {
      this.Viaje = respuesta;
      this.consults = respuesta.data;
      this.totalP = respuesta.total;
    });
  }

  pageChangeEvent(event: number) {
    this.pP = event;
    this.getData();
  }

  sort(prop: string): void {
    if (this.sortBy === prop) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortBy = prop;
      this.sortAsc = true;
    }

    this.Viaje.sort((a: any, b: any) => {
      const valA = a[prop];
      const valB = b[prop];

      if (valA < valB) {
        return this.sortAsc ? -1 : 1;
      } else if (valA > valB) {
        return this.sortAsc ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
