import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router,
    calendar: NgbCalendar,
    private testuserService: TestuserService,    
    private _decimalPipe: DecimalPipe,
    private router:Router,
  ) { 
    this.formularioDeVacacion = this.formulario.group({      
      vaca_disp:[''],
      dias_tomados:[''],
      saldo_dias:[''],
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
  }

  ngOnInit(): void {
    this.formularioDeVacacion.controls['vaca_disp'].disable();
    this.formularioDeVacacion.controls['dias_tomados'].disable();
    this.formularioDeVacacion.controls['saldo_dias'].disable();
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
    //var aux1 = this.cargarDiasDisponibles();
    //var aux2 = this.cargarDiasTomadosPreviamente();


    //CARGA DIAS DISPONIBLES

    let key1: string[]=[];
    let Value1: string[]=[];
    let key2: string[]=[];
    let Value2: string[]=[];    

    //CARGA CEDULA USER

    this.crudService.ObtenerCedulaByUser_Pass(this.user,this.passw).subscribe(respuesta=>{      
      //console.log("MENU",this.user,this.passw,"RESPONSE:",respuesta);
      this.setRespen(respuesta,"cedula");  
      const json = JSON.stringify(this.getRespen("cedula"));
      JSON.parse(json, (key, value) => { 
        key1.push(value);  
        Value1.push(value);                     
      });  
      this.cedula = Value1[0];    

        //CARGA FECHA INICIO CONTRATO

        this.crudService.ObtenerFechaInicioContrato(this.cedula).subscribe(respuesta2=>{
          //console.log("CEDULA:",this.cedula,"RESPONSE:",respuesta2);          
          this.setRespen(respuesta2,"fechaContrato");     
          const json2 = JSON.stringify(this.getRespen("fechaContrato"));
          JSON.parse(json2, (key, value) => { 
            key2.push(value);  
            Value2.push(value);    
            const datePipe = new DatePipe('en-US'); 
            var corteYear = new Date().getFullYear();
            this.corte =  new NgbDate(corteYear,1,31);              
            this.contrato = new Date((Value2[0] as string));  
            this.antiguedad = (this._decimalPipe.transform(((this.corte.year-this.contrato.getFullYear())*12+(this.corte.month-this.contrato.getMonth())+(this.corte.day-this.contrato.getDate())/30)*1.25,"1.0-1") as any) as number;           
            var aux1 = this.antiguedad;

            //CARGA VACACIONES TOMADAS

            let Key3: string[] = [];
            let Value3: string[]=[];
            this.crudService.ObtenertotalVacacionesTomadas(this.user,this.passw).subscribe(respuesta=>{
              //console.log("respuesta:",respuesta);
              this.setRespen(respuesta,"totalVaca");       
              const json = JSON.stringify(this.getRespen("totalVaca"));
              JSON.parse(json, (key, value) => {
                Key3.push(key);
                Value3.push(value);
              });       
              var aux2 = Value3[0];
              if ( aux2 == null){
                this.formularioDeVacacion.setValue({      
                  vaca_disp: aux1,
                  saldo_dias: 0,
                  dias_tomados: 0,         
                });
              }else{
                this.formularioDeVacacion.setValue({      
                  vaca_disp: aux1,
                  saldo_dias: aux2,
                  dias_tomados: 0,         
                });
              }
              //console.log("cargarDiasDisponibles:", this.cargarDiasDisponibles()); 
              //console.log("cargarDiasTomadosPreviamente:", this.cargarDiasTomadosPreviamente()); 
            });
          });   
        });        
    });    
  }
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeVacacion){     
      let key1: string[]=[];
      let Value1: string[]=[];   
      let key2: string[]=[];
      let Value2: string[]=[];  
      let key3: string[]=[];
      let Value3: string[]=[];  
      let key4: string[]=[];
      let Value4: string[]=[]; 
      let key5: string[]=[];
      let Value5: string[]=[];
      localStorage.removeItem('id_vacaciones');
      localStorage.removeItem('FECHAS_CAL');
      //BUSQUEDA ID PERSONAL
      
      if ( this.fromDate != null && this.toDate != null){
        console.log(" FROM DATE && TO DATE");        
        console.log(this.user,this.passw,this.fromDate?.year+"-"+
        this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
        this.toDate?.month+"-"+ this.toDate?.day)
        this.crudService.ObtenerExistenciaVacacionesByInicioFin(this.user,this.passw,this.fromDate?.year+"-"+
        this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
        this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta10 =>{
          console.log("respuesta10:",respuesta10);
          this.setRespen(respuesta10,"FECHAS_CAL");
          const json = JSON.stringify(this.getRespen("FECHAS_CAL"));
          JSON.parse(json, (key, value) => {
            key2.push(key);
            Value2.push(value);
          });
          console.log("Comrpobador dentro/fuera Value2[0]:",Value2[0]);
          if(Value2[0] as unknown as number === 0 || Value2[0] === null){
            console.log("PUEDE REGISTRAR 0:");
            this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
              this.setRespen(respuesta,"idpersonal");  
              //console.log(respuesta);
              const json = JSON.stringify(this.getRespen("idpersonal"));
              JSON.parse(json, (key, value) => {
                key1.push(key);
                Value1.push(value);
              });
              //AGREGAR VACACION

              if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                this.crudService.AgregarVacaciones(Value1[0] as string,(this.fechaActual.getFullYear()) as any+"-"+(this.fechaActual.getMonth()) as any 
                +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+
                this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+this.toDate?.month+"-"+
                this.toDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                this.formularioDeVacacion.value.vaca_disp as number).subscribe(respuesta=>{
                  console.log("respuesta:",respuesta);
                  this.ruteador.navigateByUrl('/menu');
                });
                this.precargarDias();
                window.confirm("Solicitud de Vacación registrada")
                this.router.navigate(['/menu']);
              }else{
                console.log("Excede días disponibles");
              }
            });
          }else if (Value2[0] as unknown as number > 0){
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
              var aux = "ELIMINAR SOLICITUD DE PETICIÓN DE VACACIÓN?\n"+ msg as string;
              //console.log("aux:"+ aux);
              if (window.confirm(aux)){
                for ( let item of respuesta13){
                  let aux = Object.values(item);
                  this.crudService.BorrarVacacionById(aux[0] as string).subscribe(respuesta8 =>{ //BORRAR SOLICITUD VACACION
                    console.log("respuesta8:",respuesta8);
                  }) 
                }
                this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                  this.setRespen(respuesta,"idpersonal");  
                  //console.log(respuesta);
                  const json = JSON.stringify(this.getRespen("idpersonal"));
                  JSON.parse(json, (key, value) => {
                    key1.push(key);
                    Value1.push(value);
                  });
              
                  //AGREGAR VACACION
              
                  if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                    this.crudService.AgregarVacaciones(Value1[0] as string,(this.fechaActual.getFullYear()) as any+"-"+(this.fechaActual.getMonth()) as any 
                    +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+
                    this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                    this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
                    this.toDate?.month+"-"+ this.toDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                    this.formularioDeVacacion.value.vaca_disp as number).subscribe(respuesta=>{
                      console.log("respuesta:",respuesta);
                      this.ruteador.navigateByUrl('/menu');
                    });
                    this.precargarDias();                    
                    this.router.navigate(['/menu']);
                    window.confirm("Solicitud de Vacación registrada");
                  }else{
                    console.log("Excede días disponibles");
                  }          
                });
              }
            });
          }
        });
      }else if(this.fromDate != null && this.toDate == null){
        console.log("SOLO FROM DATE");

        this.crudService.ObtenerExistenciaVacaciones(this.user,this.passw,this.fromDate?.year+"-"+
        this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta6 =>{
          console.log("respuesta6:",respuesta6);
          this.setRespen(respuesta6,"FECHAS_CAL"); 
          const json = JSON.stringify(this.getRespen("FECHAS_CAL"));
          JSON.parse(json, (key, value) => {
            key2.push(key);
            Value2.push(value);
          });
          //console.log("Comrpobador dentro/fuera Value2[0]:",Value2[0]);
          if(Value2[0] as unknown as number === 0 || Value2[0] === null){ //VACACIÓN 
            console.log("PUEDE REGISTRAR 0:");
            this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
              this.setRespen(respuesta,"idpersonal");  
              //console.log(respuesta);
              const json = JSON.stringify(this.getRespen("idpersonal"));
              JSON.parse(json, (key, value) => {
                key1.push(key);
                Value1.push(value);
              });
    
              //AGREGAR VACACION
    
              if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                this.crudService.AgregarVacaciones(Value1[0] as string,(this.fechaActual.getFullYear()) as any+"-"+(this.fechaActual.getMonth()) as any 
                +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+
                this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+
                this.fromDate?.month+"-"+ this.fromDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                this.formularioDeVacacion.value.vaca_disp as number).subscribe(respuesta=>{
                  console.log("respuesta:",respuesta);
                  this.ruteador.navigateByUrl('/menu');
                });
                this.precargarDias();                    
                this.router.navigate(['/menu']);
              }else{
                console.log("Excede días disponibles");
              }          
            });
            window.confirm("VACACIÓN REGISTRADA");
          }else if (Value2[0] as unknown as number > 0){
            console.log("PUEDE REGISTRAR >0:");
            this.crudService.ObteneVacacionesAReasignarByUserPassword(this.user,this.passw,this.fromDate?.year+"-"+
            this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta7 =>{
              console.log("respuesta7:",respuesta7);
              this.setRespen(respuesta7,"id_vacaciones"); 
              const json = JSON.stringify(this.getRespen("id_vacaciones"));
              JSON.parse(json, (key, value) => {
                key3.push(key);
                Value3.push(value);
              });
              console.log("Value3:",Value3);
              this.crudService.ObteneVacacionesFechaInicioAndFin(Value3[0] as string).subscribe(respuesta8 =>{
                console.log("respuesta8:",respuesta8);
                this.setRespen(respuesta8,"FechaInicioAndFin"); 
                const json = JSON.stringify(this.getRespen("FechaInicioAndFin"));
                JSON.parse(json, (key, value) => {
                  key4.push(key);
                  Value4.push(value);
                });
                console.log("Value4[0]:",Value4[0],Value4[1]);                
                if (window.confirm("SOLICITUD REPETIDA: \nELIMINAR SOLICITUD DE PETICIÓN DE VACACIÓN?\nID:"+Value3[0]+"\n\tFECHA INICIO:"+ Value4[0] as string+
                 "\n\tFECHA FIN:" + Value4[1] as string)){
                  this.crudService.BorrarVacacionById(Value3[0] as string).subscribe(respuesta8 =>{ //BORRAR SOLICITUD VACACION
                    this.crudService.ObtenerIDPersonal(this.user,this.passw).subscribe(respuesta =>{
                      this.setRespen(respuesta,"idpersonal");  
                      //console.log(respuesta);
                      const json = JSON.stringify(this.getRespen("idpersonal"));
                      JSON.parse(json, (key, value) => {
                        key1.push(key);
                        Value1.push(value);
                      });
            
                      //AGREGAR VACACION
            
                      if (this.formularioDeVacacion.value.vaca_disp >= this.formularioDeVacacion.value.dias_tomados){
                        this.crudService.AgregarVacaciones(Value1[0] as string,(this.fechaActual.getFullYear()) as any+"-"+(this.fechaActual.getMonth()) as any 
                        +"-"+(this.fechaActual.getDate()+" "+this.fechaActual.getHours()+":"+this.fechaActual.getMinutes()+":"+
                        this.fechaActual.getSeconds()) as any ,this.fromDate?.year+"-"+
                        this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+
                        this.fromDate?.month+"-"+ this.fromDate?.day,this.formularioDeVacacion.value.dias_tomados as number,
                        this.formularioDeVacacion.value.vaca_disp as number).subscribe(respuesta=>{
                          console.log("respuesta:",respuesta);
                          this.ruteador.navigateByUrl('/menu');
                        });
                        this.precargarDias();                    
                        this.router.navigate(['/menu']);
                        window.confirm("Solicitud de Vacación registrada");
                      }else{
                        console.log("Excede días disponibles");
                      }          
                    });
                  })
                  
                }                
              });             
            });
           
          }
        });
        
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
            vaca_disp:this.formularioDeVacacion.value.vaca_disp,
            saldo_dias:this.formularioDeVacacion.value.saldo_dias,
            dias_tomados:diferenciaDias,         
          }); 
        }     
      }
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var to = new NgbDate( this.toDate.year,this.toDate.month,this.toDate.day);
      var aux1 = new Date(fechaActualNg.year, fechaActualNg.month, fechaActualNg.day);
      var aux2 =new Date(from.year, from.month, from.day);
      var aux3 =new Date(to.year, to.month, to.day);

      if (this.compareDates(aux1,aux2) == 1 || this.compareDates(aux1,aux3) == 1){
        //console.log("CompareDateIncorrectos");
        this.btnIngresar = true;
      }else{
        //console.log("CompareDateCorrectos");
        if (
          this.formularioDeVacacion.value.vaca_disp <= this.formularioDeVacacion.value.dias_tomados
          || 
          (this.formularioDeVacacion.value.vaca_disp-this.formularioDeVacacion.value.saldo_dias) 
          <= this.formularioDeVacacion.value.dias_tomados
          ){
            this.btnIngresar = true;
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
              vaca_disp:this.formularioDeVacacion.value.vaca_disp,
              saldo_dias:this.formularioDeVacacion.value.saldo_dias,
              dias_tomados:diferenciaDias,         
            }); 
           }     
        }      
      if (this.compareDates(aux1,aux2) == 1 ){
        //console.log("CompareDateIncorrectos");
        this.btnIngresar = true;
      }else{
        //console.log("CompareDateCorrectos");
        this.btnIngresar = false;           
      }
      
		}    
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
  
}
