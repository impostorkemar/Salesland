import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent {
  chargeLoginvalue!:Boolean;
  chargeLogoutvalue!:Boolean;

  constructor(
    private router:Router,
    private authService: AuthService
  ) {   
    this.chargeLoginvalue=true;
    this.chargeLogoutvalue=false;
    this.chargeLogin() 
  }

  ngOnInit(): void {
    this.chargeLogin() 
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
