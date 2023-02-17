import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import { ExportListService } from 'src/app/servicio/export-list.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import { concat } from 'rxjs';
import { PipeTransform, Pipe } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})


export class ConsultaComponent implements OnInit  {
  formularioConsulta:FormGroup;
  datos:any;  
  Consultas:any;
  Cabeceras:any;
  Ejecuciones:any;  
  Tablas:any;
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  opcionSeleccionado2: string  = '0';
  verSeleccion2: string        = '';

  constructor(
    private crudService:CrudService,
    private exportList:ExportListService,
    public formulario:FormBuilder,
  ) { 
    this.formularioConsulta = this.formulario.group({
      parametroOrdenar:[""]            
    });    
  }
  

  ngOnInit(): void {
    let Array: string[]=[];
    let Array2: string[]=[];
    let Array3: string[]=[]; 
    let Array4: string[]=[];   
    this.crudService.ObtenerConsultas().subscribe(
      respuesta=>{
      //console.log(respuesta);
      this.Consultas=respuesta;
      const json = JSON.stringify(respuesta);
      //console.log("JASON",json); 
      JSON.parse(json, (key, value) => {
        //console.table(`key: -> ${key}`);
        //console.log(`value: -> ${value}`); // Imprime esto 2 veces asi: value: -> Actualizado y value: -> [object Object]
        //var number=isNaN(parseInt(key, 10));
        //console.log('Ntran:'+number);        
        if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
          //console.log('key:'+key+'Array:'+Array.indexOf(key));
          Array2.push(key);    
          //Array3.push("consulta.".concat(key.toString()))  
          Array3.push(key.toString())
        }
        let aux=(key.replaceAll("_"," ")).toUpperCase();
        if (Array.indexOf(aux)==-1 && isNaN(parseInt(aux, 10)) && aux!=''){
          //console.log('aux:'+aux+'Array:'+Array.indexOf(aux));
          Array.push((aux.replaceAll("_"," ")).toUpperCase());             
        }               
      });      
      this.Cabeceras=Array;
      this.datos=Array2;
      this.Ejecuciones=Array3;      
      //console.log("CABECERAS:",this.Cabeceras);
      //console.log("DATOS:",this.datos);
      //console.log("EJECUCIONES:",this.Ejecuciones);
      //console.log("VALORES:",this.Valores);
      }
    );     
    this.crudService.ObtenerTablasBaseDatos().subscribe(
      respuesta=>{    
        this.Tablas=respuesta; 
      }
    );
    console.log(this.Tablas);
    
  }
  
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    var index = this.Ejecuciones.indexOf(this.verSeleccion); 
    if (index != -1){
      this.crudService.ObtenerConsultasByParameter(index).subscribe(
        respuesta=>{
          //console.log(respuesta);
          this.Consultas=respuesta;
        }
      );
      //console.log("index1:",index);
    }else{
      this.crudService.ObtenerConsultas().subscribe(
        respuesta=>{    
        //console.log(respuesta.valueOf);    
        this.Consultas=respuesta;
        }
      ); 
      //console.log("index2:",index);
    }
    
  }
  capturarTablas(){
    this.verSeleccion2 = this.opcionSeleccionado2;    
  }
  exportToCSV(){
    this.exportList.downloadConsult(this.Consultas,"Consultas",this.Ejecuciones);
  }

  
  

}
