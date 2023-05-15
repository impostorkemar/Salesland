import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent {
  chargeLoginvalue!:Boolean;
  chargeLogoutvalue!:Boolean;
  control_vistas!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private crudService: CrudService,
  ) {   
    this.chargeLoginvalue=true;
    this.chargeLogoutvalue=false;
    this.chargeLogin() 

    this.control_vistas = this.fb.group({
      name_usuario: ['',Validators.required],
      lastname_usuario: ['',Validators.required],
      cargo: ['',Validators.required],
      cedula: ['',Validators.required],
      cuenta: ['',Validators.required],      

    });
  }

  ngOnInit(): void {
    this.chargeLogin() 
    this.control_vistas.controls['name_usuario'].disable();    
    this.control_vistas.controls['lastname_usuario'].disable(); 
    this.control_vistas.controls['cargo'].disable(); 
    this.control_vistas.controls['cedula'].disable(); 
    this.control_vistas.controls['cuenta'].disable(); 

    this.mostrarDataUser();
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
      });
    });
  }

  goToExternalLinkVacaciones() {
    //window.location.href = 'http://192.168.0.29:4202/';
    this.router.navigate(['/menu']);
  }
  goToExternalLinkCampusSalesland() {
    window.location.href = 'https://campus.salesland.net/login/login-image/login.php';
  }
  goToExternalLinkControlnet() {
    window.location.href = 'https://erp.controlnet.es/default.aspx?ReturnUrl=%2f';
  }
  goToExternalLinkAracne() {
    window.location.href = 'https://aracnereport.com/';
  }
  navigateToSeguros() {
    this.router.navigate(['/seguros']);
  }
  navigateToViajes() {
    this.router.navigate(['/viajes']);
  }

  navigateToenConstruccion() {
    this.router.navigate(['/enContruccion']);
  }

  chargeLogin():void{
    //console.log("chargeLogin:\n")
    //console.log("USER:",localStorage.getItem('USER') as string)
    //console.log("PASS:",localStorage.getItem('PASS') as string)
    if(localStorage.getItem('USER') as string != null &&  localStorage.getItem('PASS') as string != null){
      this.chargeLoginvalue=false;
      this.chargeLogoutvalue=true; 
    }else{
      this.chargeLoginvalue=true;
      this.chargeLogoutvalue=false;      
    }
    //console.log("chargeLoginvalue:", this.chargeLoginvalue)
    //console.log("chargeLogoutvalue:",this.chargeLogoutvalue)

    
  }

  logout() {
    window.confirm("Cerrando sesión")
    this.authService.logout()
      .subscribe(res => {
        if (!res.success) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      });
  }
  
  

}
