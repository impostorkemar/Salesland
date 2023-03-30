import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-contrato',
  templateUrl: './editar-contrato.component.html',
  styleUrls: ['./editar-contrato.component.css']
})
export class EditarContratoComponent implements OnInit {
  formularioContrato:FormGroup;
  elID:any;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) {
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerContrato(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioContrato = this.formulario.group({   
          id_contrato:respuesta["id_contrato"],   
          tipo_contrato:respuesta["tipo_contrato"],
          fecha_inicio_contrato:respuesta["fecha_inicio_contrato"],
          fecha_fin_contrato:respuesta["fecha_fin_contrato"],
          salario:respuesta["salario"],
          observaciones:respuesta["observaciones"]
        });
       
      }
    );
    
    this.formularioContrato = this.formulario.group({   
      id_contrato:[""],     
      tipo_contrato:[""],
      fecha_inicio_contrato:[""],
      fecha_fin_contrato:[""],
      salario:[""],
      observaciones:[""],
      
    });
   }

  ngOnInit(): void {
  }

  enviarDatos(): void{
    this.crudService.ModificarContrato(this.elID,this.formularioContrato.value);
    this.ruteador.navigateByUrl('/menu');
  }

}
