import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-centro-costo',
  templateUrl: './editar-centro-costo.component.html',
  styleUrls: ['./editar-centro-costo.component.css']
})
export class EditarCentroCostoComponent implements OnInit {
  formularioCentroCosto:FormGroup;
  elID:any;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) {
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerCentroCosto(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioCentroCosto.setValue({
          id_centro_costo:respuesta["id_centro_costo"],
          nombre_centro:respuesta["nombre_centro"],
          tienda:respuesta["tienda"],
          cuenta:respuesta["cuenta"]          
        });
       
      }
    );
    
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
    this.crudService.ModificarCentroCosto(this.elID,this.formularioCentroCosto.value);
    this.ruteador.navigateByUrl('/listar-centros-costos');
  }
}
