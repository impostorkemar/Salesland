import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-candidato',
  templateUrl: './agregar-candidato.component.html',
  styleUrls: ['./agregar-candidato.component.css']
})
export class AgregarCandidatoComponent implements OnInit {
  formularioDeCandidato:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) { 
    this.formularioDeCandidato = this.formulario.group({
      cedula:[""],
      nombre:[""],
      apellido:[""],
      genero:[""],
      direccion_domicilio:[""],
      ciudad:[""],
      provincia:[""],
      estado_civil:[""],
      telefono_celular:[""],
      telefono_casa:[""],
      direccion_correo:[""],
      fecha_nacimiento:[""],
      edad:[""],
      nacionalidad:[""],
      status:["postulante"]
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeCandidato)      
      this.crudService.AgregarCandidato(this.formularioDeCandidato.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/listar-candidatos');
      });
      
  }

}
