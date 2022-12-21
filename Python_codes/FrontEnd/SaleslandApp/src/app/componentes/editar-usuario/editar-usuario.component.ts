import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  formularioDeUsuario:FormGroup;
  elID:any;
  
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) {     
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerUsuario(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioDeUsuario.setValue({
          id_usuario:respuesta['id_usuario'],
          cedula:respuesta['cedula'],
          nombre_usuario:respuesta['nombre_usuario'],
          password:respuesta['password']
        });
       
      }
    );
    
    this.formularioDeUsuario = this.formulario.group({
      id_usuario:[''],
      cedula:[''],
      nombre_usuario:[''],
      password:['']
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): void{
    this.crudService.ModificarUsuario(this.elID,this.formularioDeUsuario.value);
    this.ruteador.navigateByUrl('/listar-usuarios');
  }

}
