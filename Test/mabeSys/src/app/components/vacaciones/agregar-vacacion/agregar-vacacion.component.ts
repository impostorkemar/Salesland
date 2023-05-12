import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormsModule } from '@angular/forms';
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
      dias_tomados:[''],
      saldo_dias:[''],
      saldo_dias2:[''],
      dias_solicitudes_pen:[''],
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
    this.formularioDeVacacion.controls['dias_tomados'].disable();
    this.formularioDeVacacion.controls['saldo_dias'].disable();
    this.formularioDeVacacion.controls['saldo_dias2'].disable();
    this.formularioDeVacacion.controls['dias_solicitudes_pen'].disable();
    this.formularioDeVacacion.controls['lbl_inicio'].disable();
    this.formularioDeVacacion.controls['lbl_fin'].disable();
    this.precargarDias();  
    
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
            var aux1 = this.antiguedad;

            //CARGA VACACIONES TOMADAS
            console.log("aux1->this.antiguedad",respuesta2['fechaContrato'])
            if ( aux1 != null){
              this.crudService.ObtenertotalVacacionesTomadas(this.user,this.passw).subscribe(respuesta=>{
                
                var aux2 = respuesta['VACA_PREV'];  
                console.log("aux2->totalVacacionesAprobadas",respuesta['VACA_PREV'])            
                this.crudService.ObtenertotalVacacionesTomadasPendientes(this.user,this.passw).subscribe(respuesta15=>{
                  
                  var aux3 = respuesta15['VACA_PREV']
                  console.log(respuesta15)
                  console.log("aux3->totalVacacionesPendientes:",respuesta15['VACA_PREV'])

                  this.crudService.ObtenerMotivosVacaciones("vacaciones").subscribe(respuesta16=>{
                    this.Motivos = respuesta16;
                    
                    console.log("Motivos:",this.Motivos[0])
                    console.log("vaca_disp:",aux1-aux2)
                    if ( aux2 == null ){ // VACA PREV
                      this.formularioDeVacacion.setValue({      
                        vaca_disp: aux1, //vacaciones por contrato
                        saldo_dias: 0,  //vacaciones saldo
                        saldo_dias2:aux1,
                        dias_solicitudes_pen: 0, // vacaciones tomadas
                        dias_tomados: 0, 
                        lbl_inicio:0,
                        lbl_fin:0,
                        motivo:this.Motivos[0]
                      });
                    }else if ( aux3 == null){ // VACA PREV PEND
                      this.formularioDeVacacion.setValue({      
                        vaca_disp: aux1,  //vacaciones por contrato
                        saldo_dias: aux1-aux2, //vacaciones saldo
                        saldo_dias2:aux1-aux2,
                        dias_solicitudes_pen: 0, // vacaciones tomadas
                        dias_tomados: 0,
                        lbl_inicio:0,
                        lbl_fin:0,
                        motivo:this.Motivos[0]
                      });                  
                    }else{
                      if (this.toDate){
                        this.formularioDeVacacion.setValue({      
                          vaca_disp: aux1,  //vacaciones por contrato
                          saldo_dias: aux1-aux2, //vacaciones saldo
                          saldo_dias2: aux1-aux2, //vacaciones saldo
                          dias_solicitudes_pen: aux2, // vacaciones tomadas
                          dias_tomados: 0, 
                          lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
                          lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
                          motivo:this.Motivos[0]
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
            
            if(respuesta10['FECHAS_CAL'] as unknown as number === 0 || respuesta10['FECHAS_CAL'] === null){
              console.log("PUEDE REGISTRAR 0:");
              this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                
                //AGREGAR VACACION
                
                if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.toDate?.year+"-"+this.toDate?.month+"-"+
                  this.toDate?.day)){
                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                    this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+this.toDate?.month+"-"+
                    this.toDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                    this.formularioDeVacacion.value.vaca_disp as number, 
                    this.formularioDeVacacion.value.motivo as string).subscribe(respuesta22=>{
                      this.btnIngresar = true;
                      this.precargarDias();
                      
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadComponent();
                      }
                  });
                }            
              }else{
                console.log("Excede días disponibles");
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
                  let aux1 = Object.values(item);
                  msg = msg +"\nID:" + aux1[0]+ "\nFecha Inicio:" + aux1[1] + "\nFecha Fin:" + aux1[2] ; 
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
              vaca_disp:this.formularioDeVacacion.value.vaca_disp,
              saldo_dias:this.formularioDeVacacion.value.saldo_dias,     
              saldo_dias2:this.formularioDeVacacion.value.saldo_dias2,            
              dias_solicitudes_pen: this.formularioDeVacacion.value.dias_solicitudes_pen, 
              dias_tomados:diferenciaDias,        
              lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
              motivo:this.formularioDeVacacion.value.motivo
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
                
                if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.toDate?.year+"-"+this.toDate?.month+"-"+
                  this.toDate?.day)){
                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                    this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+this.toDate?.month+"-"+
                    this.toDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                    this.formularioDeVacacion.value.vaca_disp as number, 
                    this.formularioDeVacacion.value.motivo as string).subscribe(respuesta22=>{
                      this.btnIngresar = true;
                      this.precargarDias();
                      
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadComponent();
                      }
                  });
                }            
              }else{
                console.log("Excede días disponibles");
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
                  let aux1 = Object.values(item);
                  msg = msg +"\nID:" + aux1[0]+ "\nFecha Inicio:" + aux1[1] + "\nFecha Fin:" + aux1[2] ; 
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
      
                if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day)){
                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"
                    +this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+this.fromDate?.month+"-"+
                    this.fromDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                    this.formularioDeVacacion.value.vaca_disp as number, 
                    this.formularioDeVacacion.value.motivo as string).subscribe(respuesta22=>{
                      console.log("respuesta22:",respuesta22);
                      this.btnIngresar = true;
                      this.precargarDias();    
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadComponent();
                      }
                    });
                  }                 
                }else{
                  console.log("Excede días disponibles");
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
              vaca_disp:this.formularioDeVacacion.value.vaca_disp,
              saldo_dias:this.formularioDeVacacion.value.saldo_dias,     
              saldo_dias2:this.formularioDeVacacion.value.saldo_dias2,                   
              dias_solicitudes_pen: this.formularioDeVacacion.value.dias_solicitudes_pen, 
              dias_tomados:diferenciaDias,        
              lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
              motivo:this.formularioDeVacacion.value.motivo
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
      
                if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                  if (window.confirm("Desea registrar vacación:\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day+"\nal\n"+this.fromDate?.year+"-"+
                  this.fromDate?.month+"-"+ this.fromDate?.day)){
                    this.crudService.AgregarVacaciones(respuesta['id_personal'] as string,(this.fechaActual.getFullYear()) as any
                    +"-"+(this.fechaActual.getMonth()) as any +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()
                    +":"+this.fechaActual.getMinutes()+":"+this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"
                    +this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+this.fromDate?.month+"-"+
                    this.fromDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                    this.formularioDeVacacion.value.vaca_disp as number, 
                    this.formularioDeVacacion.value.motivo as string).subscribe(respuesta22=>{
                      console.log("respuesta22:",respuesta22);
                      this.btnIngresar = true;
                      this.precargarDias();    
                      this.crudService.EnviarCorreoNotificacionIngresoSolicitud(this.user,this.passw,respuesta22['id_vacaciones']).subscribe(respuesta15=>{
                        console.log("respuesta15:",respuesta15)
                      })                   
                      if(window.confirm("Solcitud ingresada. ¡Revisar solicitud?")){
                        this.reloadComponent();
                      }
                    });
                  }                 
                }else{
                  console.log("Excede días disponibles");
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
            saldo_dias:this.formularioDeVacacion.get('saldo_dias')?.value,
            saldo_dias2:this.formularioDeVacacion.get('saldo_dias2')?.value,            
            dias_solicitudes_pen: this.formularioDeVacacion.get('dias_solicitudes_pen')?.value,
            dias_tomados:diferenciaDias,        
            lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
            lbl_fin:this.toDate?.year+"-"+this.toDate?.month+"-"+ this.toDate?.day,
            motivo:this.formularioDeVacacion.value.motivo
          }); 
        }     
      }
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var to = new NgbDate( this.toDate.year,this.toDate.month,this.toDate.day);
      var aux1 = new Date(fechaActualNg.year, fechaActualNg.month, fechaActualNg.day);
      var aux2 =new Date(from.year, from.month, from.day);
      var aux3 =new Date(to.year, to.month, to.day);

      if (this.compareDates(aux1,aux2) == 1 || this.compareDates(aux1,aux3) == 1){ //COMPARA SI ES ESTA DETRAS DEL ACTUAL
        //console.log("CompareDateIncorrectos");
        this.btnIngresar = true;
        //window.confirm("No se puede tomar vacaciones antes de la fecha actual");
      }else{
        //console.log("CompareDateCorrectos");
        console.log("\nvaca_disp:",this.formularioDeVacacion.value.vaca_disp)
        console.log("dias_tomados:",this.formularioDeVacacion.value.dias_tomados)
        console.log("saldo_dias:",this.formularioDeVacacion.value.saldo_dias)
        console.log("dias_solicitudes_pen:",this.formularioDeVacacion.value.dias_solicitudes_pen) 
        if (
          this.formularioDeVacacion.value.vaca_disp <= this.formularioDeVacacion.value.saldo_dias
          /*|| 
          (this.formularioDeVacacion.value.vaca_disp-(this.formularioDeVacacion.value.saldo_dias
            +this.formularioDeVacacion.value.dias_solicitudes_pen)) 
          <= this.formularioDeVacacion.value.dias_tomados*/
          ){
            this.btnIngresar = true;
          window.confirm("Excede la totalidad de días disponibles:\n\t");
          }else{
            this.btnIngresar = false;
            
          }              
      }      
		} else {  //ESCOGIO UN DÍA
      //console.log("CASO 3");
			this.toDate = null;
			this.fromDate = date;      
      
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var aux1 = new Date(fechaActualNg.year, fechaActualNg.month, fechaActualNg.day);   
      var aux2 =new Date(from.year, from.month, from.day);
      if (this.fromDate != null && this.toDate == null){ //RELLENAR DIAS SOLICITADOS
          var diferenciaDias = this.countWorkDay(this.fromDate,this.fromDate);
          //console.log("diferenciaDias: ",diferenciaDias)
           if (diferenciaDias != null){
            this.formularioDeVacacion.setValue({
              vaca_disp:this.formularioDeVacacion.get('vaca_disp')?.value,
              saldo_dias:this.formularioDeVacacion.get('saldo_dias')?.value,
              saldo_dias2:this.formularioDeVacacion.get('saldo_dias2')?.value,            
              dias_tomados:diferenciaDias,  
              dias_solicitudes_pen: this.formularioDeVacacion.get('dias_solicitudes_pen')?.value,  
              lbl_inicio:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              lbl_fin:this.fromDate?.year+"-"+this.fromDate?.month+"-"+ this.fromDate?.day,
              motivo:this.formularioDeVacacion.value.motivo
            }); 
           }     
        }      
      if (this.compareDates(aux1,aux2) == 1 ){
        //console.log("CompareDateIncorrectos");
        this.btnIngresar = true;
        window.confirm("No se puede escoger vacaciones antes de la fecha actual");
      }else{
        //console.log("CompareDateCorrectos");
        console.log("\nvaca_disp:",this.formularioDeVacacion.get('vaca_disp')?.value,)
        console.log("dias_tomados:",this.formularioDeVacacion.get('dias_tomados')?.value,)
        console.log("saldo_dias:",this.formularioDeVacacion.get('saldo_dias')?.value,)
        console.log("dias_solicitudes_pen:",this.formularioDeVacacion.get('dias_solicitudes_pen')?.value,)        
        if (
          this.formularioDeVacacion.value.vaca_disp <= this.formularioDeVacacion.value.saldo_dias
          /*|| 
          (this.formularioDeVacacion.value.vaca_disp-(this.formularioDeVacacion.value.saldo_dias
            +this.formularioDeVacacion.value.dias_solicitudes_pen)) 
          <= this.formularioDeVacacion.value.dias_tomados*/
          ){
            this.btnIngresar = true;
          window.confirm("Excede la totalidad de días disponibles:\n\t");
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

  reloadComponent() {
    if(this.route.snapshot.routeConfig != null){
      const currentRoute = this.route.snapshot.routeConfig.path;
      const currentUrl = "menu";
      this.router.navigateByUrl('/menu')
      /*this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate([currentUrl]));*/
    }   
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

  
}

