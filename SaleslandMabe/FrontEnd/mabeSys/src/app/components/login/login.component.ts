import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsuario: FormGroup;
  Usuarios:any;
  
  title = 'ng-guard';
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
    private authService: AuthService
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
    
    this.testuserService.confirmarUsuario(email,password).subscribe(respuesta2=>{
      if (respuesta2 == null){
        console.log("LOGEO INCORRECTO")
      }else{        
        console.log("RESPUESTA2:",respuesta2['tipo']);        
        if (respuesta2['tipo'] as string == 'admin'){
          console.log("COMPARA: admin")
          this.login('ROLE_ADMIN');          
        }if (respuesta2['tipo'] as string ==='supervisor') {
          console.log("COMPARA: supervisor")
          this.login('ROLE_SUPERVISOR');
        }if (respuesta2['tipo'] as string ==='promotor') {
          console.log("COMPARA: promotor")
          this.login('ROLE_USER');
        } 
        localStorage.setItem('USER', email);
        localStorage.setItem('PASS', password);
        console.log("ROLE:",localStorage.getItem('ROLE') as string)
        console.log("USER:",localStorage.getItem('USER') as string)
        console.log("PASS:",localStorage.getItem('PASS') as string)
        this.router.navigate(['/menu']);
      }      
      
    });
  }
  login(val: string) {
    this.authService.login(val)
      .subscribe(res => {
        if (res.success) {
          //this.closeModal.nativeElement.click();
          console.log("LOGEO EXITOSO");
        }
      });
  }

  logout() {
    this.authService.logout()
      .subscribe(res => {
        if (!res.success) {
          this.router.navigate(['/login']);
        }
      });
  }

  goToDashBoard() {
    let role = this.authService.getRole();
    if (role === 'ROLE_ADMIN')
      this.router.navigate(['/ingresar_venta']);
    if (role === 'ROLE_USER')
      this.router.navigate(['/ingresar_venta']);
    if (role === 'ROLE_SUPERVISOR')
      this.router.navigate(['/ingresar_venta']);

  }

}
