import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgbDateStruct,NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DecimalPipe],
})
export class MenuComponent {
  control_vistas: FormGroup;
  rolVacations!: Boolean;
  rolPersonal!: Boolean;
  rolReportes!: Boolean; 
  probarRol_IV!: Boolean;
  probarRol_RU!: Boolean;
  probarRol_D!: Boolean;  
  probarRol_IPV!: Boolean;
  opcion:number =1;
  nombreVentana:string = "";
  user!:String;
  passw!:String;
  cedula!: any;
  corte!: NgbDate;
  contrato!: Date;
  antiguedad!: number;
  Motivos!:any;

  constructor(
    private fb: FormBuilder,
    private testuserService: TestuserService,
    private crudService: CrudService,
    private router:Router,
    private _decimalPipe: DecimalPipe,
  ) { 
    
    this.control_vistas = this.fb.group({
      name_usuario: ['',Validators.required],
      lastname_usuario: ['',Validators.required],
      cargo: ['',Validators.required],
      cedula: ['',Validators.required],
      cuenta: ['',Validators.required],
      stateVacaciones: ['',Validators.required],
      statePersonal: ['',Validators.required],
      stateReportes: ['',Validators.required],   
      vaca_disp:['',Validators.required],
      dias_solicitudes_pen:['',Validators.required],
      dias_tomados:['',Validators.required],      
      saldo_dias:['',Validators.required],

    });
    this.opcion = 1;
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
  }

  ngOnInit(): void {
    this.nombreVentana="";    
    let Array: string[]=[];
    let Array2: string[]=[];
    this.mostrarDatos();    
    this.control_vistas.controls['name_usuario'].disable();    
    this.control_vistas.controls['lastname_usuario'].disable(); 
    this.control_vistas.controls['cargo'].disable(); 
    this.control_vistas.controls['cedula'].disable(); 
    this.control_vistas.controls['cuenta'].disable(); 
    this.control_vistas.controls['vaca_disp'].disable(); 
    this.control_vistas.controls['dias_tomados'].disable(); 
    this.control_vistas.controls['cedula'].disable(); 
    this.control_vistas.controls['saldo_dias'].disable(); 
    this.opcion = 0;
    this.mostrarDataUser();
  }

