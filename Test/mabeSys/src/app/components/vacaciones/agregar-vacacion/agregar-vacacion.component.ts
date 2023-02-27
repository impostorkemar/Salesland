import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import * as moment from 'moment';
import { TestuserService } from 'src/app/services/testuser.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-agregar-vacacion',  
  templateUrl: './agregar-vacacion.component.html',
  styleUrls: ['./agregar-vacacion.component.css'],
  
})
export class AgregarVacacionComponent {
  hoveredDate: NgbDate | null = null;
	fromDate: NgbDate | null;
	toDate: NgbDate | null = null;
  cedula!: any;

  formularioDeVacacion:FormGroup;

  constructor(
    public formulario:FormBuilder,
    private crudService:CrudService,
    private ruteador:Router,
    calendar: NgbCalendar,
    private testuserService: TestuserService,
  ) { 
    this.formularioDeVacacion = this.formulario.group({      
      vaca_disp:[''],
      dias_tomados:[''],
      
    });
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.cedula = "";
  }

  ngOnInit(): void {
    this.formularioDeVacacion.controls['vaca_disp'].disable();
    this.formularioDeVacacion.controls['dias_tomados'].disable();
    this.cargarDiasDisponibles();
  }

  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/
    if (this.formularioDeVacacion)      
      this.crudService.AgregarPersonal(this.formularioDeVacacion.value).subscribe(respuesta=>{
        this.ruteador.navigateByUrl('/menu');
      });
      
  }

  onDateSelection(date: NgbDate) {
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
      console.log("this.fromDate: ",this.fromDate)
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
			this.toDate = date;
      console.log("this.toDate: ",this.toDate)
		} else {
			this.toDate = null;
			this.fromDate = date;
      console.log("this.fromDate: ",this.fromDate)
      console.log("this.toDate: ",this.toDate)
		}

    if (this.fromDate != null && this.toDate != null){
      if (this.fromDate.month == this.toDate.month){
        this.formularioDeVacacion.setValue({
          vaca_disp:this.formularioDeVacacion.value.vaca_disp,
          dias_tomados:this.countWorkDay(this.fromDate,this.toDate),          
        });
      }else{
        
        this.formularioDeVacacion.setValue({
          vaca_disp:this.formularioDeVacacion.value.vaca_disp,
          dias_tomados:this.countWorkDay(this.fromDate,this.toDate),          
        });
      }
      
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
              var corte =  new Date(corteYear,1,31);              
              var contrato = new Date((Array2[0] as string));   
              var antiguedad = (corte.getFullYear()-contrato.getFullYear())*12+(corte.getMonth()+contrato.getMonth())+(corte.getDate()-contrato.getDate())/30;           
              console.log("\ncorte: ",corte ,"\ncontrato",contrato,"\nantigued:",antiguedad); 
              
                            
                              
            }); 
          }
        });
      }
    });      
    

  }

  
   
  
}
