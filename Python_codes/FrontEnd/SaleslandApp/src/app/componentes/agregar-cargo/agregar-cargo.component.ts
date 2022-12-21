import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-cargo',
  templateUrl: './agregar-cargo.component.html',
  styleUrls: ['./agregar-cargo.component.css']
})
export class AgregarCargoComponent implements OnInit {
  formularioCargo:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) {
    this.formularioCargo = this.formulario.group({
      id_cargo:[""],
      nombre_cargo:[""]      
    });
   }

  ngOnInit(): void {
  }
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioCargo)      
      this.crudService.AgregarCargo(this.formularioCargo.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/listar-cargos');
      });
      
  }

}
