import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.component.html',
  styleUrls: ['./editar-cargo.component.css']
})
export class EditarCargoComponent implements OnInit {
  formularioCargo:FormGroup;
  elID:any;
  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private activeRoute:ActivatedRoute,
    private ruteador:Router
  ) {
    this.elID=this.activeRoute.snapshot.paramMap.get('id')
    console.log("ELID:",this.elID);

    this.crudService.ObtenerCargo(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioCargo.setValue({
          id_cargo:respuesta["id_cargo"],
          nombre_cargo:respuesta["nombre_cargo"]          
        });
       
      }
    );
    
    this.formularioCargo = this.formulario.group({
      id_cargo:[""],
      nombre_cargo:[""]      
    });
  }

  ngOnInit(): void {
  }

  enviarDatos(): void{
    this.crudService.ModificarCargo(this.elID,this.formularioCargo.value);
    this.ruteador.navigateByUrl('/menu');
  }
}
