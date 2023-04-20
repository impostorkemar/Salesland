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
import * as JSZip from 'jszip';

@Component({
  selector: 'app-agregar-viaje',
  templateUrl: './agregar-viaje.component.html',
  styleUrls: ['./agregar-viaje.component.css'],
  providers: [DecimalPipe],
})
export class AgregarViajeComponent {
  hoveredDate: NgbDate | null = null;
  hoveredDate2: NgbDate | null = null;
  chargeDate: NgbDate | null = null;  
	fromDate: NgbDate | null;
	toDate: NgbDate | null = null;  
  cedula!: any;
  formularioDeViaje:FormGroup;
  btnIngresar: boolean;
  fechaActual!:Date;
  resp!:String[];  
  user!:String;
  passw!:String;
  file!:any;

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
    this.formularioDeViaje = this.formulario.group({      
      lugar:'' ,
      fecha_reembolso:[''],disabled: true,
      nombre:[''],
      cedula:[''],
      fecha_viaje_inicio:[''],
      fecha_viaje_fin:[''],
      duracion:[''],
      punto_partida:[''],
      punto_destino:[''],
      fecha_gasto:[''],
      moneda:[''],
      cantidad_comprobantes:[''],
      importe:[''],
    });
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.cedula = "";
    this.btnIngresar = true;   
    this.fechaActual =  new Date();    
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
   
   
  }

  ngOnInit(): void {
       
    
    this.cargarDatosInfoPersonal();
    this.formularioDeViaje.controls['lugar'].disable();
    this.formularioDeViaje.controls['fecha_reembolso'].disable();
    this.formularioDeViaje.controls['nombre'].disable();
    this.formularioDeViaje.controls['cedula'].disable();
    this.formularioDeViaje.controls['fecha_viaje_inicio'].disable();
    this.formularioDeViaje.controls['fecha_viaje_fin'].disable();
    this.formularioDeViaje.controls['duracion'].disable();
    this.formularioDeViaje.controls['fecha_gasto'].disable();
    
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
  
  enviarDatos(): void{    
    /*console.log("FORMULARIO:",this.formularioDeUsuario.value);*/

    if (this.formularioDeViaje){     
       
      let key4: string[]=[];
      let Value4: string[]=[]; 

      this.uploadFile()
     
      //BUSQUEDA ID PERSONAL
      
      if ( this.fromDate != null && this.toDate != null){
        console.log(" FROM DATE && TO DATE"); 
        console.log("fromDate:",this.fromDate,"\ntoDate:",this.toDate);       
          
        
      }else if(this.fromDate != null && this.toDate == null){
        console.log("SOLO FROM DATE");
                
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
          this.formularioDeViaje.setValue({
            lugar:this.formularioDeViaje.value.lugar,
            fecha_reembolso:this.formularioDeViaje.value.fecha_reembolso,disabled: true,
            nombre:this.formularioDeViaje.value.nombre,
            cedula:this.formularioDeViaje.value.cedula,
            fecha_viaje_inicio:this.formularioDeViaje.value.fecha_viaje_inicio,
            fecha_viaje_fin:this.formularioDeViaje.value.fecha_viaje_fin,
            duracion:this.formularioDeViaje.value.duracion,
            punto_partida:this.formularioDeViaje.value.punto_partida,
            punto_destino:this.formularioDeViaje.value.punto_destino,
            fecha_gasto:this.formularioDeViaje.value.fecha_gasto,
            moneda:this.formularioDeViaje.value.moneda,
            cantidad_comprobantes:this.formularioDeViaje.value.cantidad_comprobantes,
            importe:this.formularioDeViaje.value.importe,            
          }); 
        }     
      }
      var from = new NgbDate( this.fromDate.year,this.fromDate.month,this.fromDate.day);
      var to = new NgbDate( this.toDate.year,this.toDate.month,this.toDate.day);
      var aux1 = new Date(fechaActualNg.year, fechaActualNg.month, fechaActualNg.day);
      var aux2 =new Date(from.year, from.month, from.day);
      var aux3 =new Date(to.year, to.month, to.day);

      //console.log("CompareDateCorrectos");
      console.log("\lugar:",this.formularioDeViaje.value.lugar)
      console.log("fecha_reembolso:",this.formularioDeViaje.value.fecha_reembolso)
      console.log("nombre:",this.formularioDeViaje.value.nombre)
      console.log("cedula:",this.formularioDeViaje.value.cedula)      
      console.log("fecha_viaje_inicio:",this.formularioDeViaje.value.fecha_viaje_inicio)
      console.log("fecha_viaje_fin:",this.formularioDeViaje.value.fecha_viaje_fin)
      console.log("duracion:",this.formularioDeViaje.value.duracion)
      console.log("punto_partida:",this.formularioDeViaje.value.punto_partida)
      console.log("punto_destino:",this.formularioDeViaje.value.punto_destino)
      console.log("fecha_gasto:",this.formularioDeViaje.value.fecha_gasto)     
      console.log("moneda:",this.formularioDeViaje.value.moneda)
      console.log("cantidad_comprobantes:",this.formularioDeViaje.value.cantidad_comprobantes)
      console.log("importe:",this.formularioDeViaje.value.importe)      
            
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
            this.formularioDeViaje.setValue({
              lugar:this.formularioDeViaje.value.lugar,
              fecha_reembolso:this.formularioDeViaje.value.fecha_reembolso,disabled: true,
              nombre:this.formularioDeViaje.value.nombre,
              cedula:this.formularioDeViaje.value.cedula,
              fecha_viaje_inicio:this.formularioDeViaje.value.fecha_viaje_inicio,
              fecha_viaje_fin:this.formularioDeViaje.value.fecha_viaje_fin,
              duracion:this.formularioDeViaje.value.duracion,
              punto_partida:this.formularioDeViaje.value.punto_partida,
              punto_destino:this.formularioDeViaje.value.punto_destino,
              fecha_gasto:this.formularioDeViaje.value.fecha_gasto,
              moneda:this.formularioDeViaje.value.moneda,
              cantidad_comprobantes:this.formularioDeViaje.value.cantidad_comprobantes,
              importe:this.formularioDeViaje.value.importe,            
            }); 
           }     
        }  
      //console.log("CompareDateCorrectos");
      console.log("\lugar:",this.formularioDeViaje.value.lugar)
      console.log("fecha_reembolso:",this.formularioDeViaje.value.fecha_reembolso)
      console.log("nombre:",this.formularioDeViaje.value.nombre)
      console.log("cedula:",this.formularioDeViaje.value.cedula)      
      console.log("fecha_viaje_inicio:",this.formularioDeViaje.value.fecha_viaje_inicio)
      console.log("fecha_viaje_fin:",this.formularioDeViaje.value.fecha_viaje_fin)
      console.log("duracion:",this.formularioDeViaje.value.duracion)
      console.log("punto_partida:",this.formularioDeViaje.value.punto_partida)
      console.log("punto_destino:",this.formularioDeViaje.value.punto_destino)
      console.log("fecha_gasto:",this.formularioDeViaje.value.fecha_gasto)     
      console.log("moneda:",this.formularioDeViaje.value.moneda)
      console.log("cantidad_comprobantes:",this.formularioDeViaje.value.cantidad_comprobantes)
      console.log("importe:",this.formularioDeViaje.value.importe)           
		}    
	}

  onDateSelection2(date: NgbDate) {
    var myDate = new Date();
    var fechaActualNg = new NgbDate(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate());
		if (!this.chargeDate ) { // NO ESCOGIO NINGUN DÍA
      //console.log("CASO 1");
			this.chargeDate = date;
      
		}else {  //ESCOGIO UN DÍA
      //console.log("CASO 3");			
			this.chargeDate = date;
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

  isHovered2(date: NgbDate) {
		return (
			this.chargeDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside2(date: NgbDate) {
		return this.chargeDate && date.after(this.fromDate) && date.before(this.toDate);
	}

  isRange2(date: NgbDate) {
		return (
			date.equals(this.chargeDate) ||
			(this.chargeDate && date.equals(this.chargeDate)) ||
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

  esFinDeSemana2 = (date: NgbDate) => {
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

  cargarDatosInfoPersonal(){
    this.fechaActual =  new Date();
    let anio = this.fechaActual.getFullYear();
    let mes = this.fechaActual.getMonth() + 1; // los meses empiezan en 0, por lo que hay que sumar 1
    let dia = this.fechaActual.getDate();
    let dateFormated = `${anio}/${mes.toString().padStart(2, '0')}/${dia.toString().padStart(2, '0')}`;
    
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
      console.log("DATAUSER:",respuesta);
      this.formularioDeViaje = this.formulario.group({      
        lugar:'QUITO',
        fecha_reembolso:dateFormated,disabled: true,
        nombre:respuesta['nombre'] + respuesta['apellido'],
        cedula:respuesta['cedula'],
        fecha_viaje_inicio:[''],
        fecha_viaje_fin:[''],
        duracion:[''],
        punto_partida:[''],
        punto_destino:[''],
        fecha_gasto:[''],
        moneda:[''],
        cantidad_comprobantes:[''],
        importe:[''],
      });
    });        
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        // Aquí puedes hacer lo que quieras con el archivo ZIP, por ejemplo:
        // - Descomprimirlo
        // - Leer sus contenidos
        // - Enviar el archivo al servidor
        this.file = file;
        this.btnIngresar = false;   
      };
    }else{
      this.btnIngresar = true;   
    }
  }

  uploadFile(){
    let anio = this.fechaActual.getFullYear();
    let mes = this.fechaActual.getMonth() + 1; // los meses empiezan en 0, por lo que hay que sumar 1
    let dia = this.fechaActual.getDate();
    let dateFormated = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    if (this.file != null){
      var nombre = this.formularioDeViaje.value.nombre+"_"+dateFormated+".zip"
      this.crudService.uploadFile(this.file,nombre).then(data =>{
        console.log('Data:', data);
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }


  onFileSelectTypesFiles(event: any) {
    const files: FileList = event.target.files;
    const allowedExtensions = ["rar","zip", "pdf", "jpg", "jpeg", "png", "gif"];

    const zip = new JSZip();

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const extension = file.name.split(".").pop()?.toLowerCase()??'';

      if (!allowedExtensions.includes(extension)) {
        console.log(`File ${file.name} has an invalid extension.`);
        continue;
      }
      zip.file(file.name, file);
    }

    if (zip) {
      this.file = zip;
      this.btnIngresar = false;
    }else{
      this.btnIngresar = true;   
    }


    /*zip.generateAsync({ type: "blob" }).then((content) => {
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'files.zip';
      link.click();
      console.log("comprimi")
    });*/


  }
  

}
