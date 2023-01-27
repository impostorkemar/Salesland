import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import { Venta } from 'src/app/services/Venta';


@Component({
  selector: 'app-ingresar-venta',
  templateUrl: './ingresar-venta.component.html',
  styleUrls: ['./ingresar-venta.component.css']
})
export class IngresarVentaComponent implements OnInit {
  myGroup!: FormGroup;
  ventasUsuario: FormGroup;
  MenuIngresar:FormGroup;  
  registrationForm: FormGroup;
  ondisabled = true;
  disabled = false;
  rolUser = "'su";
  puntosVenta : any;
  Cabeceras:any;
  Ejecuciones:any; 
  datos:any;
  codigoPdv: any;
  isSubmitted: boolean;
  selectedTeam: string;
  NameTienda: String;
  id_lineaConsult: number;
  cod_pdv: number;
  thenum: any;
  flagInsert: boolean;

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private fb3: FormBuilder,
    public  fb4: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
    private authService: AuthService,    
  ) {    
    this.flagInsert = false;
    this.MenuIngresar = this.fb.group({
      id_venta: ['',Validators.required],   
      id_linea: ['',Validators.required],  
      codigo_pdv: ['',Validators.required], 
      message: ['',Validators.required],
    });
    this.ventasUsuario = this.fb2.group({     
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
      validacion: ['',Validators.required],
    }) 
    this.myGroup = new FormGroup({
        firstName: new FormControl()
    });
    this.registrationForm = this.fb4.group({
      nombreTienda: ['', [Validators.required]],     
    });
    this.isSubmitted = false;
    this.selectedTeam = "";   
    this.NameTienda = "";
    this.id_lineaConsult = 0;
    this.cod_pdv = 0;  
      
  }
 
  ngOnInit(): void {    
    
    this.MenuIngresar.setValue({
      id_venta: 'ESCOGE TIENDA',   
      id_linea: 'ESCOGE TIENDA',  
      codigo_pdv: 'ESCOGE TIENDA',    
      message: '',
    });
    
    this.MenuIngresar.controls['id_venta'].disable();
    this.MenuIngresar.controls['id_linea'].disable();
    this.MenuIngresar.controls['codigo_pdv'].disable();
    this.MenuIngresar.controls['message'].disable();
    
    this.ventasUsuario.setValue({     
      id_linea: 1,  
      codigo_pdv: 1,
      ventas_mabe: 0,
      ventas_indurama: 0,
      ventas_whirlpool: 0,
      ventas_lg: 0,
      ventas_samsung: 0,
      ventas_electrolux: 0,
      mastertech: 0,
      hove: 0,
      teka: 0,
      smc: 0,
      otros: 0,
      validacion: 1,
    });
    
    this.cargarPuntosVenta() 
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
   
    //console.log(id_venta,id_linea,codigo_pdv,ventas_mabe,ventas_indurama,ventas_whirlpool,ventas_lg,ventas_samsung,
    //  ventas_electrolux,mastertech,hove,teka,smc,otros);
    
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

  cargarPuntosVenta(){
    let Array: string[]=[];
    let Array2: string[]=[];
    let Array3: string[]=[]; 
    let Array4: string[]=[];
    this.testuserService.ObtenerNombresPuntosVenta(localStorage.getItem('USER'),localStorage.getItem('PASS')).subscribe(respuesta2=>{
      this.puntosVenta = respuesta2;      
      const json = JSON.stringify(respuesta2);
      JSON.parse(json, (key, value) => { 
        if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
          //console.log('key:'+key+'Array:'+Array.indexOf(key));
          Array2.push(value);    
          //Array3.push("consulta.".concat(key.toString()))  
          Array3.push(key.toString())
        }
        let aux=(key.replaceAll("_"," ")).toUpperCase();
        if (Array.indexOf(aux)==-1 && isNaN(parseInt(aux, 10)) && aux!=''){
          //console.log('aux:'+aux+'Array:'+Array.indexOf(aux));
          Array.push((aux.replaceAll("_"," ")).toUpperCase());             
        }            
                       
      });
      this.Cabeceras=Array;
      this.datos=Array2;
      this.Ejecuciones=Array3; 
      console.log("CABECERAS:",this.Cabeceras);
      console.log("DATOS:",this.datos);
      console.log("EJECUCIONES:",this.Ejecuciones);
      console.log("RESPONSE:",this.puntosVenta);
    });
    
  }
  get nombreTienda() {
    return this.registrationForm.get('nombreTienda');
  }

  changeTienda(e: any) {
    if (this.nombreTienda?.invalid){
      this.flagInsert=false;
      this.MenuIngresar.setValue({
        id_venta: 'ESCOGE TIENDA',   
        id_linea: 'ESCOGE TIENDA',  
        codigo_pdv: 'ESCOGE TIENDA', 
        message: '',             
      });
      this.ventasUsuario.setValue({     
        id_linea: 0,  
        codigo_pdv: 0,
        ventas_mabe: 0,
        ventas_indurama: 0,
        ventas_whirlpool: 0,
        ventas_lg: 0,
        ventas_samsung: 0,
        ventas_electrolux: 0,
        mastertech: 0,
        hove: 0,
        teka: 0,
        smc: 0,
        otros: 0,
        validacion: 1,
      });
    }
    this.nombreTienda?.setValue(e.target.value, {
      onlySelf: true,      
    }); 
    this.thenum= (this.nombreTienda?.value as string).match(/\d/g);
    if (this.thenum != null){
      this.thenum = this.thenum.join("");
      this.thenum = (this.thenum as number)-1;
      console.log("DATO->",this.nombreTienda?.value,"DATO[",this.thenum,"]:", this.datos[this.thenum] );
      this.NameTienda = this.datos[this.thenum];
      this.MenuIngresar.setValue({
        id_venta: '',   
        id_linea: '',  
        codigo_pdv: this.datos[this.thenum], 
        message: ''    
      });
    }
    
  }

  async onSubmit(buttonType: any): Promise<void> {
   
    //console.log(this.registrationForm);
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      false;      
    } else {      
      const ventas_mabe = this.ventasUsuario.value.mabe;
      const ventas_indurama = this.ventasUsuario.value.indurama;
      const ventas_whirlpool = this.ventasUsuario.value.whirlpool;
      const ventas_lg = this.ventasUsuario.value.lg;
      const ventas_samsung = this.ventasUsuario.value.samsung;
      const ventas_electrolux = this.ventasUsuario.value.electrolux;
      const mastertech = this.ventasUsuario.value.mastertech;
      const hove = this.ventasUsuario.value.hove;
      const teka = this.ventasUsuario.value.teka;
      const smc = this.ventasUsuario.value.smc;
      const otros = this.ventasUsuario.value.otros;
      //console.log(buttonType,ventas_mabe,ventas_indurama,ventas_whirlpool,ventas_lg,ventas_samsung,ventas_electrolux,
      //  mastertech,hove,teka,smc,otros);
    }    
    
    if (this.ventasUsuario){
      console.log(this.ventasUsuario.value)
      if (this.NameTienda != ""){
        this.testuserService.ObtenerIdLineaByCodigoPdv_nombreLinea(buttonType,this.NameTienda).subscribe(data=>{
          this.id_lineaConsult = data['id_linea'];   
          //console.log(data);   
          this.testuserService.ObtenerCodigoPuntoVenta(this.NameTienda).subscribe(data2=>{
            this.cod_pdv = data2['codigo_pdv'];
            //console.log(data2);
            console.log("IDS:",this.id_lineaConsult,this.cod_pdv)
            this.ventasUsuario.setValue({     
              id_linea: this.id_lineaConsult,  
              codigo_pdv: this.cod_pdv,
              ventas_mabe: 0,
              ventas_indurama: 0,
              ventas_whirlpool: 0,
              ventas_lg: 0,
              ventas_samsung: 0,
              ventas_electrolux: 0,
              mastertech: 0,
              hove: 0,
              teka: 0,
              smc: 0,
              otros: 0,
              validacion: 1,
            });
            this.flagInsert=true;
            this.MenuIngresar.setValue({
              id_venta: '',   
              codigo_pdv: this.datos[this.thenum],
              id_linea: [buttonType],
              message: 'DATO INGRESADO CON ÉXITO',
            });
            console.log(this.ventasUsuario.value)
            this.testuserService.AgregarVenta(this.ventasUsuario.value).subscribe(respuesta=>{
              console.log(respuesta);
            });

            this.flagInsert = true;
          });               
        });
                
        
      }      
      
    }       
    
  }
  

  

}
