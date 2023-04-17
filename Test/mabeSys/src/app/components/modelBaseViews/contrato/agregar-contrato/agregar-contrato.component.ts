import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-contrato',
  templateUrl: './agregar-contrato.component.html',
  styleUrls: ['./agregar-contrato.component.css']
})
export class AgregarContratoComponent implements OnInit {
  formularioContrato:FormGroup;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router
  ) { 
    this.formularioContrato = this.formulario.group({      
      tipo_contrato:[""],
      fecha_inicio_contrato:[""],
      salario:[""],
      observaciones:[""]
    });
  }

  ngOnInit(): void {
  }
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioContrato)      
      this.crudService.AgregarContrato(this.formularioContrato.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/menu');
      });
      
  }

}
