import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TestuserService } from 'src/app/services/testuser.service';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent {
  myGroup!: FormGroup;
  registrationForm: FormGroup;
  datos = ['test1','test2','test3'];
  NameTienda!: String;

  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
  ){    
    this.registrationForm = this.fb.group({
      vaca_acum: [''], 
      dias_dispo: [''], 
      vacac_tom: [''], 
      vaca_apro: [''], 
      nombreTienda: [''], 
    });
  }

  ngOnInit(): void {
    this.registrationForm.setValue({
      vaca_acum: ['10'], 
      dias_dispo: ['10'], 
      vacac_tom: ['10'], 
      vaca_apro: ['10'], 
      nombreTienda: ['10'], 
    }) 

  }

  changeTienda(e: any) {
  
  }
}


