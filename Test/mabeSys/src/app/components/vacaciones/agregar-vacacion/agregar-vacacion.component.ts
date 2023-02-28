import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import * as moment from 'moment';
import { TestuserService } from 'src/app/services/testuser.service';
import { DatePipe, DecimalPipe } from '@angular/common';


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

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router,
    calendar: NgbCalendar,
    private testuserService: TestuserService,    
    private _decimalPipe: DecimalPipe,
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
  }

  ngOnInit(): void {
    this.formularioDeVacacion.controls['vaca_disp'].disable();
    this.formularioDeVacacion.controls['dias_tomados'].disable();
    this.formularioDeVacacion.controls['saldo_dias'].disable();
    this.cargarDiasDisponibles();
    
  }

  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeVacacion)      
      this.crudService.AgregarVacaciones((this.fechaActual.getFullYear()) as any+"-"+(this.fechaActual.getMonth()) as any 
      +"-"+(this.fechaActual.getDate()) as any ,this.fromDate?.year+"-"+
      this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+this.toDate?.month+"-"+
      this.toDate?.day,this.formularioDeVacacion.value.saldo_dias as number,
      this.formularioDeVacacion.value.vaca_disp as number).subscribe(respuesta=>{
        console.log(respuesta);
        this.ruteador.navigateByUrl('/menu');
      });
      
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
        dias_tomados:this.countWorkDay(this.fromDate,this.toDate),  
        saldo_dias:this.formularioDeVacacion.value.saldo_dias,
      }); 
    }

    if(this.formularioDeVacacion.value.vaca_disp <= this.formularioDeVacacion.value.dias_tomados){
      this.btnIngresar = false;
    }else{
      this.btnIngresar = true;
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

  cargarDiasDisponibles(){
    let Array: string[]=[];
    let Array2: string[]=[];
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.crudService.ObtenerCedulaByUser_Pass(user,passw).subscribe(respuesta=>{      
      //console.log("MENU",user,passw,"RESPONSE:",respuesta);
      if (respuesta != null){
        const json = JSON.stringify(respuesta);
        JSON.parse(json, (key, value) => { 
          if (Array.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
            //console.log('key:'+key+'Array:'+Array.indexOf(key));
            Array.push(value);  
          }                      
        });  
        this.cedula = Array[0];        
        this.crudService.ObtenerFechaInicioContrato(this.cedula).subscribe(respuesta2=>{
          //console.log("CEDULA:",this.cedula,"RESPONSE:",respuesta2);          
          if (respuesta2 != null){
            const json = JSON.stringify(respuesta2);
            JSON.parse(json, (key, value) => { 
              if (Array2.indexOf(key)==-1 && isNaN(parseInt(key, 10)) && key!=''){
                //console.log('key:'+key+'Array:'+Array.indexOf(key));
                Array2.push(value);

              }    
              const datePipe = new DatePipe('en-US'); 
              var corteYear = new Date().getFullYear();
              this.corte =  new NgbDate(corteYear,1,31);              
              this.contrato = new Date((Array2[0] as string));  
              //console.log("\ncorte: ",corte.year+"/"+corte.month+"/"+corte.day ,
              //"\ncontrato",contrato.getFullYear()+"/"+contrato.getMonth()+"/"+contrato.getDate()) 
              this.antiguedad = (this._decimalPipe.transform(((this.corte.year-this.contrato.getFullYear())*12+(this.corte.month-this.contrato.getMonth())+(this.corte.day-this.contrato.getDate())/30)*1.25,"1.0-1") as any) as number;           
             
              //console.log("\nantigued:",(corte.year-contrato.getFullYear())*12,"\n",(corte.month-contrato.getMonth()),"\n",(corte.day),"\n",(contrato.getDate())); 
              //console.log("antiguedad: ",antiguedad);
              this.formularioDeVacacion.setValue({
                vaca_disp:this.antiguedad,
                dias_tomados:0,    
                saldo_dias:0,
              });
                              
            }); 
          }
        });
      }
    });      
    

  }

  
   
  
}
