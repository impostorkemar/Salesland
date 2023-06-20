import { Component,ElementRef,HostListener,OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbDateStruct,NgbDate, NgbCalendar, NgbDatepickerModule, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { FLOAT } from 'html2canvas/dist/types/css/property-descriptors/float';
import { Detalle_comprobante } from '../../classModels/DetalleComprobante';

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
  formularioGastos:FormGroup;
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
  showCalendar1: boolean = false;  
  cedulaPrecargada: string = '';
  tipoOptions = ['Atención a Clientes', 'Insumos de Oficina', 'Transporte', 'Atención Empleados', 'Otros', 'Alimentación Empleados'];

  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;
  t: any; // Definir la propiedad 't'
  @ViewChild('calendarModal') calendarModal!: TemplateRef<any>;
  modalRef!: NgbModalRef;
  showModal = false;
  showCalendar2 = false;
  

  constructor(   
    private formBuilder: FormBuilder,
    private fb: FormBuilder,    
    private crudService:CrudService,
    private ruteador:Router,
    calendar: NgbCalendar,
    private testuserService: TestuserService,    
    private _decimalPipe: DecimalPipe,
    private router:Router,
    private route: ActivatedRoute,
    private calendar2: NgbCalendar,
    private elementRef: ElementRef,
    private modalService: NgbModal
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

    this.formularioGastos = new FormGroup({
      gastos: new FormArray([]),
    }); 

    this.formularioGastos.get('gastos.0.tipo')?.setValue(this.tipoOptions[0]);
          
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
    //this.formularioDeViaje.controls['fecha_gasto'].disable();  
    this.formularioDeViaje.controls['importe'].disable();  
    this.crearFechaActual();
    this.cargarDatosInfoPersonal();     
  }

  openCalendar() {
    this.modalRef = this.modalService.open(this.calendarModal, { backdrop: 'static', keyboard: false });
  }

  closeCalendar() {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    const isClickedInside = this.elementRef.nativeElement.contains(clickedElement);
    const isCalendarClicked = clickedElement.classList.contains('custom-day');

    if (!isClickedInside && !isCalendarClicked) {
      this.closeCalendar();
    }
  }

  imprimirGastos() {
    const gastos = this.formularioGastos.get('gastos') as FormArray;
    for (let i = 0; i < gastos.length; i++) {
      const gasto = gastos.at(i) as FormGroup;
      console.log('Gasto', i + 1);
      console.log('Tipo:', gasto.get('tipo')?.value);
      console.log('Cedula:', gasto.get('cedula')?.value);
      console.log('razon_social:', gasto.get('razon_social')?.value);
      console.log('n_documento:', gasto.get('n_documento')?.value);
      console.log('fechaEmision:', gasto.get('fechaEmision')?.value);
      console.log('base_imponible:', gasto.get('base_imponible')?.value);
      console.log('cero_base_imponible:', gasto.get('cero_base_imponible')?.value);
      console.log('iva:', gasto.get('iva')?.value);
      console.log('servicio10:', gasto.get('servicio10')?.value);
      console.log('importe_sinFact:', gasto.get('importe_sinFact')?.value);
      console.log('total:', gasto.get('total')?.value);
      console.log('-----------------------');
    }
  }
  
  getGastosControls(): AbstractControl[] {
    const gastos = this.formularioGastos.get('gastos');
    if (gastos instanceof FormArray) {
      return gastos.controls;
    }
    return [];
  }

  get gastos(): FormArray {
    return this.formularioGastos.get('gastos') as FormArray;
  }

  agregarGasto() {
    this.crudService.ObtenerCedulaByUser_Pass(this.user, this.passw).subscribe(respuesta => {
      this.cedulaPrecargada = respuesta['cedula'];
      console.log("cedula:", this.cedulaPrecargada);
      const gastos = this.formularioGastos.get('gastos') as FormArray;
      gastos.push(this.createGastoFormGroup());
  
      // Establecer valor predeterminado del control 'tipo'
      const nuevoGastoIndex = gastos.length - 1;
      const nuevoGasto = gastos.at(nuevoGastoIndex) as FormGroup;
      nuevoGasto.get('tipo')?.setValue(this.tipoOptions[0]);
  
      this.actualizarImporte();
    });    
  }
  

  eliminarGasto(index: number) {
    const gastos = this.formularioGastos.get('gastos') as FormArray;
    gastos.removeAt(index);
    this.actualizarImporte();
  }

  createGastoFormGroup(): FormGroup {
    return this.formBuilder.group({
      tipo: ['', Validators.required],
      cedula: new FormControl({ value: this.cedulaPrecargada as string, disabled: true }),
      razon_social: ['', Validators.required],
      n_documento: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      base_imponible:[0.0, Validators.required],
      cero_base_imponible: [0.0, Validators.required],
      iva: new FormControl({ value: 0.0, disabled: true }),
      servicio10: [0.0, Validators.required],
      importe_sinFact: [0.0, Validators.required],
      total: new FormControl({ value: 0.0, disabled: true }),
    });
  }

  onGastoValueChange(index: number) {
    const gastos = this.formularioGastos.get('gastos') as FormArray;
    const gasto = gastos.at(index) as FormGroup;
  
    let baseImponible = gasto.get('base_imponible')?.value || 0;
    let ceroBaseImponible = gasto.get('cero_base_imponible')?.value || 0;
    let servicio10 = gasto.get('servicio10')?.value || 0;
    let importe_sinFact = gasto.get('importe_sinFact')?.value || 0;
  
    // Validar que los valores no sean negativos
    baseImponible = Math.max(0, baseImponible);
    ceroBaseImponible = Math.max(0, ceroBaseImponible);
    servicio10 = Math.max(0, servicio10);
    importe_sinFact = Math.max(0, importe_sinFact);
  
    // Calcular el IVA y el total
    let iva = 0;
    if (baseImponible !== null) {
      iva = baseImponible * 0.12;
    }
    const total = baseImponible + ceroBaseImponible + iva + servicio10 + importe_sinFact;
  
    // Actualizar los valores
    gasto.get('base_imponible')?.setValue(baseImponible);
    gasto.get('cero_base_imponible')?.setValue(ceroBaseImponible);
    gasto.get('servicio10')?.setValue(servicio10);
    gasto.get('importe_sinFact')?.setValue(importe_sinFact);
    gasto.get('iva')?.setValue(iva);
    gasto.get('total')?.setValue(total);
    this.actualizarImporte()
  }
  

  actualizarImporte() {
    const gastos = this.formularioGastos.get('gastos') as FormArray;
    let total = 0;
  
    for (let i = 0; i < gastos.length; i++) {
      const control = gastos.at(i) as FormGroup;
      const totalControl = control.get('total');
  
      if (totalControl && totalControl.value) {
        total += +totalControl.value;
      }
    }
  
    this.formularioDeViaje.patchValue({ importe: total.toFixed(2) });
  }
  


  toggleCalendar1() {
    this.showCalendar1 = !this.showCalendar1;
  }
  toggleCalendar2() {
    this.showCalendar2 = !this.showCalendar2;
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
  
  cargarConflictoReembolsos(){
    //Fecha reembolso ya registrada              
    this.crudService.ObteneViajesAReasignarByUserPasswordFechas(this.user,this.passw,this.fromDate?.year+"-"+
    this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
    this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta13 =>{

      console.log("respuesta13:",respuesta13);
      var msg = "";
      for ( let item of respuesta13) {
        //console.log("item:",item);
        let aux1 = Object.values(item);
        msg = msg +"\nID:" + aux1[0]+ "\nFecha Inicio:" + aux1[1] + "\nFecha Fin:" + aux1[2] ; 
      }              
      var aux = "CONFLICTO CON LOS REEMBOLSOS:\n"+ msg as string;
      //console.log("aux:"+ aux);
      window.confirm(aux)
    });
  }

  enviarDatos(): void{    
    this.cargarNombreEnvioFile()
    if (this.formularioDeViaje){   
      let key4: string[]=[];
      let Value4: string[]=[];  
      if ( this.formularioDeViaje.get('punto_partida')?.value == ""
          || this.formularioDeViaje.get('punto_destino')?.value == ""          
          || this.formularioDeViaje.get('fecha_viaje_inicio')?.value == ""
          || this.formularioDeViaje.get('fecha_viaje_fin')?.value == ""
          || this.formularioDeViaje.get('fecha_gasto')?.value == 0){
            alert("Rellene campos vacíos")          
        }else{        
          //BUSQUEDA ID PERSONAL      
          if ( this.fromDate != null && this.toDate != null){
            //console.log(" FROM DATE && TO DATE"); 
            //console.log("fromDate:",this.fromDate,"\ntoDate:",this.toDate); 
            this.crudService.ObtenerExistenciaViajesByInicioFin(this.user,this.passw,this.fromDate?.year+"-"+
              this.fromDate?.month+"-"+ this.fromDate?.day,this.toDate?.year+"-"+
              this.toDate?.month+"-"+ this.toDate?.day).subscribe(respuesta10 =>{
                if(respuesta10['FECHAS_CAL'] as unknown as number === 0 || respuesta10['FECHAS_CAL'] === null){
                  //Ingreso correcto
                  this.agregarViaje();
                }else if (respuesta10['FECHAS_CAL'] as unknown as number > 0){
                  this.cargarConflictoReembolsos();
                }
              });
          }else if(this.fromDate != null && this.toDate == null){
            //console.log("SOLO FROM DATE");
            //console.log("fromDate:",this.fromDate,"\ntoDate:",this.toDate);  
            this.crudService.ObtenerExistenciaViajesByInicioFin(this.user,this.passw,this.fromDate?.year+"-"+
            this.fromDate?.month+"-"+ this.fromDate?.day,this.fromDate?.year+"-"+
            this.fromDate?.month+"-"+ this.fromDate?.day).subscribe(respuesta6 =>{
              if(respuesta6['FECHAS_CAL'] as unknown as number === 0 || respuesta6['FECHAS_CAL'] === null){
                this.agregarViaje();
              }else if (respuesta6['FECHAS_CAL'] as unknown as number > 0){
                this.cargarConflictoReembolsos();
              }
            });               
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

  onDateSelection1(date: NgbDate) {      
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
          if (respuesta) {
            var diferenciaDias = this.countWorkDay(this.fromDate, this.toDate);
            var fecha_v_in = `${this.fromDate?.year}-${this.fromDate?.month}-${this.fromDate?.day}`;
            var fecha_v_fin = `${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`;
        
            this.formularioDeViaje.setValue({    
              lugar: 'QUITO',
              fecha_reembolso: this.fechaActualText,
              nombre: respuesta['nombre'] + respuesta['apellido'],
              cedula: respuesta['cedula'],
              fecha_viaje_inicio: fecha_v_in,
              fecha_viaje_fin: fecha_v_fin,
              dias_viaje: diferenciaDias,
              punto_partida: this.formularioDeViaje.get('punto_partida')?.value,
              punto_destino: this.formularioDeViaje.get('punto_destino')?.value,
              fecha_gasto: this.formularioDeViaje.get('fecha_gasto')?.value,
              moneda: this.formularioDeViaje.get('moneda')?.value,
              cantidad_comprobantes: this.formularioDeViaje.get('cantidad_comprobantes')?.value,
              importe: this.formularioDeViaje.get('importe')?.value,
            });
                    
          } else {
            alert("Fallo al cargar la información del personal");
          }
         
        });
      }else{
        //console.log("this.fromDate != null && this.toDate != null")        
        this.crudService.ObtenerDataPersonaByUserAndPass(user,passw).subscribe(respuesta=>{
          //console.log("DATAUSER:",respuesta);
          if (respuesta) {
            var diferenciaDias = this.countWorkDay(this.fromDate, this.toDate);
            var fecha_v_in = `${this.fromDate?.year}-${this.fromDate?.month}-${this.fromDate?.day}`;
            var fecha_v_fin = `${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`;
        
            this.formularioDeViaje.setValue({    
              lugar: 'QUITO',
              fecha_reembolso: this.fechaActualText,
              nombre: respuesta['nombre'] + respuesta['apellido'],
              cedula: respuesta['cedula'],
              fecha_viaje_inicio: fecha_v_in,
              fecha_viaje_fin: fecha_v_fin,
              dias_viaje: diferenciaDias,
              punto_partida: this.formularioDeViaje.get('punto_partida')?.value,
              punto_destino: this.formularioDeViaje.get('punto_destino')?.value,
              fecha_gasto: this.formularioDeViaje.get('fecha_gasto')?.value,
              moneda: this.formularioDeViaje.get('moneda')?.value,
              cantidad_comprobantes: this.formularioDeViaje.get('cantidad_comprobantes')?.value,
              importe: this.formularioDeViaje.get('importe')?.value,
            });        
            
          } else {
            window.confirm("Fallo al cargar la información del personal");
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
            alert("Fallo al cargar la información del personal")
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
        alert('Se subio su reembolso correctamente');
      }).catch(error => {
        //console.error('Error:', error);
        alert('Hubo un error al subir el reembolso');
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
        
        const gastos = this.formularioGastos.get('gastos') as FormArray;

        if (gastos.length === 0) {
          alert('Debe agregar al menos un elemento en el detalle de comprobantes.');
          return;
        }
        const hasNullField = gastos.controls.some((gasto) => {
          const detalle_comprobante = gasto.value;
          for (const key in detalle_comprobante) {
            if (key !== "servicio10" && key !== "importe_sinFact" && key !== "iva" &&
            key !== "base_imponible" && key !== "cero_base_imponible"){
              if (detalle_comprobante[key] == '' || detalle_comprobante[key] == null || this.formularioDeViaje.get('importe')?.value == "0.00" ) {                
                return true;
              }
            }
          }
          return false;
        });
        if (hasNullField) {
          alert('Rellene todos los campos vacíos del detalle.');
          return;
        }else{
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
          viaje1.status = 'pendiente'; 
          viaje1.peticion = 'aprobacion'; 
          viaje1.motivo = ''; 
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
                  this.AgregarDetalleComprobantes(respuesta3['id_comprobante'])
                  this.uploadFile();
                });
              }
            });
          }          
        }
      }      
    });
  }

  AgregarDetalleComprobantes(idComprobante : any, ){
    const gastos = this.formularioGastos.get('gastos') as FormArray;
    for (let i = 0; i < gastos.length; i++) {
      const gasto = gastos.at(i) as FormGroup; 
      console.log("id:\n",i) 
      console.log('-----------------------');   
      console.log('Tipo:', gasto.get('tipo')?.value);
      console.log('Cedula:', gasto.get('cedula')?.value);
      console.log('razon_social:', gasto.get('razon_social')?.value);
      console.log('n_documento:', gasto.get('n_documento')?.value);
      console.log('fechaEmision:', gasto.get('fechaEmision')?.value);
      console.log('base_imponible:', gasto.get('base_imponible')?.value);
      console.log('cero_base_imponible:', gasto.get('cero_base_imponible')?.value);
      console.log('iva:', gasto.get('iva')?.value);
      console.log('servicio10:', gasto.get('servicio10')?.value);
      console.log('importe_sinFact:', gasto.get('importe_sinFact')?.value);
      console.log('total:', gasto.get('total')?.value);
      console.log('-----------------------');
      const detalle_comprobante = new Detalle_comprobante();
      detalle_comprobante.id_comprobante = idComprobante;
      detalle_comprobante.tipo = gasto.get('tipo')?.value as string;
      detalle_comprobante.ruc_cedula = gasto.get('cedula')?.value as string;
      detalle_comprobante.razon_social = gasto.get('razon_social')?.value as string;
      detalle_comprobante.n_documento = gasto.get('n_documento')?.value as string;
      detalle_comprobante.fecha_emision = gasto.get('fechaEmision')?.value as string;
      detalle_comprobante.base_imponible = gasto.get('base_imponible')?.value as string;
      detalle_comprobante.cero_base_imponible = gasto.get('cero_base_imponible')?.value;
      detalle_comprobante.iva = gasto.get('iva')?.value as string;
      detalle_comprobante.servicio10 = gasto.get('servicio10')?.value as string;
      detalle_comprobante.importe_sin_facturas = gasto.get('importe_sinFact')?.value as string;
      this.crudService.AgregarDetalleComprobante(detalle_comprobante).subscribe(respuesta3 =>{
        console.log("detalle_comprobante:\n",respuesta3)        
      });
    }    
  }

  downloadExcel() {
    console.log("Entre a download")
    this.crudService.downloadExcelFormatoReembolso().subscribe(blob => {
      saveAs(blob, "Formato Reembolso de Gastos viaje.xlsx");
    });
  }

}
function round(total: number, arg1: number): any {
  throw new Error('Function not implemented.');
}


