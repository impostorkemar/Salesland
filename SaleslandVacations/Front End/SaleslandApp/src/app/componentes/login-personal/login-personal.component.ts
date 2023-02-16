import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { toChildArray } from 'preact';
import { CrudService } from '../../servicio/crud.service';

@Component({
  selector: 'app-login-personal',
  templateUrl: './login-personal.component.html',
  styleUrls: ['./login-personal.component.css']
})
export class LoginPersonalComponent implements OnInit {

  formularioDeUsuario:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService
    ) {
    this.formularioDeUsuario = this.formulario.group({
      cedula:[""],
      nombre_usuario:[""],
      password:[""]
    });
  }
  ngOnInit(): void {
  }
  consultarLogin(): void{ 
  }

}
