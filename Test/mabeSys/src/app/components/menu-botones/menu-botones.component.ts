import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-menu-botones',
  templateUrl: './menu-botones.component.html',
  styleUrls: ['./menu-botones.component.css']
})
export class MenuBotonesComponent {
  centroCostoFlag!:Boolean
  mabeOptionsFlag!:Boolean
  constructor(
    private router:Router,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
   this.ValidarCentroCosto();
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

  goToExternalLinkAmigosMABE() {
    window.location.href = 'https://www.amigosmabeplus.com/index.php';
  }

  ValidarCentroCosto(){
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string    
    this.crudService.ObtenerCentroCostoByUserAndPass(user,passw).subscribe(respuesta=>{
      console.log("cuenta:\n",respuesta['cuenta'])
      if(respuesta['cuenta'] == 'Estructura' || respuesta['cuenta'] == 'MOVISTAR' ){
        this.centroCostoFlag=true;
        this.mabeOptionsFlag=false;
      }else{
        this.centroCostoFlag=false;
        this.mabeOptionsFlag=true;
      }

    })

    

  }


}
