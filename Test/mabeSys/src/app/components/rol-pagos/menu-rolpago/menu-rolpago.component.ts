import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-menu-rolpago',
  templateUrl: './menu-rolpago.component.html',
  styleUrls: ['./menu-rolpago.component.css']
})
export class MenuRolpagoComponent {

  public listaCompleta: any[] = [
    { fecha: new Date('2020-1-01'), info: 'Información de enero 2020' },
    { fecha: new Date('2020-2-01'), info: 'Información de febrero 2020' },
    { fecha: new Date('2020-3-01'), info: 'Información de marzo 2020' },
    { fecha: new Date('2020-4-01'), info: 'Información de abril 2020' },
    { fecha: new Date('2020-5-01'), info: 'Información de mayo 2020' },
    { fecha: new Date('2020-6-01'), info: 'Información de junio 2020' },
    { fecha: new Date('2020-7-01'), info: 'Información de julio 2020' },
    { fecha: new Date('2020-8-01'), info: 'Información de agosto 2020' },
    { fecha: new Date('2020-9-01'), info: 'Información de septiembre 2020' },
    { fecha: new Date('2020-10-01'), info: 'Información de octubre 2020' },
    { fecha: new Date('2020-11-01'), info: 'Información de noviembre 2020' },
    { fecha: new Date('2020-12-01'), info: 'Información de diciembre 2020' },
    { fecha: new Date('2021-1-01'), info: 'Información de enero 2021' },
    { fecha: new Date('2021-2-01'), info: 'Información de febrero 2021' },
    { fecha: new Date('2021-3-01'), info: 'Información de marzo 2021' },
    { fecha: new Date('2021-4-01'), info: 'Información de abril 2021' },
    { fecha: new Date('2021-5-01'), info: 'Información de mayo 2021' },
    { fecha: new Date('2021-6-01'), info: 'Información de junio 2021' },
    { fecha: new Date('2021-7-01'), info: 'Información de julio 2021' },
    { fecha: new Date('2021-8-01'), info: 'Información de agosto 2021' },
    { fecha: new Date('2021-9-01'), info: 'Información de septiembre 2021' },
    { fecha: new Date('2021-10-01'), info: 'Información de octubre 2021' },
    { fecha: new Date('2021-11-01'), info: 'Información de noviembre 2021' },
    { fecha: new Date('2021-12-01'), info: 'Información de diciembre 2021' },
    { fecha: new Date('2022-1-01'), info: 'Información de enero 2022' },
    { fecha: new Date('2022-2-01'), info: 'Información de febrero 2022' },
    { fecha: new Date('2022-3-01'), info: 'Información de marzo 2022' },
    { fecha: new Date('2022-4-01'), info: 'Información de abril 2022' },
    { fecha: new Date('2022-5-01'), info: 'Información de mayo 2022' },
    { fecha: new Date('2022-6-01'), info: 'Información de junio 2022' },
    { fecha: new Date('2022-7-01'), info: 'Información de julio 2022' },
    { fecha: new Date('2022-8-01'), info: 'Información de agosto 2022' },
    { fecha: new Date('2022-9-01'), info: 'Información de septiembre 2022' },
    { fecha: new Date('2022-10-01'), info: 'Información de octubre 2022' },
    { fecha: new Date('2022-11-01'), info: 'Información de noviembre 2022' },
    { fecha: new Date('2022-12-01'), info: 'Información de diciembre 2022' },
    { fecha: new Date('2023-1-01'), info: 'Información de enero 2023' },
    { fecha: new Date('2023-2-01'), info: 'Información de febrero 2023' },
    { fecha: new Date('2023-3-01'), info: 'Información de marzo 2023' },
    { fecha: new Date('2023-4-01'), info: 'Información de abril 2023' },
    { fecha: new Date('2023-5-01'), info: 'Información de mayo 2023' },
    { fecha: new Date('2023-6-01'), info: 'Información de junio 2023' },
    { fecha: new Date('2023-7-01'), info: 'Información de julio 2023' },
    { fecha: new Date('2023-8-01'), info: 'Información de agosto 2023' },
    { fecha: new Date('2023-9-01'), info: 'Información de septiembre 2023' },
    { fecha: new Date('2023-10-01'), info: 'Información de octubre 2023' },
    { fecha: new Date('2023-11-01'), info: 'Información de noviembre 2023' },
    { fecha: new Date('2023-12-01'), info: 'Información de diciembre 2023' },
  ];

