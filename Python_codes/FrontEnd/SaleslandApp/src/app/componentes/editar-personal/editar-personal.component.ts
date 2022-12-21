import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-personal',
  templateUrl: './editar-personal.component.html',
  styleUrls: ['./editar-personal.component.css']
})
export class EditarPersonalComponent implements OnInit {
  formularioDePersonal:FormGroup;
  elID:any;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) { 
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerPersonal(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioDePersonal.setValue({
          id_personal:respuesta['id_personal'],
          id_centro_costo:respuesta['id_centro_costo'],
          cedula:respuesta['cedula'],
          status:respuesta['status'],
          adendum_contrato:respuesta['adendum_contrato'],
          id_contrato:respuesta['id_contrato'],
          id_cargo:respuesta['id_cargo']
        });       
      }
    );
    
    this.formularioDePersonal = this.formulario.group({      
      id_personal:[''],
      id_centro_costo:[''],
      cedula:[''],
      status:[''],
      adendum_contrato:[''],
      id_contrato:[''],
      id_cargo:['']
    });
  }

  ngOnInit(): void {
  }

  enviarDatos(): void{
    this.crudService.ModificarPersonal(this.elID,this.formularioDePersonal.value);
    this.ruteador.navigateByUrl('/listar-personal');
  }
}
