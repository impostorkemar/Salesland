import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-personal',
  templateUrl: './agregar-personal.component.html',
  styleUrls: ['./agregar-personal.component.css']
})
export class AgregarPersonalComponent implements OnInit {

  formularioDePersonal:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) { 
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
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDePersonal)      
      this.crudService.AgregarPersonal(this.formularioDePersonal.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/listar-personal');
      });
      
  }
}