  public listaFiltrada: any[] = [];

  anioSeleccionado: any = 'Selecciona un año';
  mesSeleccionado: any = 'Selecciona un mes'; 
 

//Encabezado
  cedula: any = ' - ';
  nombre: any ;
  data: any = ' - ';
  apellido: any ;
  cargo: any = ' - ';
  inicioContrato: any = ' - ';
  anio!: any;
  mes!: any;
  fechaSeleccionada!: any;
  fechaFormateada!: any;

//Encabezado 2
  sueldo_base: any = ' - ';
  dias_trabajados:any;
  numero_horas_extraordinarias: any = ' - ';
  numero_horas_complementarias: any = ' - ';
  numero_recargo_nocturno: any = ' - ';
  dias_vacacion_tomados: any = ' - ';
  dias_enfermedad: any = ' - ';

//Ids
  id_rol_pagos!: any;
  id_personal!: any;
//Body
  anticipo_sueldo: any = 0.0;
  sueldo_nominal: any = ' - ';
  tiempo_parcial: any = ' - ';
  sueldo_vacaciones : any = ' - ';
  dias_paternidad : any = ' - ';
  permiso_paternidad : any = ' - ';
  dia_subsidio_maternidad : any = ' - ';
  subsidio_maternidad : any = ' - ';
  subsidio_enfermedad : any = ' - ';
  numero_horas_suplementarias : any = ' - ';
  valor_horas_suplementarias : any = ' - ';
  valor_horas_extraordinarias : any = ' - ';
  comisiones : any = ' - ';
  comisiones_mes_anterior : any = ' - ';
  incentivo_upsell : any = ' - ';
  movilizacion : any = ' - ';
  incentivo_dolarazo : any = ' - ';
  incentivo_alta_gama : any = ' - ';
  bono_pospago_ruc : any = ' - ';
  bono_plan_celular : any = ' - ';
  base_iess : any = ' - ';
  alimentacion : any = ' - ';
  decimo_tercero_mensual : any = ' - ';
  decimo_cuarta_mensual : any = ' - ';
  fondo_reserva_mensual : any = ' - ';
  total_ingresos : any = ' - ';
  aporte_iess : any = ' - ';
  chargeback_aplicar : any = ' - ';
  impuesto_renta : any = ' - ';
  prestamo_hipotecario : any = ' - ';
  prestamo_quirografario : any = ' - ';
  prestamo_empresa : any = ' - ';
  extension_conyugue : any = ' - ';
  sobregiro : any = ' - ';
  anticipo_comisiones_mes_anterior : any = ' - ';
  seguro_movil : any = ' - ';
  copago_seguro : any = ' - ';
  total_egresos : any = ' - ';
  neto_recibir : any = ' - ';
  provision_decimo_tercer_sueldo : any = ' - ';
  provision_decimo_cuarto_sueldo : any = ' - ';
  provision_fondos_reserva : any = ' - ';
  dias_vacaciones_tomados : any = ' - ';
  provision_vacaciones : any = ' - ';
  provision_aporte_iess_patronal : any = ' - ';
  ccc : any = ' - ';
  reverso_vacaciones_tomadas : any = ' - ';
  fecha_rol_pago!: any;


//User-Pass
  user!:String;
  passw!:String;

//
name!: string;
file!: File;
selectedFile!: any;

//validar segun uruario boton carga
rolPagoflag!:Boolean


  constructor(
    private crudService:CrudService
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
   }
    
