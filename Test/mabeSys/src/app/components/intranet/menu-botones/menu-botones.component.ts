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
  showPolitics!:Boolean

  constructor(
    private router:Router,
    private crudService: CrudService,
  ) {}

  ngOnInit(): void {
   this.ValidarCentroCosto();
   this.showPolitics=false;
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
    this.router.navigate(['/menuViaje']);
  }

  navigateToenConstruccion() {
    this.router.navigate(['/enContruccion']);
  }

  navigateToRolPagos() {
    this.router.navigate(['/menuRolPago']);
  }

  goToExternalLinkAmigosMABE() {
    window.location.href = 'https://www.amigosmabeplus.com/index.php';
  }
  
  goToExternalLinkTickets() {
    window.location.href = 'http://192.168.0.101/soporte/upload/index.php';
  }

  goToExternalLinkpostulateEspana() {
    window.location.href = 'https://empleo.salesland.net/ec/ofertas-empleo';
  }

  ValidarCentroCosto(){
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string;  
    this.crudService.ObtenerCentroCostoByUserAndPass(user,passw).subscribe(respuesta=>{
      console.log("cuenta:\n",respuesta['cuenta'])
      if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN' ){
        this.centroCostoFlag=true;
        this.mabeOptionsFlag=true;
      }else{
        if(respuesta['cuenta'] == 'Estructura' || respuesta['cuenta'] == 'MOVISTAR' || respuesta['cuenta'] == 'Administracion' ){
          this.centroCostoFlag=true;
          this.mabeOptionsFlag=false;
        }else{
          this.centroCostoFlag=false;
          this.mabeOptionsFlag=true;
        }
      }
    })
  }

  togglePolitics() {
    this.showPolitics = !this.showPolitics;
  }

  redirectToPublicidad1() {
    this.router.navigate(['/publicidad1']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }

  redirectToPublicidad2() {
    this.router.navigate(['/publicidad2']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }

  redirectToPublicidad3() {
    this.router.navigate(['/publicidad3']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }

  redirectToPublicidad4() {
    this.router.navigate(['/publicidad4']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }

  redirectToPublicidad5() {
    this.router.navigate(['/publicidad5']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }

  redirectToPublicidad6() {
    this.router.navigate(['/publicidad6']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }

  redirectTotReglamentoInterno() {
    this.router.navigate(['/politics']); // Reemplaza '/publicidad1' con la ruta correcta para el componente de publicidad1
  }


}
