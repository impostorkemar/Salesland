import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Usuario } from '../components/classModels/Usuario';
import { Candidato } from '../components/classModels/Candidato';
import { CentroCosto } from '../components/classModels/CentroCosto';
import { Cargo } from '../components/classModels/Cargo';
import { Contrato } from '../components/classModels/Contrato';
import { ExperienciaLaboral } from '../components/classModels/ExperienciaLaboral';
import { Personal } from '../components/classModels/Personal';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpPostService } from './HttpPostService';	
import { Vacaciones } from '../components/classModels/Vacaciones';
import { TestuserService } from 'src/app/services/testuser.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSort, Sort} from '@angular/material/sort';
import * as JSZip from 'jszip';
import { Viaje } from '../components/classModels/Viaje';
import { Comprobante } from '../components/classModels/Comprobante';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { Detalle_comprobante } from '../components/classModels/DetalleComprobante';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
API = environment.api1Url;

resp!:String[];

  constructor(
    private clienteHttp:HttpClient,
    ) { this.resp = []}

  private createRequestOptions() {
    let headers = new HttpHeaders({
        "accept": "application/json",
        "Content-Type": "application/json"        
    });
    return headers;
  }
   //RESPONSE
  setRespen(response: any, name:string) {
    this.resp = response;
    localStorage.setItem(name, JSON.stringify(response));
    console.log(name,":",localStorage.getItem(name));
    }
  getRespen(name:string) {
    return JSON.parse(localStorage.getItem(name) as string);
  }
  //ACCIONES
  postData(data: any, route: string): Observable<any> {
    let options = this.createRequestOptions();
    return this.clienteHttp.post(this.API + route, data);
  }
  
  putData(data: any, route: string): Observable<any> {
    let options = this.createRequestOptions();
    return this.clienteHttp.put(this.API + route, data);
  }
  //SERVICIOS USUARIO
  AgregarUsuario(datosUsuario:Usuario): Observable<any>{   
    //console.log("USER",datosUsuario);
    var urlAPI="usuarios/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(datosUsuario,urlAPI)
  }

  ObtenerUsuarios(){
    var urlAPI="usuarios/";
    return this.clienteHttp.get(this.API +urlAPI);
  }

  BorrarUsuario(id:any,Usuarios:any,iControl:any) {
    var urlAPI="usuarios/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        Usuarios.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerUsuario(id:any):Observable<any>{
    var urlAPI="usuarios/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarUsuario(id:any, datosUsuario:Usuario){
    let options = this.createRequestOptions();
    var urlAPI="usuarios/"+id;
    this.putData(datosUsuario,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }
  //SERVICIOS CANDIDATOS
  ObtenerCandidatos():Observable<any>{
    var urlAPI="candidatos/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  AgregarCandidato(datosCandidato:Candidato): Observable<any>{   
    //console.log("USER",datosUsuario);
    var urlAPI="candidatos/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(datosCandidato,urlAPI)
  }
  BorrarCandidato(id:any,Candidatos:any,iControl:any) {
    var urlAPI="candidatos/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        Candidatos.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerCandidato(id:any):Observable<any>{
    var urlAPI="candidatos/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarCandidato(id:any, datosCandidato:Candidato){
    let options = this.createRequestOptions();
    var urlAPI="candidatos/"+id;
    this.putData(datosCandidato,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }
 
  //SERVICIOS CENTROS DE COSTO
  ObtenerCentrosCostos():Observable<any>{
    var urlAPI="centro_costos/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  AgregarCentroCosto(datosCentroCosto:CentroCosto): Observable<any>{   
    //console.log("USER",datosUsuario);
    var urlAPI="centro_costos/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(datosCentroCosto,urlAPI)
  }
  BorrarCentroCosto(id:any,CentroCostos:any,iControl:any) {
    var urlAPI="centro_costos/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        CentroCostos.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerCentroCosto(id:any):Observable<any>{
    var urlAPI="centro_costos/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarCentroCosto(id:any, datosCentroCosto:CentroCosto){
    let options = this.createRequestOptions();
    var urlAPI="centro_costos/"+id;
    this.putData(datosCentroCosto,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }

  //SERVICIOS CARGOS
  ObtenerCargos(){
    var urlAPI="cargos/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  AgregarCargo(datosCargo:Cargo): Observable<any>{   
    //console.log("USER",datosUsuario);
    var urlAPI="cargos/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(datosCargo,urlAPI)
  }
  BorrarCargo(id:any,Cargos:any,iControl:any) {
    var urlAPI="cargos/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        Cargos.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerCargo(id:any):Observable<any>{
    var urlAPI="cargos/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarCargo(id:any, datosCargo:Cargo){
    let options = this.createRequestOptions();
    var urlAPI="cargos/"+id;
    this.putData(datosCargo,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }
  //SERVICIOS CONTRATOS
  ObtenerContratos(){
    var urlAPI="contratos/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  AgregarContrato(datosContrato:Contrato): Observable<any>{   
    //console.log("USER",datosUsuario);
    var urlAPI="contratos/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(datosContrato,urlAPI)
  }
  BorrarContrato(id:any,Contratos:any,iControl:any) {
    var urlAPI="contratos/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        Contratos.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerContrato(id:any):Observable<any>{
    var urlAPI="contratos/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarContrato(id:any, datosContrato:Cargo){
    let options = this.createRequestOptions();
    var urlAPI="contratos/"+id;
    this.putData(datosContrato,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }
  //SERVICIOS EXPERIENCIAS LABORALES
  ObtenerExperienciasLaborales(){
    var urlAPI="experiencia_laborales/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  AgregarExperienciaLaboral(datosExperienciaLaboral:ExperienciaLaboral): Observable<any>{   
    //console.log("USER",datosUsuario);
    var urlAPI="experiencia_laborales/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(datosExperienciaLaboral,urlAPI)
  }
  BorrarExperienciaLaboral(id:any,ExperienciasLaborales:any,iControl:any) {
    var urlAPI="experiencia_laborales/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        ExperienciasLaborales.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerExperienciaLaboral(id:any):Observable<any>{
    var urlAPI="experiencia_laborales/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarExperienciaLaboral(id:any, datosExperienciaLaboral:Cargo){
    let options = this.createRequestOptions();
    var urlAPI="experiencia_laborales/"+id;
    this.putData(datosExperienciaLaboral,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }
  //SERVICIOS PERSONAL
  ObtenerPersonales(){
    var urlAPI="personales/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  AgregarPersonal(datosPersonal:Personal): Observable<any>{   
    console.log("USER",datosPersonal);
    var urlAPI="personales/";
    console.log("URL=",this.API +urlAPI);
    return this.postData(datosPersonal,urlAPI)
  }
  BorrarPersonal(id:any,Personales:any,iControl:any) {
    var urlAPI="personales/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        Personales.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  }
  ObtenerPersonal(id:any):Observable<any>{
    var urlAPI="personales/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  ModificarPersonal(id:any, datosPersonal:Cargo){
    let options = this.createRequestOptions();
    var urlAPI="personales/"+id;
    this.putData(datosPersonal,urlAPI).subscribe();
    window.alert("Registro "+id+" actualizado")
  }

  ObtenerConsultas(){
    var urlAPI="personalesDeTiendas/";    
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerConsultasByParameter(i:number):Observable<any>{        
    var datos = ["id_personal","id_centro_costo","nombre_centro","cuenta","cedula","nombre","apellido","status","ciudad"];
    var urlAPI="personalesDeTiendasByParameter/";   
    var sql=this.API+urlAPI+datos[i]
    return this.clienteHttp.get(this.API+urlAPI+datos[i]);
  }

  ObtenerTablasBaseDatos(){
    var urlAPI="nombresTablas/";
    console.log("URI",this.API+urlAPI)
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerConsultaDinamica(){
    var urlAPI="nombresTablas/";
    console.log("URI",this.API+urlAPI)
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerFechaInicioContrato(id:any):Observable<any>{
    var urlAPI="fechaInicioContratoByCedula/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }

  AgregarVacaciones(id_personal: string, fecha_sol: string, fecha_inicio_vac: string, fecha_fin_vac: string,
     dias_lab_sol: number, dias_disp_acu:  number, saldo_dias_vac:  number, motivo: string):Observable<any>{    
    console.log("vaca_disp:",dias_disp_acu);
    console.log("saldo_dias:",saldo_dias_vac); 
    
    var urlAPI="vacation2/";
    var data; 
    data = {"id_personal":id_personal,"fecha_solicitud":fecha_sol ,"fecha_inicio_vacaciones":fecha_inicio_vac, 
    "fecha_fin_vacaciones":fecha_fin_vac,"fecha_respuesta":"", "dias_lab_solicitados":dias_lab_sol as number,
    "dias_disponibles_acum":dias_disp_acu as number,"saldo_dias_vacaciones":saldo_dias_vac as number,"status":"pendiente"
    ,"peticion":"aprobacion", "observaciones":"", "motivo": motivo as string}
    console.log("data:",data)
    return this.clienteHttp.post(this.API + urlAPI, data);
    
  }

  ObtenerCedulaByUser_Pass(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="cedByPassAndUSer/"+user as string+"-{pass}?passw="+pass as string;       
    return this.clienteHttp.get(this.API+urlAPI);                
  }  

  ObtenerMotivosVacaciones(param:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="motivosByParam/"+param as string;       
    return this.clienteHttp.get(this.API+urlAPI);                
  }  

  ObtenerMotivosViajes(param:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="motivosByParam/"+param as string;      
    return this.clienteHttp.get(this.API+urlAPI);                
  }  

  public ObtenerIDPersonal(user:any,pass:any):Observable<any>{
    var urlAPI="idpersonalByPassAndUSer/"+user as string+"-{pass}?passw="+pass as string;       
    return this.clienteHttp.get(this.API+urlAPI);
  }

  public ValidarIngresoSolicitudPendiente(user:any,pass:any):Observable<any>{
    var urlAPI="comprobarUnicaSolicitudPendiente/"+user as string+"_{pass}?passw="+pass as string;       
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenertotalVacacionesTomadas(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="totalVacacionesTomadas/"+user as string+"-{pass}?passw="+pass as string;       
    return this.clienteHttp.get(this.API+urlAPI);                
  }  

  ObtenertotalVacacionesTomadasPendientes(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="totalVacacionesTomadasPendientes/"+user as string+"-{pass}?passw="+pass as string;       
    return this.clienteHttp.get(this.API+urlAPI);                
  }  

  ObtenerVacacionesPersonal(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonal/";       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalPendientes():Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonalPendientes/";       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalAprobadas():Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonalAprobadas/";       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalNegadas():Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonalNegadas/";       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalBySupervisor(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonalBySupervisor/"+user as string+"-{pass}?passw="+pass as string;        
    return this.clienteHttp.get(this.API+urlAPI);                
  }

  ObtenerVacacionesPersonalPendientesBySupervisor(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonalPendientesBySupervisor/"+user as string+"-{pass}?passw="+pass as string;        
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalAprobadasBySupervisor(user:any,pass:any):Observable<any>{
    var urlAPI="vacacionesPersonalAprobadasBySupervisor/"+user as string+"-{pass}?passw="+pass as string; ;       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalAprobadasBySupervisorSort(user:any,pass:any, sort: Sort):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    const params = new HttpParams()
      .set('_sort',sort.active)
      .set('_order',sort.direction);
    var urlAPI="vacacionesPersonalAprobadasBySupervisor/"+user as string+"-{pass}?passw="+pass as string; ;       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesPersonalNegadasBySupervisor(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesPersonalNegadasBySupervisor/"+user as string+"-{pass}?passw="+pass as string; ;       
    return this.clienteHttp.get(this.API+urlAPI);                
  }

  ObtenerVacacionesByUserAndPass(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesByUserAndPass/"+user as string+"-{pass}?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesByUserAndPassPendientes(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesByUserAndPassPendientes/"+user as string+"-{pass}?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesByUserAndPassAprobadas(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesByUserAndPassAprobadas/"+user as string+"-{pass}?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerVacacionesByUserAndPassNegadas(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesByUserAndPassNegadas/"+user as string+"-{pass}?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  BorrarVacacion(id:any):Observable<any> {
    var urlAPI="vacaciones/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id)
    } else{
      return of(null);
    } 
  } 

  BorrarVacacionById(id:any) :Observable<any> {
    var urlAPI="vacaciones/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);  
    return this.clienteHttp.delete(this.API +urlAPI+id);               
  }

  ObtenerExistenciaVacaciones(user:any,pass:any, fecha:any):Observable<any>{
    console.log("user:",user,"pass:", pass,"fecha:", fecha);
    var urlAPI="comprobarVacacionesRegistradasByUserPassword/"+user as string+"_{pass}_"+fecha as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerTotalVacacionesAprobadas(user:any,pass:any, fecha:any):Observable<any>{
    console.log("user:",user,"pass:", pass,"fecha:", fecha);
    var urlAPI="vacacionesDiasAprobadosByUserPassword/"+user as string+"_{pass}_"+fecha as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObteneVacacionesAReasignarByUserPassword(user:any,pass:any,fecha:any):Observable<any>{
    console.log("user:",user,"pass:", pass,"fecha:",fecha);
    var urlAPI="vacacionesAReasignarByUserPassword/"+user as string+"_{pass}_"+fecha as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObteneVacacionesFechaInicioAndFin(idVacacion:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesFechaInicioAndFin/"+idVacacion;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerExistenciaVacacionesByInicioFin(user:any,pass:any, fecha1:any, fecha2:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="comprobarVacacionesRegistradasByUserPasswordFechas/"+user as string+"_{pass}_"+fecha1 as string+"_"+fecha2 as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObteneVacacionesAReasignarByUserPasswordFechas(user:any,pass:any,fecha1:any, fecha2: any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesAReasignarByUserPasswordFechas/"+user as string+"_{pass}_"+fecha1 as string+"_"+fecha2 as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObteneVacacionesAReasignarByUserPasswordFechasInfo(user:any,pass:any,fecha1:any, fecha2: any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="vacacionesAReasignarByUserPasswordFechasInfo/"+user as string+"_{pass}_"+fecha1 as string+"_"+fecha2 as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerVacacionById(idVacacion:any):Observable<any>{
    var urlAPI="vacacionesById/"+idVacacion;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ModificarSolicitudVacacionACancelar(id:any,observaciones:any, VacacionesPen:any,VacacionesApr:any,VacacionesNeg:any,iControl:any){
    let options = this.createRequestOptions();
    this.ObtenerVacacionById(id).subscribe(response0 => {
      //console.log(response0);
      if (response0['peticion'] === 'cancelacion'){
        window.confirm('Solicitud ya en petición de cancelación')        
      }else if (response0['peticion'] === 'aprobacion'){
        if(window.confirm("¿Desea solicitar la cancelación de la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])){
          let options = this.createRequestOptions();
          var urlAPI="vacacionesACancelarbyId/"+id;
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: response0['fecha_respuesta'],
            status: response0['status'],
            peticion: 'cancelacion',
            observaciones: observaciones as string,
            motivo: response0['motivo'],
          }
          //console.log("vaca: ",vaca);          
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            var user = localStorage.getItem('USER') as string;
            var passw = localStorage.getItem('PASS') as string;            
            this.ObtenerVacacionesByUserAndPassPendientes(user,passw).subscribe(respuesta=>{
              console.log("respuesta[iControl]:",respuesta[iControl]);
              VacacionesPen.splice(iControl,1);
              VacacionesPen.splice(iControl,0,respuesta[iControl]);             
            });
            this.EnviarCorreoNotificacionCancelacionPeticion(user,passw,id).subscribe(respuesta15=>{
              console.log("respuesta15:",respuesta15)
            })
            
          });
          //VacacionesPen.splice(iControl,1,VacacionesPen[iControl]);
         
          
        }
      }
           
    });

    }

  ModificarSolicitudVacacionAAprobar(id:any,observaciones:any, VacacionesPen:any,VacacionesApr:any,VacacionesNeg:any,iControl:any){
    let options = this.createRequestOptions();
    this.ObtenerVacacionById(id).subscribe(response0 => {
      if (response0['peticion'] === 'aprobacion'){
        if(window.confirm("¿Desea aprobar la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])){
          let options = this.createRequestOptions();
          var urlAPI="vacacionesACancelarbyId/"+id;
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: response0['fecha_respuesta'],
            status: 'aprobada',
            peticion: '',
            observaciones: observaciones as string,
            motivo: response0['motivo'],
          }
          console.log("vaca: ",vaca);
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            var user = localStorage.getItem('USER') as string;
            var passw = localStorage.getItem('PASS') as string;            
            this.ObtenerVacacionesByUserAndPassPendientes(user,passw).subscribe(respuesta=>{
              console.log("respuesta[iControl]:",respuesta[iControl]);
              VacacionesPen.splice(iControl,1);
            });
            
          });

        }
      }else if (response0['peticion'] === 'cancelacion'){
        if(window.confirm("¿Desea negar la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])){
          let options = this.createRequestOptions();
          var urlAPI="vacacionesACancelarbyId/"+id;
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: response0['fecha_respuesta'],
            status: 'negada',
            peticion: '',
            observaciones: observaciones as string,
            motivo: response0['motivo'],
          }
          console.log("vaca: ",vaca);
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            var user = localStorage.getItem('USER') as string;
            var passw = localStorage.getItem('PASS') as string;            
            this.ObtenerVacacionesByUserAndPassPendientes(user,passw).subscribe(respuesta=>{
              console.log("respuesta[iControl]:",respuesta[iControl]);
              VacacionesPen.splice(iControl,1);
            });
            
          });
        }
      }
    });
  }

  ObtenerNombreApellidoByIdVacacion(id:any):Observable<any>{
    var urlAPI="nombreApellidoPersonalByIdVacacion/"+id;      
    return this.clienteHttp.get(this.API+urlAPI);
  }
    

  AceptarSolicitudVacacion(id:any,observaciones:any, VacacionesPen:any,VacacionesApr:any,VacacionesNeg:any,iControl:any){
    var urlAPI="vacacionesAAprobarbyId/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDay()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()      
    this.ObtenerVacacionById(id).subscribe(response0 => {
      if (response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion' ){
        if(window.confirm("¿Desea aprobar la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] +"\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])+ "\n\tMOTIVO: "
        + response0['motivo']){
          let options = this.createRequestOptions();
          var urlAPI="vacacionesAAprobarbyId/"+id;
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: Fecha_respt as string,
            status: 'aprobada',
            peticion: response0['peticion'],
            observaciones: observaciones as string,
            motivo: response0['motivo']
          }
          console.log("vaca: ",vaca);           
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            //console.log("response0: ",response0)
            VacacionesPen.splice(iControl,1);                    
            this.ObtenerNombreApellidoByIdVacacion(vaca['id_vacaciones']).subscribe(respuesta=>{
              var vacaPers ={
                id_vacaciones: vaca['id_vacaciones'],
                nombre: respuesta['nombre'],
                apellido: respuesta['apellido'],
                fecha_solicitud:vaca['fecha_solicitud'],
                fecha_inicio_vacaciones: vaca['fecha_inicio_vacaciones'],
                fecha_fin_vacaciones: vaca['fecha_fin_vacaciones'],
                dias_lab_solicitados: vaca['dias_lab_solicitados'],
                dias_disponibles_acum: vaca['dias_disponibles_acum'],
                saldo_dias_vacaciones: vaca['saldo_dias_vacaciones'],
                fecha_respuesta: vaca['fecha_respuesta'],
                status: vaca['status'],
                peticion: vaca['peticion'],
                observaciones: vaca['observaciones'],
                motivo: vaca['motivo']
              }
              VacacionesApr.splice(iControl,0,vacaPers)
              
              //console.log("respuesta[iControl]:",respuesta[iControl])
            });
            this.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
              console.log("respuesta15:",respuesta15)
            })
          });   
        }
      }else if (response0['status'] === 'pendiente' && response0['peticion'] === 'cancelacion'){
        if(window.confirm("¿Desea aprobar la cancelación de la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])){
          let options = this.createRequestOptions();
          var urlAPI="negarVacacionById/"+id;
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: Fecha_respt as string,
            status: 'cancelada',
            peticion: response0['peticion'],
            observaciones: response0['observaciones']+'\tPeticion de cancelacion:\t'+observaciones as string,
            motivo: response0['motivo'],
          }
          //console.log("vaca: ",vaca);
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            //console.log("response0: ",response0)
            VacacionesPen.splice(iControl,1); 
            this.ObtenerNombreApellidoByIdVacacion(vaca['id_vacaciones']).subscribe(respuesta=>{
              //console.log(respuesta);
              var vacaPers ={
                id_vacaciones: vaca['id_vacaciones'],
                nombre: respuesta['nombre'],
                apellido: respuesta['apellido'],
                fecha_solicitud:vaca['fecha_solicitud'],
                fecha_inicio_vacaciones: vaca['fecha_inicio_vacaciones'],
                fecha_fin_vacaciones: vaca['fecha_fin_vacaciones'],
                dias_lab_solicitados: vaca['dias_lab_solicitados'],
                dias_disponibles_acum: vaca['dias_disponibles_acum'],
                saldo_dias_vacaciones: vaca['saldo_dias_vacaciones'],
                fecha_respuesta: vaca['fecha_respuesta'],
                status: vaca['status'],
                peticion: vaca['peticion'],
                observaciones: vaca['observaciones'],
                motivo: vaca['motivo']
              }
              VacacionesNeg.splice(iControl,0,vacaPers)   
              this.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
                console.log("respuesta15:",respuesta15)
              })            
            });
          });
        }
      }
    }); 
  }

  RechazarSolicitudVacacion(id:any,observaciones:any, VacacionesPen:any,VacacionesApr:any,VacacionesNeg:any,iControl:any){
    var urlAPI="negarVacacionById/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDay()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
    this.ObtenerVacacionById(id).subscribe(response0 => {
      if ( response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion'){
        if(window.confirm("¿Desea rechazar la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])){
          let options = this.createRequestOptions();
          var urlAPI="vacacionesACancelarbyId/"+id;
          console.log("Fecha_respt:",Fecha_respt)
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: Fecha_respt as string,
            status: 'negada',
            peticion: 'aprobacion',
            observaciones: observaciones as string,
            motivo: response0['motivo'],
          }
          console.log("vaca: ",vaca);
          //console.log("vaca: ",vaca);
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            //console.log("response0: ",response0)
            VacacionesPen.splice(iControl,1);                           
            this.ObtenerNombreApellidoByIdVacacion(vaca['id_vacaciones']).subscribe(respuesta=>{
              var vacaPers ={
                id_vacaciones: vaca['id_vacaciones'],
                nombre: respuesta['nombre'],
                apellido: respuesta['apellido'],
                fecha_solicitud:vaca['fecha_solicitud'],
                fecha_inicio_vacaciones: vaca['fecha_inicio_vacaciones'],
                fecha_fin_vacaciones: vaca['fecha_fin_vacaciones'],
                dias_lab_solicitados: vaca['dias_lab_solicitados'],
                dias_disponibles_acum: vaca['dias_disponibles_acum'],
                saldo_dias_vacaciones: vaca['saldo_dias_vacaciones'],
                fecha_respuesta: vaca['fecha_respuesta'],
                status: vaca['status'],
                peticion: vaca['peticion'],
                observaciones: vaca['observaciones'],
                motivo: vaca['motivo']
              }
              VacacionesNeg.splice(iControl,0,vacaPers) 
              //console.log("respuesta[iControl]:",respuesta[iControl])
              this.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
                console.log("respuesta15:",respuesta15)
              })
            });
          });
        }
      }else if ( response0['status'] === 'pendiente' && response0['peticion'] === 'cancelacion'){
        if(window.confirm("¿Desea aprobar la cancelación de la solicitud?\nID VACACIONES: "+
        response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
        + response0['dias_lab_solicitados'])){
          let options = this.createRequestOptions();
          var urlAPI="vacacionesACancelarbyId/"+id;
          var vaca: Vacaciones ={
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud:response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: Fecha_respt as string,
            status: 'pendiente',
            peticion: 'aprobacion',
            observaciones: "Preaprobado:\t"+observaciones as string,
            motivo: response0['motivo'],
          }
          console.log("vaca: ",vaca);
          //console.log("vaca: ",vaca);
          this.putData(vaca,urlAPI).subscribe(response0=>{ 
            //console.log("response0: ",response0)
            VacacionesPen.splice(iControl,1);
            this.ObtenerNombreApellidoByIdVacacion(vaca['id_vacaciones']).subscribe(respuesta=>{
              var vacaPers ={
                id_vacaciones: vaca['id_vacaciones'],
                nombre: respuesta['nombre'],
                apellido: respuesta['apellido'],
                fecha_solicitud:vaca['fecha_solicitud'],
                fecha_inicio_vacaciones: vaca['fecha_inicio_vacaciones'],
                fecha_fin_vacaciones: vaca['fecha_fin_vacaciones'],
                dias_lab_solicitados: vaca['dias_lab_solicitados'],
                dias_disponibles_acum: vaca['dias_disponibles_acum'],
                saldo_dias_vacaciones: vaca['saldo_dias_vacaciones'],
                fecha_respuesta: vaca['fecha_respuesta'],
                status: vaca['status'],
                peticion: vaca['peticion'],
                observaciones: vaca['observaciones'],
                motivo: vaca['motivo']
              }
              VacacionesPen.splice(iControl,0,vacaPers)
              //console.log("respuesta[iControl]:",respuesta[iControl])
              this.EnviarCorreoCambioEstadoSolicitud(id).subscribe(respuesta15=>{
                console.log("respuesta15:",respuesta15)
              })
            });  
          });
        }
      }
    }); 
  }

  EliminarSolicitudVacacion(id: any): Observable<any> {
    var urlAPI = "vacacionesAEliminaryId/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDay() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    return this.ObtenerVacacionById(id).pipe(
      switchMap(response0 => {
        if (window.confirm("¿Desea eliminar la solicitud?\nID VACACIONES: " +
          response0['id_vacaciones'] + "\n\tNOMBRE:" + response0['nombre'] + " " + response0['apellido'] + "\n\tFECHA SOLICITUD: " + response0['fecha_solicitud'] +
          "\n\tFECHA INICIO VACACIONES: " + response0['fecha_inicio_vacaciones'] + "\n\tFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'] + "\n\tDIAS SOLICITADOS: "
          + response0['dias_lab_solicitados'])) {
          let options = this.createRequestOptions();
          var urlAPI = "vacacionesAAprobarbyId/" + id;
          console.log("Fecha_respt:", Fecha_respt)
          var vaca: Vacaciones = {
            id_vacaciones: response0['id_vacaciones'],
            id_personal: response0['id_personal'],
            fecha_solicitud: response0['fecha_solicitud'],
            fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
            fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
            dias_lab_solicitados: response0['dias_lab_solicitados'],
            dias_disponibles_acum: response0['dias_disponibles_acum'],
            saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
            fecha_respuesta: Fecha_respt as string,
            status: 'eliminada',
            peticion: response0['peticion'],
            observaciones: response0['observaciones'],
            motivo: response0['motivo'],
          }
          console.log("vaca: ", vaca);
          return this.putData(vaca, urlAPI);
        } else {
          return of(null);
        }

      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  AceptarSolicitudVacacionBySupervisor(id: any): Observable<any> {
    var urlAPI = "vacacionesAAprobarbyId/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDay() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    return this.ObtenerVacacionById(id).pipe(
      switchMap(response0 => {
        if (response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion') {
          if (window.confirm("¿Desea aceptar la solicitud?\nID VACACIONES: " +
            response0['id_vacaciones'] + "\n\tNOMBRE:" + response0['nombre'] + " " + response0['apellido'] + "\n\tFECHA SOLICITUD: " + response0['fecha_solicitud'] +
            "\n\tFECHA INICIO VACACIONES: " + response0['fecha_inicio_vacaciones'] + "\n\tFECHA FIN VACACIONES: "
            + response0['fecha_fin_vacaciones'] + "\n\tDIAS SOLICITADOS: "
            + response0['dias_lab_solicitados'])) {
            let options = this.createRequestOptions();
            var urlAPI = "vacacionesAAprobarbyId/" + id;
            console.log("Fecha_respt:", Fecha_respt)
            var vaca: Vacaciones = {
              id_vacaciones: response0['id_vacaciones'],
              id_personal: response0['id_personal'],
              fecha_solicitud: response0['fecha_solicitud'],
              fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
              fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
              dias_lab_solicitados: response0['dias_lab_solicitados'],
              dias_disponibles_acum: response0['dias_disponibles_acum'],
              saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
              fecha_respuesta: Fecha_respt as string,
              status: 'aprobada',
              peticion: 'aprobacion',
              observaciones: '',
              motivo: response0['motivo'],
            }
            console.log("vaca: ", vaca);
            return this.putData(vaca, urlAPI);
          } else {
            return of(null);
          }
        } else {
          return of(null);
        }
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  RechazarSolicitudVacacionBySupervisor(id:any, observaciones: any): Observable<any>{
    var urlAPI="negarVacacionById/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDay()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
    return this.ObtenerVacacionById(id).pipe(
      switchMap(response0 =>{
        if ( response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion'){
          if(window.confirm("¿Desea rechazar la solicitud?\nID VACACIONES: "+
          response0['id_vacaciones']+"\n\tNOMBRE:"+response0['nombre']+" "+response0['apellido'] + "\n\tFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\n\tFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\n\tFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones']+ "\n\tDIAS SOLICITADOS: "
          + response0['dias_lab_solicitados'])){
            let options = this.createRequestOptions();
            var urlAPI="vacacionesACancelarbyId/"+id;
            console.log("Fecha_respt:",Fecha_respt)
            var vaca: Vacaciones ={
              id_vacaciones: response0['id_vacaciones'],
              id_personal: response0['id_personal'],
              fecha_solicitud:response0['fecha_solicitud'],
              fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
              fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
              dias_lab_solicitados: response0['dias_lab_solicitados'],
              dias_disponibles_acum: response0['dias_disponibles_acum'],
              saldo_dias_vacaciones: response0['saldo_dias_vacaciones'],
              fecha_respuesta: Fecha_respt as string,
              status: 'negada',
              peticion: 'aprobacion',
              observaciones: observaciones as string,
              motivo: response0['motivo'],
            }
            console.log("vaca: ",vaca);
            //console.log("vaca: ",vaca);
            return this.putData(vaca,urlAPI)
          } else{
            return of(null)
          }
        } else{
          return of(null)
        }
      }),        
      catchError(error => {
        return of(null);
      })
    )
  }

  EnviarCorreoNotificacionIngresoSolicitud(user:any,passw:any,id:any): Observable<any>{
    var consult = {"user":user, "passw":passw, "id":id}
    console.log("user:",consult.user,"passw:",consult.passw,"id:",consult.id)     
    var urlAPI="sendEmailIngresoSolicitud/?user="+(user) as string+"&passw="+(passw) as string+"&idvacacion="+(id) as string;
    return this.clienteHttp.post(this.API + urlAPI, consult);
  }

  EnviarCorreoNotificacionCancelacionPeticion(user:any,passw:any,id:any): Observable<any>{
    var consult = {"user":user, "passw":passw, "id":id}
    console.log(consult.user,consult.passw,consult.id)     
    var urlAPI="sendEmailSolicitudACancelacion/?user="+(user) as string+"&passw="+(passw) as string+"&idvacacion="+(id) as string;
    return this.clienteHttp.post(this.API + urlAPI, consult);
  }

  EnviarCorreoCambioEstadoSolicitud(id:any): Observable<any>{
    var consult2 = {"id":id}
    var urlAPI="sendEmailCambioEstadoSolicitud/"
    return this.clienteHttp.post(this.API + urlAPI, consult2);
  }

  ObtenerDataReporteEstadistico(corte: any, actual:any):Observable<any>{
    var urlAPI="dataReporteEstadistico/"+corte as string+"_"+actual as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerCentroCostoByUserAndPass(user:any, passw:any):Observable<any>{
    var urlAPI="centroCostoByUserPass/"+user as string+"_"+passw as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerIdSupervisorByuserAndPass(user:any, passw:any):Observable<any>{
    var urlAPI="idSupervisorByUserAndPass/"+user as string+"_"+passw as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerDataPersonaByUserAndPass(user:any, passw:any):Observable<any>{
    var urlAPI="dataPersonabyUserAndPass/"+user as string+"_"+passw as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObtenerDataHistoricaViajesPersonal(user:any, passw:any):Observable<any>{
    var urlAPI="dataHistoricaViajePersonabyUserAndPass/"+user as string+"_"+passw as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }
  
  ObtenerViajesPersonal(user:any,passw:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="dataHistoricaViajePersonal/";       
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  uploadFile(zip: JSZip, nombre: any): Promise<any> {
    return zip.generateAsync({ type: 'blob' }).then((blob: Blob) => {

      // Create a new FormData object
      const formData = new FormData();

      // Append the zip file to the FormData object
      //formData.append('zipFile', blob, nombre);
      formData.append('file', blob, nombre);

      // Send the FormData to the server using HttpClient or XMLHttpRequest
      // ...
      return this.clienteHttp.post(this.API + "uploadFile" as string, formData).toPromise();
    });         
  }  
  
  ObtenerDatosRolPagos(user:any,passw:any,anio:any,mes:any):Observable<any>{
    console.log(user,passw,anio,mes)
    var urlAPI="dataRolpago/"+user as string+"_"+passw as string + "_" + anio as string + "_" + mes as string; 
    return this.clienteHttp.get(this.API +urlAPI);
  }

  AgregarViaje(viaje : Viaje):Observable<any>{   
    console.log("viaje:\n",viaje);
    var urlAPI="viaje/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(viaje,urlAPI)
  }

  AgregarComprobante(comprobante : Comprobante):Observable<any>{   
    console.log("comprobante:",comprobante);
    var urlAPI="comprobante/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(comprobante,urlAPI)
  }

  AgregarDetalleComprobante(detalle_comprobante : Detalle_comprobante):Observable<any>{   
    //console.log("detalle_comprobante:",detalle_comprobante);
    var urlAPI="detalle_comprobante/";
    //console.log("URL=",this.API +urlAPI);
    return this.postData(detalle_comprobante,urlAPI)
  }

  downloadExcelFormatoReembolso():Observable<any> {
    var urlAPI="download-excel-FormatoReembolso/";      
    console.log(this.API +urlAPI)
    return this.clienteHttp.get<Blob>(this.API +urlAPI, {responseType: 'blob' as 'json'});      
  }

  ObtenerExistenciaViajesByInicioFin(user:any,pass:any, fecha1:any, fecha2:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="comprobarViajesRegistradasByUserPasswordFechas/"+user as string+"_{pass}_"+fecha1 as string+"_"+fecha2 as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObteneViajesAReasignarByUserPasswordFechas(user:any,pass:any,fecha1:any, fecha2: any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="viajesAReasignarByUserPasswordFechas/"+user as string+"_{pass}_"+fecha1 as string+"_"+fecha2 as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  uploadExcel(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log("API:",this.API)
    return this.clienteHttp.post<any>(this.API + "uploadExcel" as string, formData).toPromise();
  }

  EnviarCorreoCambioEstadoSolicitudViaje(id:any): Observable<any>{
    var consult2 = {"id":id}
    //console.log("consult2:\n",consult2)
    var urlAPI="sendEmailCambioEstadoSolicitudViaje/"
    return this.clienteHttp.post(this.API + urlAPI, consult2);
  }

  ObtenerViajeById(idViaje:any):Observable<any>{
    var urlAPI="viajesById/"+idViaje;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  AceptarSolicitudViaje(id: any): Observable<any> {
    var urlAPI = "viajesAAprobarbyId/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDay() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    return this.ObtenerViajeById(id).pipe(      
      switchMap(response0 => {
        //console.log("response0:",response0)
        if (response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion') {
          if (window.confirm("¿Desea aceptar la solicitud?\nID VIAJE: " +
            response0['id_viaje'] + "\n\tNOMBRE:" + response0['nombre'] + " " + response0['apellido'] + "\n\tFECHA REEMBOLSO: " + response0['fecha_reembolso'] +
            "\n\tFECHA INICIO: " + response0['fecha_viaje_inicio'] + "\n\tFECHA FIN: "
            + response0['fecha_viaje_fin'] + "\n\tDURACIÓN: "+ response0['duracion'] +
            "\n\tIMPORTE: "+ response0['importe'])) {
            let options = this.createRequestOptions();
            var urlAPI = "viajesAAprobarbyId/" + id;
            console.log("Fecha_respt:", Fecha_respt)
            var viaje: Viaje = {
              id_viaje: response0['id_viaje'],
              id_personal: response0['id_personal'],
              lugar: response0['lugar'],
              fecha_reembolso: response0['fecha_reembolso'],
              fecha_viaje_inicio: response0['fecha_viaje_inicio'],
              fecha_viaje_fin: response0['fecha_viaje_fin'],
              duracion: response0['duracion'],
              punto_partida: response0['punto_partida'],
              punto_destino: response0['punto_destino'],
              fecha_gasto: response0['fecha_gasto'],
              moneda: response0['moneda'],
              cantidad_comprobantes: response0['cantidad_comprobantes'],
              importe: response0['importe'],
              status: 'aprobada',
              peticion: response0['peticion'],
              motivo: response0['motivo'],
              fecha_respuesta: Fecha_respt as string,              
            }
            console.log("viaje: ", viaje);
            return this.putData(viaje, urlAPI);            
          } else {
            return of(null);
          }
        } else {
          return of(null);
        }
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  RechazarSolicitudViaje(id:any, motivo: any): Observable<any>{
    var urlAPI="negarViajeById/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDay()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
    return this.ObtenerViajeById(id).pipe(
      switchMap(response0 =>{
        //console.log("response0:",response
        if ( response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion'){
          if(window.confirm("¿Desea aceptar la solicitud?\nID VIAJE: " +
          response0['id_viaje'] + "\n\tNOMBRE:" + response0['nombre'] + " " + response0['apellido'] + "\n\tFECHA REEMBOLSO: " + response0['fecha_reembolso'] +
          "\n\tFECHA INICIO: " + response0['fecha_viaje_inicio'] + "\n\tFECHA FIN: "
          + response0['fecha_viaje_fin'] + "\n\tDURACIÓN: "+ response0['duracion'] +
          "\n\tIMPORTE: "+ response0['importe'])){
            let options = this.createRequestOptions();
            var urlAPI="negarViajeById/"+id;
            console.log("Fecha_respt:",Fecha_respt)
            var viaje: Viaje = {
              id_viaje: response0['id_viaje'],
              id_personal: response0['id_personal'],
              lugar: response0['lugar'],
              fecha_reembolso: response0['fecha_reembolso'],
              fecha_viaje_inicio: response0['fecha_viaje_inicio'],
              fecha_viaje_fin: response0['fecha_viaje_fin'],
              duracion: response0['duracion'],
              punto_partida: response0['punto_partida'],
              punto_destino: response0['punto_destino'],
              fecha_gasto: response0['fecha_gasto'],
              moneda: response0['moneda'],
              cantidad_comprobantes: response0['cantidad_comprobantes'],
              importe: response0['importe'],
              status: 'negada',
              peticion: response0['peticion'],
              motivo: motivo as string,
              fecha_respuesta: Fecha_respt as string,              
            }
            console.log("viaje: ", viaje);
            return this.putData(viaje,urlAPI)
          } else{
            return of(null)
          }
        } else{
          return of(null)
        }
      }),        
      catchError(error => {
        return of(null);
      })
    )
  }

  EliminarSolicitudViaje(id: any): Observable<any> {
    var urlAPI = "viajeAEliminaryId/";
    var myDate = new Date();
    var Fecha_respt = myDate.getFullYear() + "-" + myDate.getMonth() + "-" + myDate.getDay() + " " + myDate.getHours() + ":" + myDate.getMinutes() + ":" + myDate.getSeconds()
    return this.ObtenerViajeById(id).pipe(
      switchMap(response0 => {
        if (window.confirm("¿Desea aceptar la solicitud?\nID VIAJE: " +
        response0['id_viaje'] + "\n\tNOMBRE:" + response0['nombre'] + " " + response0['apellido'] + "\n\tFECHA REEMBOLSO: " + response0['fecha_reembolso'] +
        "\n\tFECHA INICIO: " + response0['fecha_viaje_inicio'] + "\n\tFECHA FIN: "
        + response0['fecha_viaje_fin'] + "\n\tDURACIÓN: "+ response0['duracion'] +
        "\n\tIMPORTE: "+ response0['importe'])) {
          let options = this.createRequestOptions();
          var urlAPI = "viajeAEliminaryId/" + id;
          console.log("Fecha_respt:", Fecha_respt)
          var viaje: Viaje = {
            id_viaje: response0['id_viaje'],
            id_personal: response0['id_personal'],
            lugar: response0['lugar'],
            fecha_reembolso: response0['fecha_reembolso'],
            fecha_viaje_inicio: response0['fecha_viaje_inicio'],
            fecha_viaje_fin: response0['fecha_viaje_fin'],
            duracion: response0['duracion'],
            punto_partida: response0['punto_partida'],
            punto_destino: response0['punto_destino'],
            fecha_gasto: response0['fecha_gasto'],
            moneda: response0['moneda'],
            cantidad_comprobantes: response0['cantidad_comprobantes'],
            importe: response0['importe'],
            status: 'eliminada',
            peticion: response0['peticion'],
            motivo: response0['motivo'],
            fecha_respuesta: Fecha_respt as string,              
          }
          console.log("viaje: ", viaje);
          return this.putData(viaje, urlAPI);
        } else {
          return of(null);
        }

      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  ObtenerDetalleComprobanteById(idViaje:any):Observable<any>{
    var urlAPI="detalle_comprobanteByIdComprobante/"+idViaje;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

    
    
}
