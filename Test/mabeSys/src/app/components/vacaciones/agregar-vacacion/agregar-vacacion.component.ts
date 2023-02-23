import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-agregar-vacacion',
  templateUrl: './agregar-vacacion.component.html',
  styleUrls: ['./agregar-vacacion.component.css'],
})
export class AgregarVacacionComponent {


  formularioDeVacacion:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router,
  ) { 
    this.formularioDeVacacion = this.formulario.group({      
      vaca_disp:[''],
      dias_tomados:[''],
      
    });
  }

  ngOnInit(): void {
    this.formularioDeVacacion.controls['vaca_disp'].disable();
    this.formularioDeVacacion.controls['dias_tomados'].disable();
  }

  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeVacacion)      
      this.crudService.AgregarPersonal(this.formularioDeVacacion.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/menu');
      });
      
  }

  
}