  mostrarDatos(){
    console.log("MENU ROL:",localStorage.getItem('ROLE') as string)
    if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN'){
      console.log("PROBAR: admin");             
      this.rolVacations = true;
      this.rolPersonal = true; 
      this.rolReportes = true;  
    }if (localStorage.getItem('ROLE') as string ==='ROLE_SUPERVISOR') {
      console.log("PROBAR: supervisor"); 
      this.rolVacations = true;
      this.rolPersonal = true; 
      this.rolReportes = false;   
    }if (localStorage.getItem('ROLE') as string ==='ROLE_USER') {
      console.log("PROBAR: promotor");
      this.rolVacations = true;
      this.rolPersonal = false; 
      this.rolReportes = false;   
    }
    this.menuVacaciones2(2)
  }
  
  menuReportes(){
         
    if (this.control_vistas.value.stateReportes as string === '1'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='USUARIO';
    }
    if (this.control_vistas.value.stateReportes as string === '2'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CANDIDATO';
    }
    if (this.control_vistas.value.stateReportes as string === '3'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CARGOS';
    }
    if (this.control_vistas.value.stateReportes as string === '4'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CENTRO-COSTO';
    }
    if (this.control_vistas.value.stateReportes as string === '5'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CONTRATO';
    }
    if (this.control_vistas.value.stateReportes as string === '6'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='EXPERIENCIA-LABORAL';
    }
  }

  menuReportes2(op: number){
    console.log("value:",op)     
    if (op as unknown as string == '1'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='USUARIO';
    }else if (op as unknown as string == '2'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CANDIDATO';
    }else if (op as unknown as string == '3'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CARGOS';
    }else if (op as unknown as string == '4'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CENTRO-COSTO';
    }else if (op as unknown as string == '5'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='CONTRATO';
    }else if (op as unknown as string == '6'){
      console.log("OPCION:",this.control_vistas.value.stateReportes);
      this.nombreVentana='EXPERIENCIA-LABORAL';
    }
  }


  menuVacaciones(){    
    if (this.control_vistas.value.stateVacaciones as string === '1'){
      console.log("OPCION:",this.control_vistas.value.stateVacaciones);
      this.nombreVentana='INGRESO-VACACION';
      
    }
    if (this.control_vistas.value.stateVacaciones as string === '2'){
      console.log("OPCION:",this.control_vistas.value.stateVacaciones);
      this.nombreVentana='REPORTE-PERSONAL';
    }
  }

  menuVacaciones2(op: number){
    console.log("value:",op)
    if (op as unknown as string == '1'){
      
      this.nombreVentana='INGRESO-VACACION';
      console.log("OPCION:",this.nombreVentana);
      
    }else if (op as unknown as string == '2'){
      
      this.nombreVentana='REPORTE-PERSONAL';
      console.log("OPCION:",this.nombreVentana);
    }else{
      console.log("OPCION: VACIO");
    }
    
  }
  menuPersonal(){
    if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN'){
      console.log("ADMIN")
      if (this.control_vistas.value.statePersonal as string === '1'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL-VACACIONES-PERSONAL';
      }    
      if (this.control_vistas.value.statePersonal as string === '2'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL';
      }
    }if (localStorage.getItem('ROLE') as string ==='ROLE_SUPERVISOR') {
      console.log("SUPERVISOR")
      if (this.control_vistas.value.statePersonal as string === '1'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL-VACACIONES-SUPERVISOR';
      }
      if (this.control_vistas.value.statePersonal as string === '2'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL';
      }
    }
  }

  menuPersonal2(op:number){
    if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN'){
      console.log("ADMIN")
      if (op as unknown as string == '1'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL-VACACIONES-PERSONAL';
      } else if (op as unknown as string == '2'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL';
      }
    }else if (localStorage.getItem('ROLE') as string ==='ROLE_SUPERVISOR') {
      console.log("SUPERVISOR")
      if (op as unknown as string == '1'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL-VACACIONES-SUPERVISOR';
      }else if (op as unknown as string == '2'){
        console.log("OPCION:",this.control_vistas.value.statePersonal);
        this.nombreVentana='REPORTE-GENERAL';
      }
    }    
  }

  mostrarDataUser(){
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuestaData=>{
      console.log("DATAUSER:",respuestaData);
      //CARGA CEDULA USER

    this.crudService.ObtenerCedulaByUser_Pass(this.user,this.passw).subscribe(respuesta=>{
      this.cedula = respuesta['cedula'];    

        //CARGA FECHA INICIO CONTRATO
        this.crudService.ObtenerFechaInicioContrato(this.cedula).subscribe(respuesta2=>{

          if (respuesta2 != null){
            const datePipe = new DatePipe('en-US'); 
            var corteYear = new Date().getFullYear();
            this.corte =  new NgbDate(corteYear,1,31);      
            //console.log("corte:",this.corte)        
            //this.contrato = new Date((Value2[0] as string));  

            this.contrato = new Date((respuesta2['fechaContrato'] as string));           
            var yearCal = (this.corte.year-this.contrato.getFullYear())*12
            //console.log("this.corte.month\n:",this.corte.month,"\nthis.contrato.getMonth():",this.contrato.getMonth())
            var monthCal = (this.corte.month-(this.contrato.getMonth()+1))
            var dateCal = (this.corte.day-this.contrato.getDate())/30
            //console.log("Year\n:",yearCal,"monthCal\n:",monthCal,"dateCal\n:",dateCal)
            var antiguedadAux = (yearCal+monthCal+dateCal)
            //console.log("Antiguedad:",antiguedadAux)
            this.antiguedad = (this._decimalPipe.transform(antiguedadAux*1.25,"1.0-1") as any) as number;           
            var antiguedadCal = this.antiguedad;

            //CARGA VACACIONES TOMADAS
            console.log("antiguedadCal->this.antiguedad",respuesta2['fechaContrato'])
            if ( antiguedadCal != null){
              this.crudService.ObtenertotalVacacionesTomadas(this.user,this.passw).subscribe(respuesta=>{
                
                var totalVacasTomadas = respuesta['VACA_PREV'];  
                console.log("totalVacasTomadas->totalVacacionesAprobadas",respuesta['VACA_PREV'])            
                this.crudService.ObtenertotalVacacionesTomadasPendientes(this.user,this.passw).subscribe(respuesta15=>{
                  
                  var totalVacasPendientes = respuesta15['VACA_PREV']
                  console.log(respuesta15)
                  console.log("totalVacasPendientes->totalVacacionesPendientes:",respuesta15['VACA_PREV'])

                  this.crudService.ObtenerMotivosVacaciones("vacaciones").subscribe(respuesta16=>{
                    this.Motivos = respuesta16;
                    
                    console.log("Motivos:",this.Motivos[0])
                    console.log("vaca_disp:",antiguedadCal-totalVacasTomadas)
                    if ( totalVacasTomadas == null ){ // VACA PREV
                      this.control_vistas.setValue({
                        name_usuario: respuestaData['nombre'],
                        lastname_usuario: respuestaData['apellido'],
                        cargo: respuestaData['nombre_cargo'],
                        cedula: respuestaData['cedula'],
                        cuenta: respuestaData['cuenta'],
                        stateVacaciones: 'VACACIONES',
                        statePersonal: 'PERSONAL',
                        stateReportes: 'REPORTES',
                        vaca_disp: antiguedadCal, //vacaciones por contrato                        
                        dias_solicitudes_pen: 0, // vacaciones tomadas
                        dias_tomados:0,                        
                        saldo_dias: antiguedadCal,
                      });
                    }else if (totalVacasTomadas != null && totalVacasPendientes == null){ // VACA PREV PEND
                      this.control_vistas.setValue({
                        name_usuario: respuestaData['nombre'],
                        lastname_usuario: respuestaData['apellido'],
                        cargo: respuestaData['nombre_cargo'],
                        cedula: respuestaData['cedula'],
                        cuenta: respuestaData['cuenta'],
                        stateVacaciones: 'VACACIONES',
                        statePersonal: 'PERSONAL',
                        stateReportes: 'REPORTES',
                        vaca_disp: antiguedadCal,  //vacaciones por contrato
                        dias_solicitudes_pen: 0, // vacaciones tomadas
                        dias_tomados:totalVacasTomadas,                   
                        saldo_dias: antiguedadCal-totalVacasTomadas-totalVacasPendientes, //vacaciones saldo                             
                      });                                       
                    }else{ 
                      this.control_vistas.setValue({
                        name_usuario: respuestaData['nombre'],
                        lastname_usuario: respuestaData['apellido'],
                        cargo: respuestaData['nombre_cargo'],
                        cedula: respuestaData['cedula'],
                        cuenta: respuestaData['cuenta'],
                        stateVacaciones: 'VACACIONES',
                        statePersonal: 'PERSONAL',
                        stateReportes: 'REPORTES',
                        vaca_disp: antiguedadCal,  //vacaciones por contrato
                        dias_tomados:totalVacasTomadas,                        
                        dias_solicitudes_pen: totalVacasPendientes, // vacaciones tomadas                          
                        saldo_dias: antiguedadCal-totalVacasTomadas-totalVacasPendientes, //vacaciones saldo                                                  
                      });              
                    }
                  })
                });             
              
              });
          }
          }else{
            window.confirm("Usuario sin perfil de contrato")
          }
        });        
      });
    });
  }

  goToMenuBotones(){
    this.router.navigate(['/inicio']);
  }

}
