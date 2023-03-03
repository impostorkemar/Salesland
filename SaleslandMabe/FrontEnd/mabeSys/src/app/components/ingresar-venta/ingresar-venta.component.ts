import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TestuserService } from 'src/app/services/testuser.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import { Venta } from 'src/app/services/Venta';
import { STRING_TYPE } from '@angular/compiler';


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
  ID_LINEAArray: any;
  isSubmitted: boolean;
  selectedTeam: string;
  NameTienda: String;
  id_lineaConsult: number;
  cod_pdv: number;
  thenum: any;
  flagInsert: boolean;
  currentDate!: any;
  startDate!: any;
  weekNumber!: any;
  month!: any;
  monthArray = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
  name: number;
  lineas: any;
  AIRESFLAG: Boolean;
  COCINASFLAG: Boolean;
  EMPOTREFLAG: Boolean;
  GLOBALESFLAG: Boolean;
  LAVADOFLAG: Boolean;
  REFRIGERACIONFLAG: Boolean;  
  COD_PDVArray: string[]=[];
  CLAVE_Array: string[]=[]; 
  CEDULA_Array: string[]=[];

  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private fb3: FormBuilder,
    public  fb4: FormBuilder,
    private testuserService:TestuserService,
    private router:Router,
    private authService: AuthService,    
  ) {    
    this.name = 1;
    this.flagInsert = false;
    this.MenuIngresar = this.fb.group({
      semana: ['',Validators.required],
      id_venta: ['',Validators.required],   
      id_linea: ['',Validators.required],  
      codigo_pdv: ['',Validators.required], 
      message: ['',Validators.required],
    });
    this.ventasUsuario = this.fb2.group({   
      clave: ['',Validators.required],
      cedula: ['',Validators.required],
      id_supervisor: ['',Validators.required],  
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
      total_semanal: ['',Validators.required],
      semana: ['',Validators.required],      
    }) 
    this.myGroup = new FormGroup({
        firstName: new FormControl()
    });
    this.registrationForm = this.fb4.group({
      nombreTienda: ['', [Validators.required]],
      //AIRES: ['', [Validators.required]],  
      //COCINAS: ['', [Validators.required]],  
      //EMPOTRE: ['', [Validators.required]],  
      //GLOBALES: ['', [Validators.required]],  
      //LAVADO: ['', [Validators.required]],  
      //REFRIGERACIÓN: ['', [Validators.required]],       
    });
    this.isSubmitted = false;
    this.selectedTeam = "";   
    this.NameTienda = "";
    this.id_lineaConsult = 0;
    this.cod_pdv = 0;  
    this.AIRESFLAG = true;
    this.COCINASFLAG = true;
    this.EMPOTREFLAG = true;
    this.GLOBALESFLAG = true;
    this.LAVADOFLAG = true;
    this.REFRIGERACIONFLAG = true;
  }
 
  ngOnInit(): void { 
    this.currentDate = new Date();    
    this.startDate = new Date(this.currentDate.getFullYear(), 0, 1);
    var days = Math.floor((this.currentDate - this.startDate)/(24 * 60 * 60 * 1000));
    this.weekNumber = Math.ceil(days / 7);
    //console.log("Week:"+ this.weekNumber, "Month:", this.monthArray[this.currentDate.getMonth()]);    

    this.MenuIngresar.setValue({
      semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
      id_venta: 'ESCOGE TIENDA',   
      id_linea: 'ESCOGE TIENDA',  
      codigo_pdv: 'ESCOGE TIENDA',    
      message: '',
    });
    this.MenuIngresar.controls['semana'].disable();
    this.MenuIngresar.controls['id_venta'].disable();
    this.MenuIngresar.controls['id_linea'].disable();
    this.MenuIngresar.controls['codigo_pdv'].disable();
    this.MenuIngresar.controls['message'].disable();
    
    this.ventasUsuario.setValue({  
      clave: 1,
      cedula: 1,
      id_supervisor: 1,   
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
      total_semanal: 0,
      semana: "",
    });
    
    this.cargarPuntosVenta(); 
    
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
    //console.log("Deslogueo")
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

    //OBTENER NOMBRES PUNTOS DE VENTA

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
      //console.log("CABECERAS:",this.Cabeceras);
      //console.log("DATOS:",this.datos);
      //console.log("EJECUCIONES:",this.Ejecuciones);
      //console.log("RESPONSE:",this.puntosVenta);
    });    
  }

  ObtenerTienda(e: any){
    //console.log("nombreTienda:",this.nombreTienda?.value);
    if (this.nombreTienda?.invalid){      
      this.flagInsert=false;
      this.MenuIngresar.setValue({
        semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
        id_venta: 'ESCOGE TIENDA',   
        id_linea: 'ESCOGE TIENDA',  
        codigo_pdv: 'ESCOGE TIENDA', 
        message: '',             
      });
      this.AIRESFLAG = true;
      this.COCINASFLAG = true;
      this.EMPOTREFLAG = true;
      this.GLOBALESFLAG = true;
      this.LAVADOFLAG = true;
      this.REFRIGERACIONFLAG = true;
      this.ventasUsuario.setValue({  
        clave: 0,
        cedula: 0,
        id_supervisor: 0,   
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
        total_semanal: 0,
        semana: "",
      });
      this.flagInsert=false;    
       
    }else{
      if (this.nombreTienda?.value != null){
        //console.log("ENTRE")
        this.nombreTienda?.setValue(e.target.value, {onlySelf: true,}); 
        this.thenum= (this.nombreTienda?.value as string).match(/\d/g);
        if (this.thenum != null){
          this.thenum = this.thenum.join("");
          this.thenum = (this.thenum as number)-1;
          //console.log("OBJECT->",this.nombreTienda?.value,"DATO[",this.thenum,"]:", this.datos[this.thenum] );
          this.NameTienda = this.datos[this.thenum];
          this.MenuIngresar.setValue({
            semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
            id_venta: '',   
            id_linea: '',  
            codigo_pdv: this.datos[this.thenum], 
            message: ''    
          });         
        } 


        this.ObtenerIdLineaXCodigoPdv_nombreLinea('AIRES',this.NameTienda as string)
        console.log("ID_LINEAArray:",this.ID_LINEAArray)
      }      
    }    
     
  }

  ObtenerIdLineaXCodigoPdv_nombreLinea(buttonType: string, NameTienda: string){ 
    let Array: string[]=[];   
    let Array2: string[]=[]; 
    let Array3: string[]=[];
    this.testuserService.ObtenerIdLineaByCodigoPdv_nombreLinea(buttonType,NameTienda).subscribe(respuesta2=>{
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
      //this.Cabeceras=Array;
      this.ID_LINEAArray=Array2;
      //this.Ejecuciones=Array3; 
      //console.log("CABECERAS:",this.Cabeceras);
      //console.log("DATOS:",this.ID_LINEAArray);
      //console.log("EJECUCIONES:",this.Ejecuciones);
      //console.log("RESPONSE:",this.puntosVenta);      
    });   
    
  }
  
  get nombreTienda() {
    return this.registrationForm.get('nombreTienda');
  }

  changeTienda(e: any) {
    let Array: string[]=[];
    let Array2: string[]=[];
    let Array3: string[]=[]; 
    let Array4: string[]=[];
    if (this.nombreTienda?.invalid){
      this.flagInsert=false;
      this.MenuIngresar.setValue({
        semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
        id_venta: 'ESCOGE TIENDA',   
        id_linea: 'ESCOGE TIENDA',  
        codigo_pdv: 'ESCOGE TIENDA', 
        message: '',             
      });
      this.AIRESFLAG = true;
      this.COCINASFLAG = true;
      this.EMPOTREFLAG = true;
      this.GLOBALESFLAG = true;
      this.LAVADOFLAG = true;
      this.REFRIGERACIONFLAG = true;
      this.ventasUsuario.setValue({  
        clave: 0,
        cedula: 0,
        id_supervisor: 0,   
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
        total_semanal: 0,
        semana: "",
      });
      this.flagInsert=false;
     
    }else{
      this.nombreTienda?.setValue(e.target.value, {
        onlySelf: true,      
      }); 
      this.thenum= (this.nombreTienda?.value as string).match(/\d/g);
      if (this.thenum != null){
        this.thenum = this.thenum.join("");
        this.thenum = (this.thenum as number)-1;
        //console.log("DATO->",this.nombreTienda?.value,"DATO[",this.thenum,"]:", this.datos[this.thenum] );
        this.NameTienda = this.datos[this.thenum];
        this.MenuIngresar.setValue({
          semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
          id_venta: '',   
          id_linea: '',  
          codigo_pdv: this.datos[this.thenum], 
          message: ''    
        });
      }
      //console.log("NameTienda",this.NameTienda)
      this.testuserService.ObtenerCodigoPuntoVenta(this.NameTienda).subscribe(data2=>{
        this.cod_pdv = data2['codigo_pdv'];
        //console.log(data2);
        //console.log("IDS:",this.id_lineaConsult,this.cod_pdv)
        this.testuserService.ObtenerClaveUsuarioByUser_Pass(localStorage.getItem('USER') as string,localStorage.getItem('PASS') as string).subscribe(data3=>{
          const json = JSON.stringify(data3);
          JSON.parse(json, (key, value) => { 
            if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
              //console.log('key:'+key+'Array:'+Array.indexOf(key));
              Array2.push(value);
            }    
          });             
          this.testuserService.ObtenerCedulaUsuarioByClave(Array2[0]).subscribe(data4=>{
            const json2 = JSON.stringify(data4);
            JSON.parse(json2, (key, value) => { 
              if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                //console.log('key:'+key+'Array:'+Array.indexOf(key));
                Array.push(value);
              }    
            });  
            //console.log("CLAVE:",Array2[0],"CEDULA:",Array[0]);           
            this.testuserService.comprobarLineaRegistradaBase(this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",Array[0],this.cod_pdv).subscribe(data6=>{
              const json2 = JSON.stringify(data6);
              JSON.parse(json2, (key, value) => { 
                if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                  //console.log('key:'+key+'Array:'+Array.indexOf(key));
                  Array4.push(value);
                }    
              });
              //console.log("DATA6:",Array4);
              for (let i = 0; i < Array4.length; i++) {              
                if (Array4[i] == 'AIRES'){
                  this.AIRESFLAG = false;
                  //console.log("BOTON ",i ,":",Array4[i]," BLOQUEADO");
                }
                if (Array4[i] == 'COCINAS') {
                  this.COCINASFLAG = false;
                  //console.log("BOTON ",i ,":",Array4[i]," BLOQUEADO");
                }              
                if (Array4[i] == 'EMPOTRE') {
                  this.EMPOTREFLAG = false;
                  //console.log("BOTON ",i ,":",Array4[i]," BLOQUEADO");
                }
                if (Array4[i] == 'GLOBALES') {
                  this.GLOBALESFLAG = false;
                  //console.log("BOTON ",i ,":",Array4[i]," BLOQUEADO");
                }
                if (Array4[i] == 'LAVADO') {
                  this.LAVADOFLAG = false;
                  //console.log("BOTON ",i ,":",Array4[i]," BLOQUEADO");
                }
                if (Array4[i] == 'REFRIGERACIÓN') {
                  this.REFRIGERACIONFLAG = false;
                  //console.log("BOTON ",i ,":",Array4[i]," BLOQUEADO");
                }          
              }   
              if(this.AIRESFLAG === false && this.COCINASFLAG === false && this.EMPOTREFLAG === false 
                && this.GLOBALESFLAG === false && this.LAVADOFLAG === false && this.REFRIGERACIONFLAG === false){
                  this.thenum= (this.nombreTienda?.value as string).match(/\d/g);               
                  if (this.thenum != null){
                    this.thenum = this.thenum.join("");
                    this.thenum = (this.thenum as number)-1;
                    //console.log("DATO->",this.nombreTienda?.value,"DATO[",this.thenum,"]:", this.datos[this.thenum] );
                    this.NameTienda = this.datos[this.thenum];
                    this.MenuIngresar.setValue({
                      semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
                      id_venta: '',   
                      id_linea: '',  
                      codigo_pdv: this.datos[this.thenum], 
                      message: 'SEMANA YA REGISTRADA'    
                    });
                    this.MenuIngresar.controls
                  }
                  this.flagInsert=true;
                  this.name = 0;
              }    
              //this.registrationForm.controls['AIRES'].disable();     
            }); 
          });   
        }); 
      });
    }
  }

  async onSubmit(buttonType: any): Promise<void> {
    let Array: string[]=[];
    let Array2: string[]=[];
    let Array3: string[]=[]; 
    let Array4: string[]=[];
    let Array5: string[]=[];
    //console.log(this.registrationForm);
    this.isSubmitted = true;

    //REGISTRATION FORM  VALID

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
      const total_semanal = this.ventasUsuario.value.total_semanal;
      const semana  = this.ventasUsuario.value.semana;
      //console.log(buttonType,ventas_mabe,ventas_indurama,ventas_whirlpool,ventas_lg,ventas_samsung,ventas_electrolux,
      //  mastertech,hove,teka,smc,otros);
    
    
    }    
    
    //VENTAS USUARIO NO VACÍO

    if (this.ventasUsuario){      

      //NAME TIENDA NO VACÍO

      if (this.NameTienda != ""){

        // OBTENER ID LINEA

        this.testuserService.ObtenerIdLineaByCodigoPdv_nombreLinea(buttonType,this.NameTienda).subscribe(data=>{          
          const json = JSON.stringify(data);
          JSON.parse(json, (key, value) => { 
            if (Array5.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
              //console.log('key:'+key+'Array:'+Array.indexOf(key));
              Array5.push(value);
            }    
          });
          this.id_lineaConsult = Array5[0] as unknown as number;   
          //console.log("id_lineaConsult:",this.id_lineaConsult as unknown as string); 

          //OBTENER CODIGO

          this.testuserService.ObtenerCodigoPuntoVenta(this.NameTienda).subscribe(data2=>{
            this.cod_pdv = data2['codigo_pdv'];
            //console.log(data2);
            console.log("IDS:",this.id_lineaConsult,"\ncod_pdv:",this.cod_pdv)
            this.testuserService.ObtenerClaveUsuarioByUser_Pass(localStorage.getItem('USER') as string,localStorage.getItem('PASS') as string).subscribe(data3=>{
              const json = JSON.stringify(data3);
              JSON.parse(json, (key, value) => { 
                if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                  //console.log('key:'+key+'Array:'+Array.indexOf(key));
                  Array2.push(value);
                }    
              });         
              
              // OBTENER CEDULA

              this.testuserService.ObtenerCedulaUsuarioByClave(Array2[0]).subscribe(data4=>{
                const json2 = JSON.stringify(data4);
                JSON.parse(json2, (key, value) => { 
                  if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                    //console.log('key:'+key+'Array:'+Array.indexOf(key));
                    Array.push(value);
                  }    
                });  
                console.log("CLAVE:",Array2[0],"\nCEDULA:",Array[0]);  

                //OBTENER ID SUPERVISOR

                this.testuserService.ObteneridSupervisorByUser_Pass(localStorage.getItem('USER') as string,localStorage.getItem('PASS') as string).subscribe(data7=>{
                  const json2 = JSON.stringify(data7);
                  JSON.parse(json2, (key, value) => { 
                    if (Array4.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                      //console.log('key:'+key+'Array:'+Array.indexOf(key));
                      Array4.push(value);
                    }
                    console.log("ID SUPERVISOR:",Array4[0]);
                    this.ventasUsuario.setValue({   
                      clave: Array2[0],
                      cedula: Array[0],
                      id_supervisor: Array4[0],  
                      id_linea: this.id_lineaConsult,  
                      codigo_pdv: this.cod_pdv,
                      ventas_mabe: this.ventasUsuario.value.ventas_mabe,
                      ventas_indurama: this.ventasUsuario.value.ventas_indurama,
                      ventas_whirlpool: this.ventasUsuario.value.ventas_whirlpool,
                      ventas_lg: this.ventasUsuario.value.ventas_lg,
                      ventas_samsung: this.ventasUsuario.value.ventas_samsung,
                      ventas_electrolux: this.ventasUsuario.value.ventas_electrolux,
                      mastertech: this.ventasUsuario.value.mastertech,
                      hove: this.ventasUsuario.value.hove,
                      teka: this.ventasUsuario.value.teka,
                      smc: this.ventasUsuario.value.smc,
                      otros: this.ventasUsuario.value.otros,
                      validacion: 1,
                      total_semanal: this.ventasUsuario.value.ventas_mabe+this.ventasUsuario.value.ventas_indurama
                      +this.ventasUsuario.value.ventas_whirlpool+this.ventasUsuario.value.ventas_lg
                      +this.ventasUsuario.value.ventas_samsung+this.ventasUsuario.value.ventas_electrolux
                      +this.ventasUsuario.value.mastertech+this.ventasUsuario.value.hove+this.ventasUsuario.value.teka
                      +this.ventasUsuario.value.smc+this.ventasUsuario.value.otros,
                      semana:this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
                    });

                //COMPROBAR VENTA BY LINEA-SEMANA-CEDULA

                this.testuserService.ComprobarVentatByIdLinea_Semana_Cedula(this.id_lineaConsult,this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
                Array[0],this.cod_pdv).subscribe(data5=>{
                  const json2 = JSON.stringify(data5);
                  JSON.parse(json2, (key, value) => { 
                    if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                      //console.log('key:'+key+'Array:'+Array.indexOf(key));
                      Array3.push(value);
                    }    
                  });
                  //console.log("DATA5:",Array3[0]);

                  if (Array3[0] == null){ //VALIDADOR DE REGISTRO REPETIDO
                    
                    //AGREGAR VENTA
                    console.log("AGREGUE VENTA");
                    console.log(this.ventasUsuario.value);
                    /*this.testuserService.AgregarVenta(this.ventasUsuario.value).subscribe(respuesta=>{
                      //console.log(respuesta);                      
                    });*/

                    this.ventasUsuario.setValue({  
                      clave: 0,
                      cedula: 0,
                      id_supervisor: 0,   
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
                      total_semanal: 0,
                      semana: "",
                    });

                    this.flagInsert=true;    

                    this.MenuIngresar.setValue({            
                      semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
                      id_venta: '',   
                      codigo_pdv: this.datos[this.thenum],
                      id_linea: [buttonType],
                      message: 'DATO INGRESADO CON ÉXITO',            
                    }); 
                    
                    this.name = 1;
                  }else{
                    this.MenuIngresar.setValue({            
                      semana: this.monthArray[this.currentDate.getMonth()]+"-"+this.weekNumber+" SEMANA",
                      id_venta: '',   
                      codigo_pdv: this.datos[this.thenum],
                      id_linea: [buttonType],
                      message: 'REGISTRO REPETIDO',            
                    });
                    this.name = 0;
                  }                  
                });
                }); 
              });              
            });
            this.flagInsert = true;
          });               
        });     
      });   
      }  
    }  
  }



}
