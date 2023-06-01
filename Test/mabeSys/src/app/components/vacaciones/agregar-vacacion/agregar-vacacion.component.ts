import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbDateStruct,NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import * as moment from 'moment';
import { TestuserService } from 'src/app/services/testuser.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { NONE_TYPE } from '@angular/compiler';



@Component({
  selector: 'app-agregar-vacacion',  
  templateUrl: './agregar-vacacion.component.html',
  styleUrls: ['./agregar-vacacion.component.css'],
  providers: [DecimalPipe],
  
})
export class AgregarVacacionComponent {
  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null = null;
  cedula!: any;
  formularioDeVacacion:FormGroup;
  btnIngresar: boolean;
  fechaActual!:Date;
  corte!: NgbDate;
  contrato!: Date;
  antiguedad!: number;
  resp!:String[];
  message!:String;
  user!:String;
  passw!:String;
  msg!: any;
  vacasDispo!:any;
  fechaSeleccionada!:any;
  Motivos!:any;
  seleccionMotivo !:any;
  showCalendar: boolean = false;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router,
    calendar: NgbCalendar,
    private testuserService: TestuserService,    
    private _decimalPipe: DecimalPipe,
    private router:Router,
    private route: ActivatedRoute
  ) { 
    this.formularioDeVacacion = this.formulario.group({      
      vaca_disp:[''],
      dias_solicitudes_pen:[''],
      dias_tomados:[''],
      dias_seleccionados:[''], 
      saldo_dias:[''],          
      lbl_inicio:[''],
      lbl_fin:[''],
      motivo: [''],
    });
        
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.cedula = "";
    this.btnIngresar = false;   
    this.fechaActual =  new Date();
    this.corte = new NgbDate(0,0,0);
    this.contrato = new Date();
    this.antiguedad = 0;
    this.message="";
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
    this.btnIngresar = true;
    this.msg = "";
    this.vacasDispo = 0;
  }

  ngOnInit(): void {
    this.formularioDeVacacion.controls['vaca_disp'].disable();
    this.formularioDeVacacion.controls['dias_solicitudes_pen'].disable();
    this.formularioDeVacacion.controls['dias_tomados'].disable();
    this.formularioDeVacacion.controls['dias_seleccionados'].disable();
    this.formularioDeVacacion.controls['saldo_dias'].disable();      
    this.formularioDeVacacion.controls['lbl_inicio'].disable();
    this.formularioDeVacacion.controls['lbl_fin'].disable();
    this.precargarDias();  
    
  }

  toggleCalendar() {
    this.showCalendar = !this.showCalendar;
  }

   //RESPONSE
  setRespen(response: any, name:string) {
    this.resp = response;
    localStorage.removeItem(name);
    localStorage.setItem(name, JSON.stringify(response));
    //console.log(name,":",localStorage.getItem(name));
    }
  getRespen(name:string) {
    return JSON.parse(localStorage.getItem(name) as string);
  }

  precargarDias(){        

    //CARGA CEDULA USER

    this.crudService.ObtenerCedulaByUser_Pass(this.user,this.passw).subscribe(respuesta=>{
      this.cedula = respuesta['cedula'];    

        //CARGA FECHA INICIO CONTRATO

        this.crudService.ObtenerFechaInicioContrato(this.cedula).subscribe(respuesta2=>{

          if (respuesta2 != null){
            const datePipe = new DatePipe('en-US'); 
            var corteYear = new Date().getFullYear();
            this.corte =  new NgbDate(corteYear,1,31);      
            //console.log("corte:",this.corte)        
            //this.contrato = new Date((Value2[0] as string));  

            this.contrato = new Date((respuesta2['fechaContrato'] as string));
           
            var yearCal = (this.corte.year-this.contrato.getFullYear())*12
            //console.log("this.corte.month\n:",this.corte.month,"\nthis.contrato.getMonth():",this.contrato.getMonth())
            var monthCal = (this.corte.month-(this.contrato.getMonth()+1))
            var dateCal = (this.corte.day-this.contrato.getDate())/30
            //console.log("Year\n:",yearCal,"monthCal\n:",monthCal,"dateCal\n:",dateCal)
            var antiguedadAux = (yearCal+monthCal+dateCal)
            //console.log("Antiguedad:",antiguedadAux)
            this.antiguedad = (this._decimalPipe.transform(antiguedadAux*1.25,"1.0-1") as any) as number;           
            var antiguedadCal = this.antiguedad;

            //CARGA VACACIONES TOMADAS
            console.log("antiguedadCal->this.antiguedad",respuesta2['fechaContrato'])
            if ( antiguedadCal != null){
              this.crudService.ObtenertotalVacacionesTomadas(this.user,this.passw).subscribe(respuesta=>{
                
                var totalVacasTomadas = respuesta['VACA_PREV'];  
                console.log("totalVacasTomadas->totalVacacionesAprobadas",respuesta['VACA_PREV'])            
                this.crudService.ObtenertotalVacacionesTomadasPendientes(this.user,this.passw).subscribe(respuesta15=>{
                  
                  var totalVacasPendientes = respuesta15['VACA_PREV']
                  console.log(respuesta15)
                  console.log("totalVacasPendientes->totalVacacionesPendientes:",respuesta15['VACA_PREV'])

                  this.crudService.ObtenerMotivosVacaciones("vacaciones").subscribe(respuesta16=>{
                    this.Motivos = respuesta16;
                    
                    console.log("Motivos:",this.Motivos[0])
                    console.log("vaca_disp:",antiguedadCal-totalVacasTomadas)
                    if ( totalVacasTomadas == null && totalVacasPendientes == null){ // VACA PREV
                      this.formularioDeVacacion.setValue({
                        vaca_disp: antiguedadCal, //vacaciones por contrato                        
                        dias_solicitudes_pen: 0, // vacaciones tomadas
                        dias_tomados:0,                        
                        saldo_dias: antiguedadCal,
                        dias_seleccionados: 0, 
                        lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
                        lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
                        motivo:[this.Motivos.length > 0 ? this.Motivos[0].nombre : '']
                      });
                    }else if (totalVacasTomadas == null && totalVacasPendientes != null){
                      this.formularioDeVacacion.setValue({
                        vaca_disp: antiguedadCal, //vacaciones por contrato                        
                        dias_solicitudes_pen: totalVacasPendientes, // vacaciones tomadas
                        dias_tomados:0,                        
                        saldo_dias: antiguedadCal,
                        dias_seleccionados: 0, 
                        lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
                        lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
                        motivo:[this.Motivos.length > 0 ? this.Motivos[0].nombre : '']
                      });
                    
                    }else if (totalVacasTomadas != null && totalVacasPendientes == null){ // VACA PREV PEND
                      this.formularioDeVacacion.setValue({ 
                        vaca_disp: antiguedadCal,  //vacaciones por contrato
                        dias_solicitudes_pen: 0, // vacaciones tomadas
                        dias_tomados:totalVacasTomadas,                   
                        saldo_dias: antiguedadCal-totalVacasTomadas-totalVacasPendientes, //vacaciones saldo  
                        dias_seleccionados: 0, 
                        lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
                        lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
                        motivo:[this.Motivos.length > 0 ? this.Motivos[0].nombre : '']                       
                      });                                       
                    }else{
                      if (this.toDate){
                        this.formularioDeVacacion.setValue({      
                          vaca_disp: antiguedadCal,  //vacaciones por contrato
                          dias_tomados:totalVacasTomadas,
                          dias_solicitudes_pen: totalVacasPendientes, // vacaciones tomadas
                          dias_seleccionados: 0, 
                          saldo_dias: antiguedadCal-totalVacasTomadas-totalVacasPendientes, //vacaciones saldo                                                  
                          lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
                          lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
                          motivo:[this.Motivos.length > 0 ? this.Motivos[0].nombre : '']
                        });
                        this.btnIngresar = false
                      }else{
                        this.btnIngresar = true
                      }
                      
                    }
                  })
                });             
              
              });
          }
          }else{
            window.confirm("Usuario sin perfil de contrato")
          }
        });        
    });    


  }
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeVacacion){     
       
      let key4: string[]=[];
      let Value4: string[]=[]; 

      
     
      //BUSQUEDA ID PERSONAL
      
      if ( this.fromDate != null && this.toDate != null){
        console.log(" FROM DATE && TO DATE"); 
        console.log("fromDate:",this.fromDate,"\ntoDate:",this.toDate);
        console.log(this.isFriday(this.toDate));

        if(!this.isFriday(this.toDate)){

          console.log("Not Friday")
          this.crudService.ObtenerExistenciaVacacionesByInicioFin(this.user,this.passw,this.fromDate?.year+"-"+
          this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
          this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta10 =>{          
            
            console.log("FECHAS_CAL:",respuesta10['FECHAS_CAL']);
            
            if(respuesta10['FECHAS_CAL'] as unknown as number == 0 || respuesta10['FECHAS_CAL'] == null){
              console.log("PUEDE REGISTRAR 0:");
              this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                
                //AGREGAR VACACION
                
                if (
                  this.formularioDeVacacion.get('vaca_disp')?.value
                  >= 
                  (this.formularioDeVacacion.get('dias_seleccionados')?.value
                  +
                  this.formularioDeVacacion.get('dias_solicitudes_pen')?.value
                  +
                  this.formularioDeVacacion.get('dias_tomados')?.value)
                ){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.toDate?.year+"-"+this.toDate?.month+"-"+
                  this.toDate?.day)){

                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                    this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+this.toDate?.month+"-"+
                    this.toDate?.day,this.formularioDeVacacion.get('dias_seleccionados')?.value as number,
                    this.formularioDeVacacion.get('vaca_disp')?.value as number, 
                    this.seleccionMotivo).subscribe(respuesta22=>{
                      this.btnIngresar = true;
                      this.precargarDias();
                      
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadMenuComponent();
                      }
                  });
                }            
              }else{
                window.confirm("Excede días disponibles")
                //console.log("Excede días disponibles");
              }              
              });
            }else if (respuesta10['FECHAS_CAL'] as unknown as number > 0){
              console.log("PUEDE REGISTRAR >0:");
              this.crudService.ObteneVacacionesAReasignarByUserPasswordFechasInfo(this.user,this.passw,this.fromDate?.year+"-"+
              this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
              this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta13 =>{

                console.log("respuesta13:",respuesta13);
                var msg = "";
                for ( let item of respuesta13) {
                  //console.log("item:",item);
                  let antiguedadCal = Object.values(item);
                  msg = msg +"\nID:" + antiguedadCal[0]+ "\nFecha Inicio:" + antiguedadCal[1] + "\nFecha Fin:" + antiguedadCal[2] ; 
                }              
                var aux = "CONFLICTO CON LAS SOLICITUDES DE VACACIÓN:\n"+ msg as string;
                //console.log("aux:"+ aux);
                window.confirm(aux)
              });
            }
          });

        }else{         
          console.log("Its friday");         
          this.toDate=NgbDate.from(this.dateToNgbDate(this.addDays(2,this.toDate)))
          console.log("date+2:\n",this.toDate)

          var diferenciaDias = this.countWorkDay(this.fromDate,this.toDate);
          //console.log("diferenciaDias: ",diferenciaDias)
          if (diferenciaDias != null && this.Motivos != null){
            this.formularioDeVacacion.setValue({
              vaca_disp:this.formularioDeVacacion.get('vaca_disp')?.value,
              dias_solicitudes_pen: this.formularioDeVacacion.get('dias_solicitudes_pen')?.value, 
              dias_tomados: this.formularioDeVacacion.get('dias_tomados')?.value, 
              dias_seleccionados:diferenciaDias,        
              saldo_dias:this.formularioDeVacacion.get('saldo_dias')?.value,   
              lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
              motivo:this.formularioDeVacacion.get('motivo')?.value
            }); 
          }

          this.crudService.ObtenerExistenciaVacacionesByInicioFin(this.user,this.passw,this.fromDate?.year+"-"+
          this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
          this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta10 =>{          
            
            console.log("FECHAS_CAL:",respuesta10['FECHAS_CAL']);
            
            if(respuesta10['FECHAS_CAL'] as unknown as number === 0 || respuesta10['FECHAS_CAL'] === null){
              console.log("PUEDE REGISTRAR 0:");
              this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                
                //AGREGAR VACACION
                
                if (
                  this.formularioDeVacacion.get('vaca_disp')?.value
                  >= 
                  (this.formularioDeVacacion.get('dias_seleccionados')?.value
                  +
                  this.formularioDeVacacion.get('dias_solicitudes_pen')?.value
                  +
                  this.formularioDeVacacion.get('dias_tomados')?.value)
                ){
                    if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                    this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.toDate?.year+"-"+this.toDate?.month+"-"+
                    this.toDate?.day)){

                      var motiv = this.seleccionMotivo
                      console.log("motivo->Agregar::",this.seleccionMotivo);

                      this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                      +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                      +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                      this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+this.toDate?.month+"-"+
                      this.toDate?.day,this.formularioDeVacacion.get('dias_seleccionados')?.value as number,
                      this.formularioDeVacacion.get('vaca_disp')?.value as number, 
                      this.seleccionMotivo).subscribe(respuesta22=>{
                        this.btnIngresar = true;
                        this.precargarDias();
                        
                        this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                          console.log("respuesta15:",respuesta15)
                        })                   
                        if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                          this.reloadMenuComponent();
                        }
                    });
                    }            
              }else{
                window.confirm("Excede días disponibles")
                //console.log("Excede días disponibles");
              }              
              });
            }else if (respuesta10['FECHAS_CAL'] as unknown as number > 0){
              console.log("PUEDE REGISTRAR >0:");
              this.crudService.ObteneVacacionesAReasignarByUserPasswordFechasInfo(this.user,this.passw,this.fromDate?.year+"-"+
              this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
              this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta13 =>{

                console.log("respuesta13:",respuesta13);
                var msg = "";
                for ( let item of respuesta13) {
                  //console.log("item:",item);
                  let antiguedadCal = Object.values(item);
                  msg = msg +"\nID:" + antiguedadCal[0]+ "\nFecha Inicio:" + antiguedadCal[1] + "\nFecha Fin:" + antiguedadCal[2] ; 
                }              
                var aux = "CONFLICTO CON LAS SOLICITUDES DE VACACIÓN:\n"+ msg as string;
                //console.log("aux:"+ aux);
                window.confirm(aux)
              });
            }
          });

        }
        
        
        
      }else if(this.fromDate != null && this.toDate == null){
        console.log("SOLO FROM DATE");

        if(!this.isFriday(this.fromDate)){

          this.crudService.ObtenerExistenciaVacaciones(this.user,this.passw,this.fromDate?.year+"-"+
          this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta6 =>{

            console.log("respuesta6->FECHAS_CAL:",respuesta6['FECHAS_CAL']);
            
            if(respuesta6['FECHAS_CAL'] as unknown as number === 0 || respuesta6['FECHAS_CAL'] === null){ 
              
              //VACACIÓN 
              console.log("PUEDE REGISTRAR 0:");
              this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                    
                //AGREGAR VACACION
                //console.log("vaca_disp:",this.formularioDeVacacion.get('vaca_disp')?.value)
                if (
                  this.formularioDeVacacion.get('vaca_disp')?.value
                  >= 
                  (this.formularioDeVacacion.get('dias_seleccionados')?.value
                  +
                  this.formularioDeVacacion.get('dias_solicitudes_pen')?.value
                  +
                  this.formularioDeVacacion.get('dias_tomados')?.value)
                ){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day)){

                    var motiv = this.seleccionMotivo
                    console.log("motivo->Agregar::",this.seleccionMotivo);

                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"
                    +this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+this.fromDate?.month+"-"+
                    this.fromDate?.day,this.formularioDeVacacion.get('dias_seleccionados')?.value as number,
                    this.formularioDeVacacion.get('vaca_disp')?.value as number, 
                    this.seleccionMotivo).subscribe(respuesta22=>{
                      console.log("respuesta22:",respuesta22);
                      this.btnIngresar = true;
                      this.precargarDias();    
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadMenuComponent();
                      }
                    });
                  }                 
                }else{
                  window.confirm("Excede días disponibles")
                  //console.log("Excede días disponibles");
                }          
              });
              
            }else if (respuesta6['FECHAS_CAL'] as unknown as number > 0){
              console.log("PUEDE REGISTRAR >0:");
              this.crudService.ObteneVacacionesAReasignarByUserPassword(this.user,this.passw,this.fromDate?.year+"-"+
              this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta7 =>{

                console.log("respuesta7:",respuesta7)
                console.log("respuesta7['id_vacaciones']:",respuesta7[0]['id_vacaciones'])
                this.crudService.ObteneVacacionesFechaInicioAndFin(respuesta7[0]['id_vacaciones'] as string).subscribe(respuesta8 =>{
                  console.log("respuesta8:",respuesta8);
                  this.setRespen(respuesta8,"FechaInicioAndFin"); 
                  const json = JSON.stringify(this.getRespen("FechaInicioAndFin"));
                  JSON.parse(json, (key, value) => {
                    key4.push(key);
                    Value4.push(value);
                  });
                  console.log("Value4[0]:",Value4[0],Value4[1]);   
                  window.confirm("CONFLICTO CON LAS SOLICITUDES DE VACACIÓN:\nID:"+respuesta7[0]['id_vacaciones']+"\n\tFECHA INICIO:"+ Value4[0] as string+
                  "\n\tFECHA FIN:" + Value4[1] as string) 
                });             
              });
            
            }
          });

        }else{
          console.log("Its friday");

          this.toDate=NgbDate.from(this.dateToNgbDate(this.addDays(2,this.fromDate)))
          console.log("date+2:\n",this.fromDate)

          var diferenciaDias = this.countWorkDay(this.fromDate,this.toDate);
          //console.log("diferenciaDias: ",diferenciaDias)
          if (diferenciaDias != null){
            this.formularioDeVacacion.setValue({
              vaca_disp:this.formularioDeVacacion.get('vaca_disp')?.value,
              dias_solicitudes_pen: this.formularioDeVacacion.get('dias_solicitudes_pen')?.value, 
              dias_tomados: this.formularioDeVacacion.get('dias_tomados')?.value, 
              dias_seleccionados:diferenciaDias, 
              saldo_dias:this.formularioDeVacacion.get('saldo_dias')?.value, 
              lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
              motivo:this.formularioDeVacacion.get('motivo')?.value
            }); 
          }

          this.crudService.ObtenerExistenciaVacaciones(this.user,this.passw,this.fromDate?.year+"-"+
          this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta6 =>{

            console.log("respuesta6->FECHAS_CAL:",respuesta6['FECHAS_CAL']);
            
            if(respuesta6['FECHAS_CAL'] as unknown as number === 0 || respuesta6['FECHAS_CAL'] === null){ 
              
              //VACACIÓN 
              console.log("PUEDE REGISTRAR 0:");
              this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                    
                //AGREGAR VACACION
      
                if (
                  this.formularioDeVacacion.get('vaca_disp')?.value
                  >= 
                  (this.formularioDeVacacion.get('dias_seleccionados')?.value
                  +
                  this.formularioDeVacacion.get('dias_solicitudes_pen')?.value
                  +
                  this.formularioDeVacacion.get('dias_tomados')?.value)
                ){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day)){

                    var motiv = this.seleccionMotivo
                    console.log("motivo->Agregar::",this.seleccionMotivo);

                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"
                    +this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+this.fromDate?.month+"-"+
                    this.fromDate?.day,this.formularioDeVacacion.get('dias_seleccionados')?.value as number,
                    this.formularioDeVacacion.get('vaca_disp')?.value as number, 
                    this.seleccionMotivo).subscribe(respuesta22=>{
                      console.log("respuesta22:",respuesta22);
                      this.btnIngresar = true;
                      this.precargarDias();    
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadMenuComponent();
                      }
                    });
                  }                 
                }else{
                  window.confirm("Excede días disponibles")
                  //console.log("Excede días disponibles");
                }          
              });
              
            }else if (respuesta6['FECHAS_CAL'] as unknown as number > 0){
              console.log("PUEDE REGISTRAR >0:");
              this.crudService.ObteneVacacionesAReasignarByUserPassword(this.user,this.passw,this.fromDate?.year+"-"+
              this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta7 =>{

                console.log("respuesta7:",respuesta7)
                console.log("respuesta7['id_vacaciones']:",respuesta7[0]['id_vacaciones'])
                this.crudService.ObteneVacacionesFechaInicioAndFin(respuesta7[0]['id_vacaciones'] as string).subscribe(respuesta8 =>{
                  console.log("respuesta8:",respuesta8);
                  this.setRespen(respuesta8,"FechaInicioAndFin"); 
                  const json = JSON.stringify(this.getRespen("FechaInicioAndFin"));
                  JSON.parse(json, (key, value) => {
                    key4.push(key);
                    Value4.push(value);
                  });
                  console.log("Value4[0]:",Value4[0],Value4[1]);   
                  window.confirm("CONFLICTO CON LAS SOLICITUDES DE VACACIÓN:\nID:"+respuesta7[0]['id_vacaciones']+"\n\tFECHA INICIO:"+ Value4[0] as string+
                  "\n\tFECHA FIN:" + Value4[1] as string) 
                });             
              });
            
            }
          });

          

        }
      }     
    }
  }

  obtenerMotivoSeleccionado(event: Event) {
    const motivoSeleccionado = (event.target as HTMLSelectElement).value;
    if (motivoSeleccionado) {
      // Aquí puedes hacer lo que necesites con el motivo seleccionado
      console.log('Motivo seleccionado:', motivoSeleccionado);
      this.seleccionMotivo = motivoSeleccionado;
      // También puedes llamar a otras funciones o realizar cualquier otra operación que desees
    }    
  }
  

  onDateSelection(date: NgbDate) {
    var myDate = new Date();
    var fechaActualNg = new NgbDate(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate());
		if (!this.fromDate && !this.toDate) { // NO ESCOGIO NINGUN DÍA
      //console.log("CASO 1");
			this.fromDate = date;
      
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) { //ESCOGIO RANGO 
      //console.log("CASO 2");
			this.toDate = date;
      if (this.fromDate != null && this.toDate != null){ //RELLENAR DIAS SOLICITADOS
        var diferenciaDias = this.countWorkDay(this.fromDate,this.toDate);
        //console.log("diferenciaDias: ",diferenciaDias)
        if (diferenciaDias != null){
          this.formularioDeVacacion.setValue({
            vaca_disp:this.formularioDeVacacion.get('vaca_disp')?.value,
            dias_solicitudes_pen: this.formularioDeVacacion.get('dias_solicitudes_pen')?.value,
            dias_tomados: this.formularioDeVacacion.get('dias_tomados')?.value,
            dias_seleccionados:diferenciaDias,  
            saldo_dias:this.formularioDeVacacion.get('saldo_dias')?.value,
            lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
            lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
            motivo:this.formularioDeVacacion.get('motivo')?.value
          }); 
        }     
      }
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var to = new NgbDate( this.toDate.year,this.toDate.month,this.toDate.day);
      var antiguedadCal = new Date(fechaActualNg.year, fechaActualNg.month, fechaActualNg.day);
      var totalVacasTomadas =new Date(from.year, from.month, from.day);
      var totalVacasPendientes =new Date(to.year, to.month, to.day);

      if (this.compareDates(antiguedadCal,totalVacasTomadas) == 1 || this.compareDates(antiguedadCal,totalVacasPendientes) == 1){ //COMPARA SI ES ESTA DETRAS DEL ACTUAL
        //console.log("CompareDateIncorrectos");
        this.btnIngresar = true;
        //window.confirm("No se puede tomar vacaciones antes de la fecha actual");
      }else{
        //console.log("CompareDateCorrectos");
        console.log("\nvaca_disp:",this.formularioDeVacacion.get('vaca_disp')?.value) 
        console.log("dias_solicitudes_pen:",this.formularioDeVacacion.get('dias_solicitudes_pen')?.value) 
        console.log("dias_seleccionados:",this.formularioDeVacacion.get('dias_tomados')?.value)       
        console.log("dias_seleccionados:",this.formularioDeVacacion.get('dias_seleccionados')?.value) 
        console.log("saldo_dias:",this.formularioDeVacacion.get('saldo_dias')?.value)        
         
        if (
          this.formularioDeVacacion.get('vaca_disp')?.value 
          <=
          (this.formularioDeVacacion.get('dias_tomados')?.value  +  this.formularioDeVacacion.get('dias_solicitudes_pen')?.value )  
          
          ){
            this.btnIngresar = true;
          window.confirm("Excede la totalidad de días disponibles 1:\n\t");
          }else{
            this.btnIngresar = false;
            
          }              
      }      
		} else {  //ESCOGIO UN DÍA
      //console.log("CASO 3");
			this.toDate = null;
			this.fromDate = date;      
      
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var antiguedadCal = new Date(fechaActualNg.year, fechaActualNg.month, fechaActualNg.day);   
      var totalVacasTomadas =new Date(from.year, from.month, from.day);
      if (this.fromDate != null && this.toDate == null){ //RELLENAR DIAS SOLICITADOS
          var diferenciaDias = this.countWorkDay(this.fromDate,this.fromDate);
          //console.log("diferenciaDias: ",diferenciaDias)
           if (diferenciaDias != null){
            this.formularioDeVacacion.setValue({
              vaca_disp:this.formularioDeVacacion.get('vaca_disp')?.value,
              dias_solicitudes_pen: this.formularioDeVacacion.get('dias_solicitudes_pen')?.value,
              dias_tomados: this.formularioDeVacacion.get('dias_tomados')?.value,
              dias_seleccionados:diferenciaDias,  
              saldo_dias:this.formularioDeVacacion.get('saldo_dias')?.value, 
              lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              lbl_fin:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              motivo:this.formularioDeVacacion.get('motivo')?.value
            }); 
           }     
        }      
      if (this.compareDates(antiguedadCal,totalVacasTomadas) == 1 ){
        //console.log("CompareDateIncorrectos");
        this.btnIngresar = true;
        window.confirm("No se puede escoger vacaciones antes de la fecha actual");
      }else{
        //console.log("CompareDateCorrectos");
        console.log("\nvaca_disp:",this.formularioDeVacacion.get('vaca_disp')?.value)
        console.log("dias_solicitudes_pen:",this.formularioDeVacacion.get('dias_solicitudes_pen')?.value)
        console.log("dias_tomados:",this.formularioDeVacacion.get('dias_tomados')?.value)
        console.log("dias_seleccionados:",this.formularioDeVacacion.get('dias_seleccionados')?.value)
        console.log("saldo_dias:",this.formularioDeVacacion.get('saldo_dias')?.value)
                
        if (
          this.formularioDeVacacion.get('vaca_disp')?.value
          <= 
          (this.formularioDeVacacion.get('dias_tomados')?.value  +  this.formularioDeVacacion.get('dias_solicitudes_pen')?.value )      
          
          ){
            this.btnIngresar = true;
          window.confirm("Excede la totalidad de días disponibles 2:\n\t");
          }else{
            this.btnIngresar = false;
            
          }           
      }
      
		}    
	}

  dateToNgbDate(date: Date): NgbDateStruct {
    return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
  }

  addDays(days: number, ngbdate: NgbDate): Date {
    const jsDate = new Date(ngbdate.year,ngbdate.month - 1, ngbdate.day);
    jsDate.setDate(jsDate.getDate() + days);
    return jsDate  
  }

  compareDates(dateTimeA: Date, dateTimeB: Date){
    //let day1 = formatDate(new Date(dateTimeA.year, dateTimeA.month - 1, dateTimeA.day), 'yyyy/MM/dd','en');
    //let day2 = formatDate(new Date(dateTimeB.year, dateTimeB.month - 1, dateTimeB.day), 'yyyy/MM/dd','en');
    var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;
    const diferenciaEnMilisegundos = (dateTimeA.getTime() - dateTimeB.getTime());
    let days = Math.floor(diferenciaEnMilisegundos / MILISENGUNDOS_POR_DIA);
    //console.log("Actual:",dateTimeA.getTime(),"\nConsulta:",dateTimeB.getTime(),"\ndays:",days);
    if ( days < 0){
      return 0
    }else if(days==0){
      return 0
    }else{
      return 1
    }
    
  }

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

  countWorkDay(sDay:any,eDay:any){
    const startDate  = new Date(sDay.year, sDay.month - 1, sDay.day);
    const endDate  = new Date(eDay.year, eDay.month - 1, eDay.day);
    //console.log("\nstartDate:",startDate,"\nendDate:",endDate);  
    //console.log("workingDaysWithWeekends:",this.workingDaysWithWeekends(sDay.day+"/"+sDay.month+"/"+sDay.year,eDay.day+"/"+eDay.month+"/"+eDay.year));     
    return this.workingDaysWithWeekends(sDay.day+"/"+sDay.month+"/"+sDay.year,eDay.day+"/"+eDay.month+"/"+eDay.year);
    
  }

  workingDays(dateFrom: any, dateTo: any) {
    //console.log(dateFrom,dateTo); 
    var from = moment(dateFrom, 'DD/MM/YYY');
    var to = moment(dateTo, 'DD/MM/YYY');
    var days = 0;     
    //console.log("from:",from,"to:", to);
    while (!from.isAfter(to)) {
      // Si no es sabado ni domingo
      if (from.isoWeekday() !== 6 && from.isoWeekday() !== 7) {
        days = days +1;
      }
      from.add(1, 'days');
    }
    return days;
  }

  workingDaysWithWeekends(dateFrom: any, dateTo: any) {
    //console.log(dateFrom,dateTo); 
    var from = moment(dateFrom, 'DD/MM/YYY');
    var to = moment(dateTo, 'DD/MM/YYY');
    var days = 0;     
    //console.log("from:",from,"to:", to);
    while (!from.isAfter(to)) {
      // Si no es sabado ni domingo    
      if (from.isoWeekday() !== -1 && from.isoWeekday() !== -1) {
        days = days +1;
      }     
      from.add(1, 'days');
    }   
    return days;
  }

  esFinDeSemana = (date: NgbDate) => {
    const day = new Date(date.year, date.month - 1, date.day).getDay();
    return day === 0 || day === 6;
  }

  isFriday(date: NgbDate): boolean {
    const dayOfWeek = new Date(date.year, date.month - 1, date.day).getDay();
    if ( dayOfWeek as unknown as string == '5'){
      return true
    }else{
      return false
    }
    //return dayOfWeek === 0 || dayOfWeek === 6;
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
  reloadMenuComponent() {
    this.router.navigateByUrl('/menu', { skipLocationChange: true }).then(() => {
      window.location.reload();
    });
  }
  
}

