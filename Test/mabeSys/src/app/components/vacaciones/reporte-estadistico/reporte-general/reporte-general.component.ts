import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TestuserService } from 'src/app/services/testuser.service';
import { CrudService } from 'src/app/services/crud.service';
import { CentroCosto } from 'src/app/components/classModels/CentroCosto';
import { map } from 'rxjs';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent {
  myGroup!: FormGroup;
  registrationForm: FormGroup;
  datos = ['test1','test2','test3'];
  datosCentrosCostos!:any;
  datosColaboradores!:any;
  dias = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
  meses = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
  anios = ["2020","2021","2022","2023","2024","2025"];
  estados = ["Aceptada","No aceptada"];
  vacaAcum !: any;
  diasDispo !: any;
  vacaToma !: any;
  vacaPorTomarAprob !: any;
  NameTienda!: String;
  linkReporteAdmin!:Boolean;
  linkReport1!:Boolean;
  linkReport2!:Boolean;
  linkReport3!:Boolean;
  linkReport4!:Boolean;
  linkReport5!:Boolean;


  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
    private crudService:CrudService,
  ){    
    this.registrationForm = this.fb.group({
      vaca_acum: [''], 
      dias_dispo: [''], 
      vacac_tom: [''], 
      vaca_apro: [''], 
      nombreTienda: [''], 
    });
  }

  ngOnInit(): void {
    this.registrationForm.setValue({
      vaca_acum: [''], 
      dias_dispo: [''], 
      vacac_tom: [''], 
      vaca_apro: [''], 
      nombreTienda: [''], 
    }) 
    this.registrationForm.controls['vaca_acum'].disable();
    this.registrationForm.controls['dias_dispo'].disable();
    this.registrationForm.controls['vacac_tom'].disable();
    this.registrationForm.controls['vaca_apro'].disable();
    
    this.cargarCentrosCostos();
    this.cargarColaboradores();
    this.cargarDataReporteEstadistico();
    this.cargarGraphReporteEstadistico();
  }

  cargarCentrosCostos():void{
    this.crudService.ObtenerCentrosCostos().pipe(map(data => data.map((row: { nombre_centro: any; }) => row.nombre_centro))
    ).subscribe(columnData => {
      // Handle the column data here
      this.datosCentrosCostos = columnData
      //console.log(columnData)
    });
  }

  cargarColaboradores():void{
    this.crudService.ObtenerCandidatos().pipe(map(data => data.map((row: { cedula: any; }) => row.cedula))
    ).subscribe(columnData => {
      // Handle the column data here
      this.datosColaboradores = columnData
      //console.log(columnData)
    });
  }

  cargarDataReporteEstadistico():void{
    var myDate = new Date();
    var diaActual = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()
    var corte = "2023-01-31"
    this.crudService.ObtenerDataReporteEstadistico(corte,diaActual).subscribe(respuesta=>{
      this.registrationForm.setValue({
        vaca_acum: respuesta['vaca_acum'], 
        dias_dispo: respuesta['dias_dispo'],
        vacac_tom: respuesta['vaca_tomadas'],
        vaca_apro: respuesta['dias_PorTomar_Apro'],
        nombreTienda: [''],     
      }) 
      /*
      console.log("respuesta:",respuesta);
      console.log(respuesta['vaca_acum']);
      console.log(respuesta['vaca_tomadas']);
      console.log(respuesta['dias_dispo']);
      console.log(respuesta['dias_PorTomar_Apro']);
      */
    })
  } 

  cargarGraphReporteEstadistico(){
    
    var rol = localStorage.getItem('ROLE') as string
    var user = localStorage.getItem('USER') as string
    var passw = localStorage.getItem('PASS') as string
    console.log("ROLE:",rol)
    if (rol == 'ROLE_ADMIN'){
      this.linkReporteAdmin=true;
      this.linkReport1=false;
      this.linkReport2=false;
      this.linkReport3=false;
      this.linkReport4=false;
      this.linkReport5=false;
    }else{
      this.crudService.ObtenerIdSupervisorByuserAndPass(user,passw).subscribe(respuesta =>{
        console.log(respuesta)
        if(respuesta == null){
          window.confirm("Supervisor no registrado contacte con TI")
        }else if (respuesta['id_supervisor'] == 1){
          this.linkReporteAdmin=true;
          this.linkReport1=false;
          this.linkReport2=false;
          this.linkReport3=false;
          this.linkReport4=false;
          this.linkReport5=false;
        }else{
          if (respuesta['id_supervisor'] == 2){
            this.linkReporteAdmin=false;
            this.linkReport1=false;
            this.linkReport2=true;
            this.linkReport3=false;
            this.linkReport4=false;
            this.linkReport5=false;
          }else if(respuesta['id_supervisor'] == 3){
            this.linkReporteAdmin=false;
            this.linkReport1=false;
            this.linkReport2=false;
            this.linkReport3=true;
            this.linkReport4=false;
            this.linkReport5=false;
          }
          else if(respuesta['id_supervisor'] == 4){
            this.linkReporteAdmin=false;
            this.linkReport1=false;
            this.linkReport2=false;
            this.linkReport3=false;
            this.linkReport4=true;
            this.linkReport5=false;
          }else if(respuesta['id_supervisor'] == 5){
            this.linkReporteAdmin=false;
            this.linkReport1=false;
            this.linkReport2=false;
            this.linkReport3=false;
            this.linkReport4=false;
            this.linkReport5=true;
          }

        }
      })
    }
    
  }

  

  changeTienda(e: any) {
    
  }
}


