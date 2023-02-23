import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-experiencia-laboral',
  templateUrl: './editar-experiencia-laboral.component.html',
  styleUrls: ['./editar-experiencia-laboral.component.css']
})
export class EditarExperienciaLaboralComponent implements OnInit {
  formularioDeExperienciaLaboral:FormGroup;
  elID:any;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) { 
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerExperienciaLaboral(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioDeExperienciaLaboral.setValue({
          id_experiencia_laboral:respuesta["id_experiencia_laboral"],
          cedula:respuesta["cedula"],
          nombre_experiencia:respuesta["nombre_experiencia"],
          tiempo_experiencia:respuesta["tiempo_experiencia"],
          estudios_universitarios:respuesta["estudios_universitarios"]
        });
       
      }
    );
    
    this.formularioDeExperienciaLaboral = this.formulario.group({  
      id_experiencia_laboral:[""],    
      cedula:[""],
      nombre_experiencia:[""],
      tiempo_experiencia:[""],
      estudios_universitarios:[""]
    });
  }

  ngOnInit(): void {
  }

  enviarDatos(): void{
    this.crudService.ModificarExperienciaLaboral(this.elID,this.formularioDeExperienciaLaboral.value);
    this.ruteador.navigateByUrl('/menu');
  }

}
