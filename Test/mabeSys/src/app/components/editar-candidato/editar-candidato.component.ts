import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-candidato',
  templateUrl: './editar-candidato.component.html',
  styleUrls: ['./editar-candidato.component.css']
})
export class EditarCandidatoComponent implements OnInit {
  formularioDeCandidato:FormGroup;
  elID:any;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) { 
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerCandidato(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioDeCandidato.setValue({
          cedula:respuesta['cedula'],
          nombre:respuesta['nombre'],
          apellido:respuesta['apellido'],
          genero:respuesta['genero'],
          direccion_domicilio:respuesta['direccion_domicilio'],
          ciudad:respuesta['ciudad'],
          provincia:respuesta['provincia'],
          estado_civil:respuesta['estado_civil'],
          telefono_celular:respuesta['telefono_celular'],
          telefono_casa:respuesta['telefono_casa'],
          direccion_correo:respuesta['direccion_correo'],
          fecha_nacimiento:respuesta['fecha_nacimiento'],
          edad:respuesta['edad'],
          nacionalidad:respuesta['nacionalidad'],
          status:respuesta['status']
        });       
      }
    );

    this.formularioDeCandidato = this.formulario.group({
      cedula:[''],
      nombre:[''],
      apellido:[''],
      genero:[''],
      direccion_domicilio:[''],
      ciudad:[''],
      provincia:[''],
      estado_civil:[''],
      telefono_celular:[''],
      telefono_casa:[''],
      direccion_correo:[''],
      fecha_nacimiento:[''],
      edad:[''],
      nacionalidad:[''],
      status:['']
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): void{
    this.crudService.ModificarCandidato(this.elID,this.formularioDeCandidato.value);
    this.ruteador.navigateByUrl('/listar-candidatos');
  }

}
