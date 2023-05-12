import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private testuserService: TestuserService,
    private crudService: CrudService,
    private router:Router,
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

    });
    this.opcion = 1;
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
    this.opcion = 0;

    /*
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.testuserService.ConsultarNombreUsuario(user,passw).subscribe(respuesta=>{
        console.log("MENU",user,passw,"RESPONSE:",respuesta);
        if (respuesta != null){
          const json = JSON.stringify(respuesta);
          JSON.parse(json, (key, value) => { 
          if (Array.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
            //console.log('key:'+key+'Array:'+Array.indexOf(key));
            Array.push(value);  
          }                      
        });  
        //console.log("DATOS:",Array[0]);       
        this.control_vistas.setValue({
          name_usuario: Array[0],
          lastname_usuario: '',
          cedula: '',
          cuenta: '',
          stateVacaciones: 'VACACIONES',
          statePersonal: 'PERSONAL',
          stateReportes: 'REPORTES',
        });
      }     
    });
    */
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
    this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
      console.log("DATAUSER:",respuesta);
      this.control_vistas.setValue({
        name_usuario: respuesta['nombre'],
        lastname_usuario: respuesta['apellido'],
        cargo: respuesta['nombre_cargo'],
        cedula: respuesta['cedula'],
        cuenta: respuesta['cuenta'],
        stateVacaciones: 'VACACIONES',
        statePersonal: 'PERSONAL',
        stateReportes: 'REPORTES',
      });
    });
  }

  goToMenuBotones(){
    this.router.navigate(['/inicio']);
  }

  

  

}
