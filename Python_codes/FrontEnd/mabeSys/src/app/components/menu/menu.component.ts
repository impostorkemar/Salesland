import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  probarRol_IV!: Boolean
  probarRol_RU!: Boolean
  probarRol_D!: Boolean 
  mostrar_IV!: Boolean
  mostrar_RU!: Boolean
  mostrar_D!: Boolean
  constructor() { }

  ngOnInit(): void {
    this.mostrarDatos();
    this.mostrar_IV = false;
    this.mostrar_RU = false;
    this.mostrar_D = false;

  }

  mostrarDatos(){
    console.log("MENU ROL:",localStorage.getItem('ROLE') as string)
    if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN'){
      console.log("PROBAR: admin");             
      this.probarRol_IV = true;
      this.probarRol_RU = true;
      this.probarRol_D = true;
    }if (localStorage.getItem('ROLE') as string ==='ROLE_SUPERVISOR') {
      console.log("PROBAR: supervisor"); 
      this.probarRol_IV = false;
      this.probarRol_RU = false;
      this.probarRol_D = true;   
    }if (localStorage.getItem('ROLE') as string ==='ROLE_USER') {
      console.log("PROBAR: promotor");
      this.probarRol_IV = true;
      this.probarRol_RU = false;
      this.probarRol_D = false;     
    }
  }

  activate_mostrar_IV(){
    this.mostrar_IV=true;
  }
  

}
