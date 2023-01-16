import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  Usuarios:any;

  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private ruteador:Router
    ) { 
    this.loginUsuario = this.fb.group({
      nombre_usuario: ['',Validators.required],
      password: ['',Validators.required],      
    })
  }

  ngOnInit(): void {

  }

  testUser(){
    const email = this.loginUsuario.value.nombre_usuario;
    const password = this.loginUsuario.value.password;    
    console.log(email,password);
    //this.testuserService.ObtenerUsuarios().subscribe(respuesta=>{
      //console.log(respuesta);
      //this.Usuarios=respuesta;
    //});

    this.testuserService.confirmarUsuario(email,password).subscribe(respuesta2=>{
      if (respuesta2 == null){
        console.log("LOGEO INCORRECTO")
      }else{
        console.log(respuesta2)
        this.ruteador.navigate(['/ingresar_venta'])
      }      
      
    });
  }

}
