import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  recuperarUsuario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recuperarUsuario = this.fb.group({
      email: ['',Validators.required],      
    })
   }

  ngOnInit(): void {
  }

}
