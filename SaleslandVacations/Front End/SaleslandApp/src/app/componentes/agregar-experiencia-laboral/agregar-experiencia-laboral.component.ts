import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-experiencia-laboral',
  templateUrl: './agregar-experiencia-laboral.component.html',
  styleUrls: ['./agregar-experiencia-laboral.component.css']
})
export class AgregarExperienciaLaboralComponent implements OnInit {
  formularioDeExperienciaLaboral:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) { 
    this.formularioDeExperienciaLaboral = this.formulario.group({      
      cedula:[""],
      nombre_experiencia:[""],
      tiempo_experiencia:[""],
      estudios_universitarios:[""]
    });
  }

  ngOnInit(): void {
  }

  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeExperienciaLaboral)      
      this.crudService.AgregarExperienciaLaboral(this.formularioDeExperienciaLaboral.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/listar-experiencias-laborales');
      });
      
  }
}
