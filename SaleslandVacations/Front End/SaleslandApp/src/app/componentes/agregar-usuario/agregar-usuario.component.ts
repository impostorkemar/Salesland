import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent implements OnInit {

  formularioDeUsuario:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) { 
    this.formularioDeUsuario = this.formulario.group({
      cedula:[""],
      nombre_usuario:[""],
      password:[""]
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeUsuario)      
      this.crudService.AgregarUsuario(this.formularioDeUsuario.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/listar-usuarios');
      });
      
  }

}
