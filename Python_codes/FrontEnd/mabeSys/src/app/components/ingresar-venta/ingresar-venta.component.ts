import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {
  ventasUsuario: FormGroup;
  ondisabled = true;
  disabled = false;
  
  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private ruteador:Router
  ) { 
    this.ventasUsuario = this.fb.group({
      id_venta: ['',Validators.required],
      id_linea: ['',Validators.required],  
      codigo_pdv: ['',Validators.required],
      ventas_mabe: ['',Validators.required],
      ventas_indurama: ['',Validators.required],
      ventas_whirlpool: ['',Validators.required],
      ventas_lg: ['',Validators.required],
      ventas_samsung: ['',Validators.required],
      ventas_electrolux: ['',Validators.required],
      mastertech: ['',Validators.required],
      hove: ['',Validators.required],
      teka: ['',Validators.required],    
      smc: ['',Validators.required],  
      otros: ['',Validators.required],  
    })

  }

  ngOnInit(): void {
    this.ventasUsuario.setValue({
      id_venta: ['1'],
      id_linea: ['1'],  
      codigo_pdv: ['1'],
      ventas_mabe: [''],
      ventas_indurama: [''],
      ventas_whirlpool: [''],
      ventas_lg: [''],
      ventas_samsung: [''],
      ventas_electrolux: [''],
      mastertech: [''],
      hove: [''],
      teka: [''],    
      smc: [''],  
      otros: [''],
    });
    this.ventasUsuario.controls['id_venta'].disable();
    this.ventasUsuario.controls['id_linea'].disable();
    this.ventasUsuario.controls['codigo_pdv'].disable();
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

}
