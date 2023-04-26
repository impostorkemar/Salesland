import { Component,OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormsModule,FormControl, Validators  } from '@angular/forms';
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
import { Viaje } from '../../classModels/Viaje';
import { getCurrencySymbol } from '@angular/common';
import { Comprobante } from '../../classModels/Comprobante';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-agregar-viaje',
  templateUrl: './agregar-viaje.component.html',
  styleUrls: ['./agregar-viaje.component.css'],
  providers: [DecimalPipe],
})
export class AgregarViajeComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
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
  myForm!:any;
  //currencies = ['USD', 'EUR', 'JPY', 'GBP', 'CAD', 'AUD', 'CHF', 'CNY', 'HKD', 'NZD', 'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 'INR', 'RUB', 'ZAR', 'TRY', 'BRL'];
  currencies = ['USD'];
  selectedCurrency!: string; 
  fechaActualText!:any; 
  fechaActualTextFile!:any; 
  nombreFile!:any;
  fechaEnvioName!: any;

  hoveredDate2: NgbDate | null = null;
  fromDate2: NgbDate | null = null;
  
  constructor(
    private fb: FormBuilder,    
    private crudService:CrudService,
    private ruteador:Router,
    calendar: NgbCalendar,
    private testuserService: TestuserService,    
    private _decimalPipe: DecimalPipe,
    private router:Router,
    private route: ActivatedRoute,
    private calendar2: NgbCalendar
  ) {         
    
    this.formularioDeViaje = this.fb.group({
      lugar: ['',Validators.required],
      fecha_reembolso: ['',Validators.required],
      nombre: ['',Validators.required],
      cedula: ['',Validators.required],
      fecha_viaje_inicio: ['',Validators.required],
      fecha_viaje_fin: ['',Validators.required],
      dias_viaje: ['',Validators.required],   
      punto_partida: ['',Validators.required],   
      punto_destino: ['',Validators.required],   
      fecha_gasto: ['',Validators.required],   
      moneda: [this.currencies[0],Validators.required],
      cantidad_comprobantes: ['',Validators.required],   
      importe: ['',Validators.required],   

    });

          
    this.fromDate = calendar.getToday();
		this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.cedula = "";
    this.btnIngresar = true;        
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
   
   
  }

  ngOnInit(): void {
    
    this.formularioDeViaje.controls['fecha_reembolso'].disable();    
    this.formularioDeViaje.controls['nombre'].disable();    
    this.formularioDeViaje.controls['cedula'].disable();    
    this.formularioDeViaje.controls['dias_viaje'].disable();   
    this.formularioDeViaje.controls['cantidad_comprobantes'].disable();  
    this.formularioDeViaje.controls['fecha_viaje_inicio'].disable();  
    this.formularioDeViaje.controls['fecha_viaje_fin'].disable();  
    this.formularioDeViaje.controls['fecha_gasto'].disable();  
    this.crearFechaActual();
    this.cargarDatosInfoPersonal();  
    
    
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
    this.cargarNombreEnvioFile()
    if (this.formularioDeViaje){   
      let key4: string[]=[];
      let Value4: string[]=[];      
      //BUSQUEDA ID PERSONAL      
      if ( this.fromDate != null && this.toDate != null){
        //console.log(" FROM DATE && TO DATE"); 
        //console.log("fromDate:",this.fromDate,"\ntoDate:",this.toDate); 
      }else if(this.fromDate != null && this.toDate == null){
        //console.log("SOLO FROM DATE");
        //console.log("fromDate:",this.fromDate,"\ntoDate:",this.toDate);                 
      } 
      if ( this.formularioDeViaje.get('punto_partida')?.value == ""
        || this.formularioDeViaje.get('punto_destino')?.value == ""
        || this.formularioDeViaje.get('importe')?.value == ""
        || this.formularioDeViaje.get('fecha_viaje_inicio')?.value == ""
        || this.formularioDeViaje.get('fecha_viaje_fin')?.value == ""
        || this.formularioDeViaje.get('fecha_gasto')?.value == 0){
          window.confirm("Rellene campos vacíos")          
      }else{        
        this.agregarViaje();
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

  onDateSelection(date: NgbDate) {      
    var myDate = new Date();
    var fechaActualNg = new NgbDate(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate());
		if (!this.fromDate && !this.toDate) { // NO ESCOGIO NINGUN DÍA
      //console.log("CASO 1");
			this.fromDate = date;
      
		} else if (this.fromDate && !this.toDate && date.after(this.fromDate)) { //ESCOGIO RANGO 
      //console.log("CASO 2");
			this.toDate = date;
      this.cargarDatosInfoPersonal()
                       
		} else {  //ESCOGIO UN DÍA
      //console.log("CASO 3");
			this.toDate = null;
			this.fromDate = date;      
      this.cargarDatosInfoPersonal()      
                
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
  
  isDisabled2(date2: NgbDate) {
    const current = this.calendar2.getToday();
    return date2.after(current);
  }

  isSelected2(date2: NgbDate) {
    return this.fromDate2 && date2.equals(this.fromDate2);
  }

  onDateSelection2(date2: NgbDate) {    
    if (this.fromDate2 != null) {      
      this.fromDate2 = date2;
      this.cargarDatosInfoPersonal()
      //console.log("this.fromDate2:",this.fromDate2)
      
    } else if (this.fromDate2 && date2.equals(this.fromDate2)) {
      this.fromDate2 = null;
      this.cargarDatosInfoPersonal()
      //console.log("this.fromDate2:",this.fromDate2)
    } else {
      this.fromDate2 = date2;
      this.cargarDatosInfoPersonal()
      //console.log("this.fromDate2:",this.fromDate2)
    }
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

  crearFechaActual(){
    this.fechaActual =  new Date();   
    let anio = this.fechaActual.getFullYear();
    let mes = this.fechaActual.getMonth() + 1; // los meses empiezan en 0, por lo que hay que sumar 1
    let dia = this.fechaActual.getDate();
    let hora = this.fechaActual.getHours();
    let min = this.fechaActual.getMinutes();
    let sec = this.fechaActual.getSeconds();
    let dateFormated = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} `;
    let dateFormatedFile = `${anio}${mes.toString().padStart(2, '0')}${dia.toString().padStart(2, '0')}-${hora.toString().padStart(2, '0')}${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    let dateFormatedFile2 = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}${sec.toString().padStart(2, '0')}`;
    this.fechaActualText = dateFormated as unknown as string;
    this.fechaActualTextFile = dateFormatedFile as unknown as string;
  }

  crearFechaEnvio(){
    let anio = this.fechaActual.getFullYear();
    let mes = this.fechaActual.getMonth() + 1; // los meses empiezan en 0, por lo que hay que sumar 1
    let dia = this.fechaActual.getDate();
    let hora = this.fechaActual.getHours();
    let min = this.fechaActual.getMinutes();
    let sec = this.fechaActual.getSeconds();
    let dateFormatedFile2 = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')} ${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    return dateFormatedFile2
  }

  cargarNombreEnvioFile(){
    this.crearFechaActual()

    let anio = this.fechaActual.getFullYear();
    let mes = this.fechaActual.getMonth() + 1; // los meses empiezan en 0, por lo que hay que sumar 1
    let dia = this.fechaActual.getDate();
    let hora = this.fechaActual.getHours();
    let min = this.fechaActual.getMinutes();
    let sec = this.fechaActual.getSeconds();   
    this.fechaEnvioName  =  `${anio}${mes.toString().padStart(2, '0')}${dia.toString().padStart(2, '0')}_${hora.toString().padStart(2, '0')}${min.toString().padStart(2, '0')}${sec.toString().padStart(2, '0')}`;
    this.nombreFile = this.formularioDeViaje.get('nombre')?.value as string+"_"+this?.fechaEnvioName+".zip"
    console.log("NombreFile:",this.nombreFile)
  }

  cargarDatosInfoPersonal(){    
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    //console.log("this.fromDate:",this.fromDate);
    //console.log("this.toDate:",this.toDate);
    if ( this.fromDate != null && this.toDate != null  ){
      if ( this.fromDate2 != null){
        //console.log("this.fromDate != null && this.toDate != null")        
        this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
          if(respuesta){
            //console.log("DATAUSER:",respuesta);
            var diferenciaDias = this.countWorkDay(this.fromDate,this.toDate);
            var fecha_v_in = this.fromDate?.year+"-"+this.fromDate?.month+"-"+this.fromDate?.day as unknown as string
            var fecha_v_fin = this.toDate?.year+"-"+this.toDate?.month+"-"+this.toDate?.day as unknown as string
            var fecha_gasto = this.fromDate2?.year+"-"+this.fromDate2?.month+"-"+this.fromDate2?.day as unknown as string
            this.formularioDeViaje.setValue({      
              lugar:'QUITO',
              fecha_reembolso:this.fechaActualText,
              nombre:respuesta['nombre'] + respuesta['apellido'],
              cedula:respuesta['cedula'],
              fecha_viaje_inicio:fecha_v_in,
              fecha_viaje_fin:fecha_v_fin,
              dias_viaje:diferenciaDias,
              punto_partida:this.formularioDeViaje.get('punto_partida')?.value,
              punto_destino:this.formularioDeViaje.get('punto_destino')?.value,
              fecha_gasto:fecha_gasto,
              moneda:this.formularioDeViaje.get('moneda')?.value,
              cantidad_comprobantes:this.formularioDeViaje.get('cantidad_comprobantes')?.value,
              importe:this.formularioDeViaje.get('importe')?.value,
            });
          }else {
            window.confirm("Fallo al cargar la información del personal")
          }
         
        });
      }else{
        //console.log("this.fromDate != null && this.toDate != null")        
        this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
          //console.log("DATAUSER:",respuesta);
          if (respuesta){
            var diferenciaDias = this.countWorkDay(this.fromDate,this.toDate);
            var fecha_v_in = this.fromDate?.year+"-"+this.fromDate?.month+"-"+this.fromDate?.day as unknown as string
            var fecha_v_fin = this.toDate?.year+"-"+this.toDate?.month+"-"+this.toDate?.day as unknown as string         
            this.formularioDeViaje.setValue({      
              lugar:'QUITO',
              fecha_reembolso:this.fechaActualText,
              nombre:respuesta['nombre'] + respuesta['apellido'],
              cedula:respuesta['cedula'],
              fecha_viaje_inicio:fecha_v_in,
              fecha_viaje_fin:fecha_v_fin,
              dias_viaje:diferenciaDias,
              punto_partida:this.formularioDeViaje.get('punto_partida')?.value,
              punto_destino:this.formularioDeViaje.get('punto_destino')?.value,
              fecha_gasto:0,
              moneda:this.formularioDeViaje.get('moneda')?.value,
              cantidad_comprobantes:this.formularioDeViaje.get('cantidad_comprobantes')?.value,
              importe:this.formularioDeViaje.get('importe')?.value,
            });
          }else{
            window.confirm("Fallo al cargar la información del personal")
          }
          
        });
      }
           
    }else if ( this.fromDate != null && this.toDate == null){
      if ( this.fromDate2 != null){
        //console.log("this.fromDate != null && this.toDate == null")
        
        this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
          //console.log("DATAUSER:",respuesta);
          var diferenciaDias = this.countWorkDay(this.fromDate,this.fromDate);
          var fecha_v_in = this.fromDate?.year+"-"+this.fromDate?.month+"-"+this.fromDate?.day as unknown as string
          var fecha_gasto = this.fromDate2?.year+"-"+this.fromDate2?.month+"-"+this.fromDate2?.day as unknown as string
          if (respuesta){
            this.formularioDeViaje.setValue({      
              lugar:'QUITO',
              fecha_reembolso:this.fechaActualText,
              nombre:respuesta['nombre'] + respuesta['apellido'],
              cedula:respuesta['cedula'],
              fecha_viaje_inicio:fecha_v_in,
              fecha_viaje_fin:fecha_v_in,
              dias_viaje:diferenciaDias,
              punto_partida:this.formularioDeViaje.get('punto_partida')?.value,
              punto_destino:this.formularioDeViaje.get('punto_destino')?.value,
              fecha_gasto:fecha_gasto,
              moneda:this.formularioDeViaje.get('moneda')?.value,
              cantidad_comprobantes:this.formularioDeViaje.get('cantidad_comprobantes')?.value,
              importe:this.formularioDeViaje.get('importe')?.value,
            });
          }else{
            window.confirm("Fallo al cargar la información del personal")
          }
         
        });
      } else{
        //console.log("this.fromDate != null && this.toDate == null")
        var user = localStorage.getItem('USER') as string;
        var passw = localStorage.getItem('PASS') as string
        this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
          //console.log("DATAUSER:",respuesta);
          var diferenciaDias = this.countWorkDay(this.fromDate,this.fromDate);
          var fecha_v_in = this.fromDate?.year+"-"+this.fromDate?.month+"-"+this.fromDate?.day as unknown as string
          this.formularioDeViaje.setValue({      
            lugar:'QUITO',
            fecha_reembolso:this.fechaActualText,
            nombre:respuesta['nombre'] + respuesta['apellido'],
            cedula:respuesta['cedula'],
            fecha_viaje_inicio:fecha_v_in,
            fecha_viaje_fin:fecha_v_in,
            dias_viaje:diferenciaDias,
            punto_partida:this.formularioDeViaje.get('punto_partida')?.value,
            punto_destino:this.formularioDeViaje.get('punto_destino')?.value,
            fecha_gasto:0,
            moneda:this.formularioDeViaje.get('moneda')?.value,
            cantidad_comprobantes:this.formularioDeViaje.get('cantidad_comprobantes')?.value,
            importe:this.formularioDeViaje.get('importe')?.value,
          });
        });
      }  
    }else if(this.fromDate == null && this.toDate == null){
      //console.log("this.fromDate == null && this.toDate == null")
      var user = localStorage.getItem('USER') as string;
      var passw = localStorage.getItem('PASS') as string
      this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
        //console.log("DATAUSER:",respuesta);       
        this.formularioDeViaje.setValue({      
          lugar:'QUITO',
          fecha_reembolso:this.fechaActualText,
          nombre:respuesta['nombre'] + respuesta['apellido'],
          cedula:respuesta['cedula'],
          fecha_viaje_inicio:'Escoge dias de viaje',
          fecha_viaje_fin:'Escoge dias de viaje',
          dias_viaje:0,
          punto_partida:'Ingresa tu lugar de partida',
          punto_destino:'Ingresa tu lugar de destino',
          fecha_gasto:'Escoge fecha de gasto',
          moneda:this.formularioDeViaje.get('moneda')?.value,
          cantidad_comprobantes:[''],
          importe:'Ingresa importe total',
        });
      });    
    }
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
   
    if (this.file != null){           
      this.crudService.uploadFile(this.file,this.nombreFile).then(data =>{
        //console.log('Data:', data);
        window.confirm('Se subio su reembolso correctamente');
      }).catch(error => {
        //console.error('Error:', error);
        window.confirm('Hubo un error al subir el reembolso');
      });
    }
  }


  onFileSelectTypesFiles(event: any) {
    const files: FileList = event.target.files;
    const allowedExtensions = ["rar","zip", "pdf", "jpg", "jpeg", "png", "gif","xlsx"];

    const zip = new JSZip();
    let isValid = true;
    let archivos = ""
    let i

    for (i = 0; i < files.length; i++) {
      const file: File = files[i];
      const extension = file.name.split(".").pop()?.toLowerCase()??'';
      

      if (!allowedExtensions.includes(extension)) {
        archivos = archivos + `\n\t${file.name}` ;
        isValid = false;
       
      }else{
        zip.file(file.name, file);
      }     
      
    }

    if(!isValid) {
      window.alert(`Tipo de archivos: \n\t${archivos} \ntienen una extensión inválida`);    
      this.formularioDeViaje.setValue({
        lugar:this.formularioDeViaje.get('lugar')?.value,
        fecha_reembolso:this.formularioDeViaje.get('fecha_reembolso')?.value,
        nombre:this.formularioDeViaje.get('nombre')?.value,
        cedula:this.formularioDeViaje.get('cedula')?.value,
        fecha_viaje_inicio:this.formularioDeViaje.get('fecha_viaje_inicio')?.value,
        fecha_viaje_fin:this.formularioDeViaje.get('fecha_viaje_fin')?.value,
        dias_viaje:this.formularioDeViaje.get('dias_viaje')?.value,
        punto_partida:this.formularioDeViaje.get('punto_partida')?.value,
        punto_destino:this.formularioDeViaje.get('punto_destino')?.value,
        fecha_gasto:this.formularioDeViaje.get('fecha_gasto')?.value,
        moneda:this.formularioDeViaje.get('moneda')?.value,
        cantidad_comprobantes:0,
        importe:this.formularioDeViaje.get('importe')?.value,
      });
      this.btnIngresar = true;
      event.target.value = ''; // reset the file input
    }else{
      this.formularioDeViaje.setValue({
        lugar:this.formularioDeViaje.get('lugar')?.value,
        fecha_reembolso:this.formularioDeViaje.get('fecha_reembolso')?.value,
        nombre:this.formularioDeViaje.get('nombre')?.value,
        cedula:this.formularioDeViaje.get('cedula')?.value,
        fecha_viaje_inicio:this.formularioDeViaje.get('fecha_viaje_inicio')?.value,
        fecha_viaje_fin:this.formularioDeViaje.get('fecha_viaje_fin')?.value,
        dias_viaje:this.formularioDeViaje.get('dias_viaje')?.value,
        punto_partida:this.formularioDeViaje.get('punto_partida')?.value,
        punto_destino:this.formularioDeViaje.get('punto_destino')?.value,
        fecha_gasto:this.formularioDeViaje.get('fecha_gasto')?.value,
        moneda:this.formularioDeViaje.get('moneda')?.value,
        cantidad_comprobantes:i as unknown as string,
        importe:this.formularioDeViaje.get('importe')?.value,            
      });
      this.file = zip;
      this.btnIngresar = false;      
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

  getSymbol(currency: string): string {
    return getCurrencySymbol(currency, 'wide');
  }  

  

  agregarViaje(){  
    var user = localStorage.getItem('USER') as string;
    var passw = localStorage.getItem('PASS') as string
    this.crudService.ObtenerIDPersonal(user,passw).subscribe(respuesta=>{
      //console.log("Id_personal:\n",respuesta)
      if (respuesta){        
        const viaje1 = new Viaje();
          viaje1.id_personal = respuesta['id_personal'];   
          viaje1.lugar =  this.formularioDeViaje.get('lugar')?.value;
          viaje1.fecha_reembolso = this.crearFechaEnvio();     
          viaje1.fecha_viaje_inicio = this.formularioDeViaje.get('fecha_viaje_inicio')?.value;
          viaje1.fecha_viaje_fin = this.formularioDeViaje.get('fecha_viaje_fin')?.value;
          viaje1.duracion = this.formularioDeViaje.get('dias_viaje')?.value;
          viaje1.punto_partida = this.formularioDeViaje.get('punto_partida')?.value;
          viaje1.punto_destino = this.formularioDeViaje.get('punto_destino')?.value;
          viaje1.fecha_gasto = this.formularioDeViaje.get('fecha_gasto')?.value;
          viaje1.moneda = this.formularioDeViaje.get('moneda')?.value;
          viaje1.cantidad_comprobantes = this.formularioDeViaje.get('cantidad_comprobantes')?.value;
          viaje1.importe = this.formularioDeViaje.get('importe')?.value; 
        if(window.confirm("Desea agregar este viaje a reembolso:\n\tLugar:"
        +viaje1.lugar+"\n\tFecha Reembolso:"+viaje1.fecha_reembolso+"\n\tFecha_viaje_inicio:"+viaje1.fecha_viaje_inicio
        +"\n\tFecha_viaje_fin:"+viaje1.fecha_viaje_fin+"\n\tDuracion:"+viaje1.duracion+"\n\tPunto_partida:"+viaje1.punto_partida
        +"\n\tPunto_destino:"+viaje1.punto_destino+"\n\tFecha_gasto:"+viaje1.fecha_gasto+"\n\tMoneda:"+viaje1.moneda
        +"\n\tCantidad_comprobantes:"+viaje1.cantidad_comprobantes+"\n\tImporte:"+viaje1.importe)){
          this.crudService.AgregarViaje(viaje1).subscribe(respuesta2 =>{
            console.log("viaje1:\n",respuesta2)
            if ( respuesta2){
              const comprobante1 = new Comprobante();
              comprobante1.id_viaje = respuesta2['id_viaje'];
              comprobante1.ruta_zip = this.nombreFile;
              this.crudService.AgregarComprobante(comprobante1).subscribe(respuesta3 =>{
                console.log("comprobante1:\n",respuesta3)
                this.uploadFile();
              });
            }
          });
        }
      }      
    });
  }

  downloadExcel() {3
    console.log("Entre a download")
    this.crudService.downloadExcelFormatoReembolso().subscribe(blob => {
      saveAs(blob, "Formato Reembolso de Gastos viaje.xlsx");
    });
  }

  

}
