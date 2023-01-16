import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.registrarUsuario = this.fb.group({
      nombre_usuario: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],
    })
  }

  ngOnInit(): void {
  }
  registrar(){
    const email = this.registrarUsuario.value.nombre_usuario;
    const password = this.registrarUsuario.value.password;
    const password2 = this.registrarUsuario.value.password2;
    if ( password !== password2 ) {
     console.log('Invalid password'); 
    }
    console.log(email,password,password2);

  }
}
