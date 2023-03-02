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
    this.passw = localStorage.getItem('PASS') as string
  }

  ngOnInit(): void {
    this.formularioDeVacacion.controls['vaca_disp'].disable();
    this.formularioDeVacacion.controls['dias_tomados'].disable();
    this.formularioDeVacacion.controls['saldo_dias'].disable();
    this.btnIngresar = true;
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

  cargarDiasTomadosPreviamente():string{
    let Key2: string[] = [];
    let Value2: string[]=[];
    this.crudService.ObtenertotalVacacionesTomadas(this.user,this.passw).subscribe(respuesta=>{
      //console.log("respuesta:",respuesta);
      this.setRespen(respuesta,"totalVaca");                  
    });   
    const json = JSON.stringify(this.getRespen("totalVaca"));
      JSON.parse(json, (key, value) => {
        Key2.push(key);
        Value2.push(value);
      });
    //console.log("Value2[0]:",Value2[0]);    
    return Value2[0];
  }

  cargarDiasDisponibles():string{
    let key1: string[]=[];
    let Value1: string[]=[];
    let key2: string[]=[];
    let Value2: string[]=[];    
    this.crudService.ObtenerCedulaByUser_Pass(this.user,this.passw).subscribe(respuesta=>{      
      //console.log("MENU",this.user,this.passw,"RESPONSE:",respuesta);
      this.setRespen(respuesta,"cedula");  
      const json = JSON.stringify(this.getRespen("cedula"));
      JSON.parse(json, (key, value) => { 
        key1.push(value);  
        Value1.push(value);                     
      });  
      this.cedula = Value1[0];    
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
            
          });   
        });        
    });  
    
      return this.antiguedad as unknown as string;    
  }

  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeVacacion){     
      let key1: string[]=[];
      let Value1: string[]=[];      

      //BUSQUEDA ID PERSONAL

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
            window.confirm("Vacación registrada")
            this.router.navigate(['/login']);
          }else{
            console.log("Excede días disponibles");
          }           
        }); 
    }
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      //console.log("this.fromDate: ",this.fromDate)
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
      //console.log("this.toDate: ",this.toDate)
		} else {
			this.toDate = null;
			this.fromDate = date;
      //console.log("this.fromDate: ",this.fromDate)
      //console.log("this.toDate: ",this.toDate)
		}
    if (this.fromDate != null && this.toDate != null){
      this.formularioDeVacacion.setValue({
        vaca_disp:this.formularioDeVacacion.value.vaca_disp,
        saldo_dias:this.formularioDeVacacion.value.saldo_dias,
        dias_tomados:this.countWorkDay(this.fromDate,this.toDate),  
        
      }); 
    }
    var myDate = new Date();
    var fechaActualNg = new NgbDate(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate());
    //console.log("myDate:",formatDate(myDate, 'yyyy/MM/dd', 'en'));
    if(this.formularioDeVacacion.value.vaca_disp <= this.formularioDeVacacion.value.dias_tomados){
      this.btnIngresar = true;
    }else if ( (this.formularioDeVacacion.value.vaca_disp-this.formularioDeVacacion.value.saldo_dias) <= this.formularioDeVacacion.value.dias_tomados){
      this.btnIngresar = true;
    }else{
      this.btnIngresar = false;      
    }    
    if ( this.toDate != null){      
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var to = new NgbDate( this.toDate.year,this.toDate.month,this.toDate.day);
      //console.log("fechaActual:",act)
      //console.log("fromDate:",from);
      //console.log("toDate:",to);      
      if (this.compare(fechaActualNg,from,to) == 1){
        this.btnIngresar = true;
      }else{
        this.btnIngresar = false;
      }      
    }
    
    
	}

  compare(dateTimeA: NgbDate, dateTimeB: NgbDate, dateTimeC: NgbDate){

    return 1      
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
    return this.workingDays(sDay.day+"/"+sDay.month+"/"+sDay.year,eDay.day+"/"+eDay.month+"/"+eDay.year);
    
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
  
}
