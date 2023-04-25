import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { Viaje } from '../../classModels/Viaje';

@Component({
  selector: 'app-menu-viajes',
  templateUrl: './menu-viajes.component.html',
  styleUrls: ['./menu-viajes.component.css']
})
export class MenuViajesComponent {
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
    this.control_vistas.controls['cedula'].disable();    
    this.control_vistas.controls['cuenta'].disable();    
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
    this.menuViajes2(1)
  }

  mostrarDataUser(){
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
      console.log("DATAUSER:",respuesta);
      this.control_vistas.setValue({
        name_usuario: respuesta['nombre'],
        lastname_usuario: respuesta['apellido'],
        cedula: respuesta['cedula'],
        cuenta: respuesta['cuenta'],
        stateVacaciones: 'VACACIONES',
        statePersonal: 'PERSONAL',
        stateReportes: 'REPORTES',
      });
    });
  }
  
  menuViajes2(op: number){
    console.log("value:",op)
    if (op as unknown as string == '1'){      
      this.nombreVentana='INGRESO-VIAJES';
      console.log("OPCION:",this.nombreVentana);
      
    }else if (op as unknown as string == '2'){      
      this.nombreVentana='REPORTE-PERSONAL';
      console.log("OPCION:",this.nombreVentana);
    }else{
      console.log("OPCION: VACIO");
    }
  } 

  goToMenuBotones(){
    this.router.navigate(['/menuBotones']);
  }

}
