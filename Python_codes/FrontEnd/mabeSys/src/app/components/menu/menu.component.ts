import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  control_vistas: FormGroup;
  probarRol_IV!: Boolean
  probarRol_RU!: Boolean
  probarRol_D!: Boolean  
  probarRol_IPV!: Boolean
  opcion:number =1;


  constructor(
    private fb: FormBuilder,
    private testuserService: TestuserService
  ) { 
    
    this.control_vistas = this.fb.group({
      name_usuario: ['',Validators.required],
    });
  }

  ngOnInit(): void {
    let Array: string[]=[];
    let Array2: string[]=[];
    this.mostrarDatos();    
    this.control_vistas.controls['name_usuario'].disable();
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.opcion = 0;
    this.testuserService.ConsultarNombrePromotor(user,passw).subscribe(respuesta=>{
        console.log("MENU",user,passw,"RESPONSE:",respuesta);
        if (respuesta != null){
          const json = JSON.stringify(respuesta);
          JSON.parse(json, (key, value) => { 
          if (Array.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
            //console.log('key:'+key+'Array:'+Array.indexOf(key));
            Array.push(value);  
          }                      
        });  
        console.log("DATOS:",Array[0]);       
        this.control_vistas.setValue({
          name_usuario: Array[0],
        });
      }     
    });
    
  }

  mostrarDatos(){
    console.log("MENU ROL:",localStorage.getItem('ROLE') as string)
    if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN'){
      console.log("PROBAR: admin");             
      this.probarRol_IV = true;
      this.probarRol_RU = true;
      this.probarRol_D = true;
      this.probarRol_IPV = true;
    }if (localStorage.getItem('ROLE') as string ==='ROLE_SUPERVISOR') {
      console.log("PROBAR: supervisor"); 
      this.probarRol_IV = false;
      this.probarRol_RU = false;
      this.probarRol_D = true; 
      this.probarRol_IPV = false;  
    }if (localStorage.getItem('ROLE') as string ==='ROLE_USER') {
      console.log("PROBAR: promotor");
      this.probarRol_IV = true;
      this.probarRol_RU = false;
      this.probarRol_D = false; 
      this.probarRol_IPV = false;    
    }
  }

  activate_mostrar_IV(){
    console.log("Active IV");    
    this.opcion=1;
  }
  activate_mostrar_RU(){
    console.log("Active RU"); 
    this.opcion=2;
  }
  activate_mostrar_D(){
    console.log("Active D"); 
    this.opcion=3;
  }
  activate_mostrar_IPV(){
    console.log("Active PDV"); 
    this.opcion=4;
  }

  

  

}
