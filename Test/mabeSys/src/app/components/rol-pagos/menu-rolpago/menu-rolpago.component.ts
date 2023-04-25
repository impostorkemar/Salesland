import { Component } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RolPagos } from '../../classModels/RolPagos';

@Component({
  selector: 'app-menu-rolpago',
  templateUrl: './menu-rolpago.component.html',
  styleUrls: ['./menu-rolpago.component.css']
})
export class MenuRolpagoComponent {

  public listaCompleta: any[] = [
    { fecha: new Date('2021-01-01'), info: 'Información de enero 2021' },
    { fecha: new Date('2021-02-01'), info: 'Información de febrero 2021' },
    { fecha: new Date('2021-03-01'), info: 'Información de marzo 2021' },
    { fecha: new Date('2021-04-01'), info: 'Información de abril 2021' },
    { fecha: new Date('2021-05-01'), info: 'Información de mayo 2021' },
    { fecha: new Date('2021-06-01'), info: 'Información de junio 2021' },
    { fecha: new Date('2021-07-01'), info: 'Información de julio 2021' },
    { fecha: new Date('2021-08-01'), info: 'Información de agosto 2021' },
    { fecha: new Date('2021-09-01'), info: 'Información de septiembre 2021' },
    { fecha: new Date('2021-10-01'), info: 'Información de octubre 2021' },
    { fecha: new Date('2021-11-01'), info: 'Información de noviembre 2021' },
    { fecha: new Date('2021-12-01'), info: 'Información de diciembre 2021' },
    { fecha: new Date('2023-01-01'), info: 'Información de enero 2023' },
    { fecha: new Date('2022-01-01'), info: 'Información de enero 2022' },
    { fecha: new Date('2022-02-01'), info: 'Información de febrero 2022' },
    { fecha: new Date('2022-03-01'), info: 'Información de marzo 2022' },
    { fecha: new Date('2022-04-01'), info: 'Información de abril 2022' },
    { fecha: new Date('2022-05-01'), info: 'Información de mayo 2022' },
    { fecha: new Date('2022-06-01'), info: 'Información de junio 2022' },
    { fecha: new Date('2022-07-01'), info: 'Información de julio 2022' },
    { fecha: new Date('2022-08-01'), info: 'Información de agosto 2022' },
    { fecha: new Date('2022-09-01'), info: 'Información de septiembre 2022' },
    { fecha: new Date('2022-10-01'), info: 'Información de octubre 2022' },
    { fecha: new Date('2022-11-01'), info: 'Información de noviembre 2022' },
    { fecha: new Date('2022-12-01'), info: 'Información de diciembre 2022' },
    { fecha: new Date('2023-01-01'), info: 'Información de enero 2023' },
    { fecha: new Date('2023-02-01'), info: 'Información de febrero 2023' },
    { fecha: new Date('2023-03-01'), info: 'Información de marzo 2023' },
    { fecha: new Date('2023-04-01'), info: 'Información de abril 2023' },
    { fecha: new Date('2023-05-01'), info: 'Información de mayo 2023' },
    { fecha: new Date('2023-06-01'), info: 'Información de junio 2023' },
    { fecha: new Date('2023-07-01'), info: 'Información de julio 2023' },
    { fecha: new Date('2023-08-01'), info: 'Información de agosto 2023' },
    { fecha: new Date('2023-09-01'), info: 'Información de septiembre 2023' },
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
  apellido: any = ' - ';
  cargo: any = ' - ';
  inicioContrato: any = ' - ';
  anio: any;
  mes: any;
  mes_validador: any;
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
  sueldo_nominal!: any;
  tiempo_parcial!: any;
  sueldo_vacaciones!: any;
  dias_paternidad!: any;
  permiso_paternidad!: any;
  dia_subsidio_maternidad!: any;
  subsidio_maternidad!: any;
  subsidio_enfermedad!: any;
  numero_horas_suplementarias!: any;
  valor_horas_suplementarias!: any;
  valor_horas_extraordinarias!: any;
  comisiones!: any;
  comisiones_mes_anterior!: any;
  incentivo_upsell!: any;
  movilizacion!: any;
  incentivo_dolarazo!: any;
  incentivo_alta_gama!: any;
  bono_pospago_ruc!: any;
  bono_plan_celular!: any;
  base_iess!: any;
  alimentacion!: any;
  decimo_tercero_mensual!: any;
  decimo_cuarta_mensual!: any;
  fondo_reserva_mensual!: any;
  total_ingresos!: any;
  aporte_iess!: any;
  chargeback_aplicar!: any;
  impuesto_renta!: any;
  prestamo_hipotecario!: any;
  prestamo_quirografario!: any;
  prestamo_empresa!: any;
  extension_conyugue!: any;
  sobregiro!: any;
  anticipo_comisiones_mes_anterior!: any;
  seguro_movil!: any;
  copago_seguro!: any;
  total_egresos!: any;
  neto_recibir!: any;
  provision_decimo_tercer_sueldo!: any;
  provision_decimo_cuarto_sueldo!: any;
  provision_fondos_reserva!: any;
  dias_vacaciones_tomados!: any;
  provision_vacaciones!: any;
  provision_aporte_iess_patronal!: any;
  ccc!: any;
  reverso_vacaciones_tomadas!: any;
  fecha_rol_pago!: any;
  fechaDate: any;
  fechaUTC: any;
  fechaLocal: any;

//User-Pass
  user!:String;
  passw!:String;

  constructor(
    private crudService:CrudService
  ) {
    this.user = localStorage.getItem('USER') as string;
    this.passw = localStorage.getItem('PASS') as string;
    
   }
   
   ngOnInit(): void {
    this.crudService.ObtenerDatosRolPagos(this.user,this.passw).subscribe(respuesta => {
      console.log(respuesta);
      this.nombre = respuesta.nombre;
      this.cedula = respuesta.cedula;
      this.apellido = respuesta.apellido;
      this.inicioContrato = respuesta.fecha_inicio_contrato;
      this.cargo = respuesta.nombre_cargo;
      this.sueldo_base = respuesta.sueldo_base;
      this.numero_horas_extraordinarias = respuesta.numero_horas_extraordinarias;
      this.numero_horas_complementarias = respuesta.numero_horas_suplementarias;
      this.dias_vacacion_tomados = respuesta.dias_vacaciones_tomados;
      this.dias_enfermedad = respuesta.dias_enfermedad;
      this.dias_trabajados = respuesta.dias_trabajados;
      this.sueldo_nominal = respuesta.
      this.tiempo_parcial = respuesta.
      this.sueldo_vacaciones = respuesta.
      this.dias_paternidad = respuesta.
      this.permiso_paternidad = respuesta.
      this.dia_subsidio_maternidad = respuesta.
      this.subsidio_maternidad = respuesta.
      this.subsidio_enfermedad = respuesta.
      this.numero_horas_suplementarias = respuesta.
      this.valor_horas_suplementarias = respuesta.
      this.valor_horas_extraordinarias = respuesta.
      this.comisiones = respuesta.
      this.comisiones_mes_anterior = respuesta.
      this.incentivo_upsell = respuesta.
      this.movilizacion = respuesta.
      this.incentivo_dolarazo = respuesta.
      this.incentivo_alta_gama = respuesta.
      this.bono_pospago_ruc = respuesta.
      this.bono_plan_celular = respuesta.
      this.base_iess = respuesta.
      this.alimentacion = respuesta.
      this.decimo_tercero_mensual = respuesta.
      this.decimo_cuarta_mensual = respuesta.
      this.fondo_reserva_mensual = respuesta.
      this.total_ingresos = respuesta.
      this.aporte_iess = respuesta.
      this.chargeback_aplicar = respuesta.
      this.impuesto_renta = respuesta.
      this.prestamo_hipotecario = respuesta.
      this.prestamo_quirografario = respuesta.
      this.prestamo_empresa = respuesta.
      this.extension_conyugue = respuesta.
      this.sobregiro = respuesta.
      this.anticipo_comisiones_mes_anterior = respuesta.
      this.seguro_movil = respuesta.
      this.copago_seguro = respuesta.
      this.total_egresos = respuesta.
      this.neto_recibir = respuesta.
      this.provision_decimo_tercer_sueldo = respuesta.
      this.provision_decimo_cuarto_sueldo = respuesta.
      this.provision_fondos_reserva = respuesta.
      this.dias_vacaciones_tomados = respuesta.
      this.provision_vacaciones = respuesta.
      this.provision_aporte_iess_patronal = respuesta.
      this.ccc = respuesta.
      this.reverso_vacaciones_tomadas = respuesta.
      this.fecha_rol_pago = respuesta.fecha_rol_pago;
      
       })
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

  filtrarInformacion(anioSeleccionado: number, mesSeleccionado: number): void {
    // Crear objeto Date con el año y mes seleccionados
    const fechaSeleccionada = new Date(anioSeleccionado, mesSeleccionado - 1, 1);
    
    // Filtrar la lista completa de objetos por la fecha seleccionada
    this.listaFiltrada = this.listaCompleta.filter(item => 
      item.fecha.getFullYear() == fechaSeleccionada.getFullYear() &&
      item.fecha.getMonth() == fechaSeleccionada.getMonth()
    );
   // Obtener el nombre del mes en español
   const mesesEnEspañol = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
   const nombreMesEnEspañol = fechaSeleccionada.toLocaleString("es-ES", { month: "long" });
 
   // Crear el texto con el nombre del mes y el año
   const textoFecha = `${nombreMesEnEspañol} ${fechaSeleccionada.getFullYear()}`;
 
   // Asignar el texto a las variables correspondientes
   this.mes = textoFecha.toUpperCase();
  }
  
}