   consultaRolpagos(){

    this.crudService.ObtenerDatosRolPagos(this.user,this.passw,this.anio, this.mes).subscribe(respuesta => {
      console.log("respuesta rol Pagos:" , respuesta);
      this.setDataRolpagos();
      if (respuesta == null) {
        window.confirm('No existe Datos en el fecha: '+ this.fechaFormateada);

      }else{
      this.anticipo_sueldo = ' - '
      this.nombre = respuesta['nombre'];
      this.cedula = respuesta.cedula;
      this.apellido = respuesta.apellido;
      this.inicioContrato = respuesta.fecha_inicio_contrato;
      this.cargo = respuesta.nombre_cargo;
      this.sueldo_base = respuesta.sueldo_base.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.numero_horas_extraordinarias = respuesta.numero_horas_extraordinarias;
      this.numero_horas_complementarias = respuesta.numero_horas_suplementarias;
      this.dias_vacacion_tomados = respuesta.dias_vacaciones_tomados;
      this.dias_enfermedad = respuesta.dias_enfermedad;
      this.dias_trabajados = respuesta.dias_trabajados;
      this.sueldo_nominal = respuesta.sueldo_nominal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.tiempo_parcial = respuesta.tiempo_parcial.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.sueldo_vacaciones = respuesta.sueldo_vacaciones.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.dias_paternidad = respuesta.dias_paternidad;
      this.permiso_paternidad = respuesta.permiso_paternidad.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.dia_subsidio_maternidad = respuesta.dias_subsidio_maternidad.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.subsidio_maternidad = respuesta.subsidio_maternidad.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.subsidio_enfermedad = respuesta.subsidio_enfermedad.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.numero_horas_suplementarias = respuesta.numero_horas_suplementarias.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.valor_horas_suplementarias = respuesta.valor_horas_suplementarias.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.valor_horas_extraordinarias = respuesta.valor_horas_extraordinarias.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.comisiones = respuesta.comisiones.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.comisiones_mes_anterior = respuesta.comisiones_mes_anterior.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.incentivo_upsell = respuesta.incentivo_upsell.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.movilizacion = respuesta.movilizacion.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.incentivo_dolarazo = respuesta.incentivo_dolarazo.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.incentivo_alta_gama = respuesta.incentivo_alta_gama.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.bono_pospago_ruc = respuesta.bono_pospago_ruc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.bono_plan_celular = respuesta.bono_plan_celular.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.base_iess = respuesta.base_iess.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.alimentacion = respuesta.alimentacion.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.decimo_tercero_mensual = respuesta.decimo_tercero_mensual.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.decimo_cuarta_mensual = respuesta.decimo_cuarta_mensual.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.fondo_reserva_mensual = respuesta.fondo_reserva_mensual.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.total_ingresos = respuesta.total_ingresos.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.aporte_iess = respuesta.aporte_iess.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }); 
      this.chargeback_aplicar = respuesta.chargeback_aplicar.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.impuesto_renta = respuesta.impuesto_renta.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.prestamo_hipotecario = respuesta.prestamo_hipotecario_iess.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.prestamo_quirografario = respuesta.prestamo_quirografario.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.prestamo_empresa = respuesta.prestamo_empresa.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.extension_conyugue = respuesta.extension_conyugue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.sobregiro = respuesta.sobregiro.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.anticipo_comisiones_mes_anterior = respuesta.anticipo_comisiones_mes_anterior.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.seguro_movil = respuesta.seguro_movil.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.copago_seguro = respuesta.copago_seguro.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.total_egresos = respuesta.total_egresos.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.neto_recibir = respuesta.neto_recibir.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.provision_decimo_tercer_sueldo = respuesta.provision_decimo_tercer_sueldo.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.provision_decimo_cuarto_sueldo = respuesta.provision_decimo_cuarto_sueldo.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.provision_fondos_reserva = respuesta.provision_fondos_reserva.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.dias_vacaciones_tomados = respuesta.dias_vacaciones_tomados;
      this.provision_vacaciones = respuesta.provision_vacaciones.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.provision_aporte_iess_patronal = respuesta.provision_aporte_iess_patronal.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.ccc = respuesta.ccc.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.reverso_vacaciones_tomadas = respuesta.reverso_vacaciones_tomadas.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      this.fecha_rol_pago = respuesta.fecha_rol_pago;
    }
   })
       
   }

   ngOnInit(): void {
    this.ValidarRolPagos();
   }

   generatePDF() {
    this.data = document.getElementById('html-a-exportar');
    html2canvas(this.data).then(canvas => {
      const imgWidth = 210; // Ancho de la página en mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('rol_Pagos_'+this.nombre+'_'+this.apellido+'.pdf');
    });
  }

  cambioMes(){
    this.mes = this.mesSeleccionado;
    if (this.anio == null) {
      console.log('Anio Vacio')
    } else {
      this.filtrarInformacion(this.anio, this.mes);
      this.consultaRolpagos();
      this.transformaFecha();
      console.log(this.anio,this.mes)
    }
  }

  cambioAnio(){
    this.anio = this.anioSeleccionado;
    if (this.mes == null) {
      console.log('Mes Vacio')
    } else {
      this.filtrarInformacion(this.anio, this.mes);
      this.consultaRolpagos();
      this.transformaFecha()
      console.log(this.anio,this.mes)
    }
  }

  filtrarInformacion(anioSeleccionado: number, mesSeleccionado: number): void {
    // Crear objeto Date con el año y mes seleccionados
    this.fechaSeleccionada = new Date(anioSeleccionado, mesSeleccionado - 1, 1);
    
    // Filtrar la lista completa de objetos por la fecha seleccionada
    this.listaFiltrada = this.listaCompleta.filter(item => 
      item.fecha.getFullYear() == this.fechaSeleccionada.getFullYear() &&
      item.fecha.getMonth() == this.fechaSeleccionada.getMonth()
    );

  }

  setDataRolpagos(){
      this.anticipo_sueldo = ' - ';
      this.cedula = ' - ';
      this.inicioContrato = ' - ';
      this.cargo = ' - ';
      this.sueldo_base = ' - ';
      this.numero_horas_extraordinarias = ' - ';
      this.numero_horas_complementarias = ' - ';
      this.dias_vacacion_tomados = ' - ';
      this.dias_enfermedad = ' - ';
      this.dias_trabajados = ' - ';
      this.sueldo_nominal = ' - ';
      this.tiempo_parcial = ' - ';
      this.sueldo_vacaciones = ' - ';
      this.dias_paternidad =' - ';
      this.permiso_paternidad = ' - ';
      this.dia_subsidio_maternidad = ' - ';
      this.subsidio_maternidad = ' - ';
      this.subsidio_enfermedad = ' - ';
      this.numero_horas_suplementarias = ' - ';
      this.valor_horas_suplementarias = ' - ';
      this.valor_horas_extraordinarias = ' - ';
      this.comisiones = ' - ';
      this.comisiones_mes_anterior = ' - ';
      this.incentivo_upsell = ' - ';
      this.movilizacion = ' - ';
      this.incentivo_dolarazo = ' - ';
      this.incentivo_alta_gama = ' - ';
      this.bono_pospago_ruc = ' - ';
      this.bono_plan_celular = ' - ';
      this.base_iess = ' - ';
      this.alimentacion = ' - ';
      this.decimo_tercero_mensual = ' - ';
      this.decimo_cuarta_mensual = ' - ';
      this.fondo_reserva_mensual = ' - ';
      this.total_ingresos = ' - ';
      this.aporte_iess = ' - ';
      this.chargeback_aplicar = ' - ';
      this.impuesto_renta = ' - ';
      this.prestamo_hipotecario = ' - ';
      this.prestamo_quirografario = ' - ';
      this.prestamo_empresa = ' - ';
      this.extension_conyugue = ' - ';
      this.sobregiro = ' - ';
      this.anticipo_comisiones_mes_anterior = ' - ';
      this.seguro_movil = ' - ';
      this.copago_seguro = ' - ';
      this.total_egresos = ' - ';
      this.neto_recibir = ' - ';
      this.provision_decimo_tercer_sueldo = ' - ';
      this.provision_decimo_cuarto_sueldo = ' - ';
      this.provision_fondos_reserva = ' - ';
      this.dias_vacaciones_tomados = ' - ';
      this.provision_vacaciones = ' - ';
      this.provision_aporte_iess_patronal = ' - ';
      this.ccc = ' - ';
      this.reverso_vacaciones_tomadas = ' - ';
      this.fecha_rol_pago = ' - ';
  }

  transformaFecha(){
   // Obtener el nombre del mes en español
   const mesesEnEspañol = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
   const nombreMesEnEspañol = this.fechaSeleccionada.toLocaleString("es-ES", { month: "long" });
 
   // Crear el texto con el nombre del mes y el año
   const textoFecha = `${nombreMesEnEspañol} ${this.fechaSeleccionada.getFullYear()}`;
 
   // Asignar el texto a las variables correspondientes
  this.fechaFormateada = textoFecha.toUpperCase();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log("\nSelectedFile:", this.selectedFile)
  }

  cargarDatos(){
    this.crudService.uploadExcel(this.selectedFile).then(data =>{
      console.log('Data:', data);
      window.confirm('Se cargo su excel correctamente');0
      }).catch(error => {
        console.error('Error:', error);
        window.confirm('Hubo un error al subir el excel')
      });
  }

 ValidarRolPagos(){
      if (localStorage.getItem('ROLE') as string == 'ROLE_ADMIN' ){
        this.rolPagoflag=true;
      }else{
        this.rolPagoflag=false;
      }
    }
 }

 

