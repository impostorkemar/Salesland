import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar-punto-venta',
  templateUrl: './registrar-punto-venta.component.html',
  styleUrls: ['./registrar-punto-venta.component.css']
})
export class RegistrarPuntoVentaComponent {
  myGroup!: FormGroup;
  MenuIngresar:FormGroup;
  lineas: FormGroup;
  ondisabled = true;
  disabled = false;
  rolUser = "'su";
  
  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
    private authService: AuthService,
  ) { 
    this.MenuIngresar = this.fb.group({
      codigo_pdv: ['',Validators.required],
      nombre_pdv: ['',Validators.required],  
      retail_mapping: ['',Validators.required],
      cobertura: ['',Validators.required],
      nombre_cliente: ['',Validators.required]
    });    
    this.lineas = this.fb.group({
      check: ['',Validators.required],
      cuota: ['',Validators.required] 
    })
    this.myGroup = new FormGroup({
      lineas: this.lineas,
      MenuIngresar: this.MenuIngresar
    });    

  }

  ngOnInit(): void {
    
    this.MenuIngresar.setValue({
      codigo_pdv: ['1'],
      nombre_pdv: ['1'],  
      retail_mapping: ['1'],   
      cobertura: ['1'],
      nombre_cliente: ['1']   
    });    
    
    this.MenuIngresar.controls['codigo_pdv'].disable();
    this.MenuIngresar.controls['nombre_pdv'].disable();
    
    this.lineas.setValue({  
      check: ['check'],  
      cuota: ['0'] 
    })
  }

  registrarVenta(): void {           
    console.log("test");    
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
