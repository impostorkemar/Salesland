import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-centro-costo',
  templateUrl: './agregar-centro-costo.component.html',
  styleUrls: ['./agregar-centro-costo.component.css']
})
export class AgregarCentroCostoComponent implements OnInit {
  formularioCentroCosto:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) {
    this.formularioCentroCosto = this.formulario.group({
      id_centro_costo:[""],
      nombre_centro:[""],
      tienda:[""],
      cuenta:[""],
    });
   }

  ngOnInit(): void {    
  }

  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioCentroCosto)      
      this.crudService.AgregarCentroCosto(this.formularioCentroCosto.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/listar-centros-costos');
      });      
  }
}
