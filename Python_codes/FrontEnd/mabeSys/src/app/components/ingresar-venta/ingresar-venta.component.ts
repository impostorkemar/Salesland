import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {
  myGroup!: FormGroup;
  ventasUsuario: FormGroup;
  MenuIngresar:FormGroup;
  ondisabled = true;
  disabled = false;
  rolUser = "'su";
  
  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
    private authService: AuthService,
  ) { 
    this.myGroup = new FormGroup({});
    this.MenuIngresar = this.fb.group({
      id_venta: ['',Validators.required],
      id_linea: ['',Validators.required],  
      codigo_pdv: ['',Validators.required]
    });
    this.ventasUsuario = this.fb.group({
      otros: ['',Validators.required] 
    })

  }

  ngOnInit(): void {
    
    this.MenuIngresar.setValue({
      id_venta: ['1'],
      id_linea: ['1'],  
      codigo_pdv: ['1'],      
    });
    this.MenuIngresar.controls['id_venta'].disable();
    this.MenuIngresar.controls['id_linea'].disable();
    this.MenuIngresar.controls['codigo_pdv'].disable();
  }

  registrarVenta(): void {
    
    const id_venta = this.ventasUsuario.value.nombre_usuario;
    const id_linea = this.ventasUsuario.value.password;    
    const codigo_pdv = this.ventasUsuario.value.nombre_usuario;
    const ventas_mabe = this.ventasUsuario.value.password;
    const ventas_indurama = this.ventasUsuario.value.nombre_usuario;
    const ventas_whirlpool = this.ventasUsuario.value.password;
    const ventas_lg = this.ventasUsuario.value.nombre_usuario;
    const ventas_samsung = this.ventasUsuario.value.password;
    const ventas_electrolux = this.ventasUsuario.value.nombre_usuario;
    const mastertech = this.ventasUsuario.value.password;
    const hove = this.ventasUsuario.value.password;
    const teka = this.ventasUsuario.value.password;
    const smc = this.ventasUsuario.value.password;
    const otros = this.ventasUsuario.value.password;    
   
    console.log(id_venta,id_linea,codigo_pdv,ventas_mabe,ventas_indurama,ventas_whirlpool,ventas_lg,ventas_samsung,
      ventas_electrolux,mastertech,hove,teka,smc,otros);
    
  }

  logout() {
    console.log("Deslogueo")
    this.authService.logout()
      .subscribe(res => {
        if (!res.success) {
          this.router.navigate(['/login']);

        }
      });
  }
  

}
