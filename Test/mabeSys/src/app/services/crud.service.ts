import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Usuario } from './Usuario';
import { Candidato } from './Candidato';
import { CentroCosto } from './CentroCosto';
import { Cargo } from './Cargo';
import { Contrato } from './Contrato';
import { ExperienciaLaboral } from './ExperienciaLaboral';
import { Personal } from './Personal';
import { map } from 'rxjs/operators';
import { HttpPostService } from './HttpPostService';	
import { Vacaciones } from './Vacaciones';
import { TestuserService } from 'src/app/services/testuser.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import {formatDate} from '@angular/common';
import { NgbDate, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
API:string = 'http://192.168.1.29:8000/';
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
  ObtenerCandidatos(){
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
  ObtenerCentrosCostos(){
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

  AgregarVacaciones(id_personal: string, fecha_sol: string, fecha_inicio_vac: string, fecha_fin_vac: string, dias_lab_sol: number, 
    dias_disp_acu:  number):Observable<any>{
    console.log("fecha_sol:",fecha_sol);
    //console.log("vaca_disp:",dias_disp_acu);
    //console.log("saldo_dias:",dias_lab_sol); 
    /*for(const prop in this.getRespen()) {
      Array.push(this.getRespen()[prop])
    }*/ 
    var urlAPI="vacation2/";
    var data; 
    data = {"id_personal":id_personal,"fecha_solicitud":fecha_sol ,"fecha_inicio_vacaciones":fecha_inicio_vac, 
    "fecha_fin_vacaciones":fecha_fin_vac,"fecha_respuesta":"", "dias_lab_solicitados":dias_lab_sol,
    "dias_disponibles_acum":dias_disp_acu,"status":"pendiente","peticion":"aprobacion", "observaciones":""}
    return this.clienteHttp.post(this.API + urlAPI, data);
    
  }

  ObtenerCedulaByUser_Pass(user:any,pass:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="cedByPassAndUSer/"+user as string+"-{pass}?passw="+pass as string;       
    return this.clienteHttp.get(this.API+urlAPI);                
  }  

  public ObtenerIDPersonal(user:any,pass:any){
    var urlAPI="idpersonalByPassAndUSer/"+user as string+"-{pass}?passw="+pass as string;       
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

  ObtenerVacacionesPersonal():Observable<any>{
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
    //console.log("user:",user,"pass:", pass)
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

  BorrarVacacion(id:any,Vacaciones:any,iControl:any) {
    var urlAPI="vacaciones/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);
    if(window.confirm("¿Desea borrar el registro?")){
      return this.clienteHttp.delete(this.API +urlAPI+id).subscribe((respuesta)=>{
        Vacaciones.splice(iControl,1);
      });    
    }
    else{
      return null;
    }    
  } 

  BorrarVacacionById(id:any) :Observable<any> {
    var urlAPI="vacaciones/";
    //console.log("URL=",this.API +urlAPI+id);
    //console.log("ID=",id);  
    return this.clienteHttp.delete(this.API +urlAPI+id);               
  }

  ObtenerExistenciaVacaciones(user:any,pass:any, fecha:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
    var urlAPI="comprobarVacacionesRegistradasByUserPassword/"+user as string+"_{pass}_"+fecha as string+"?passw="+pass as string;      
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ObteneVacacionesAReasignarByUserPassword(user:any,pass:any,fecha:any):Observable<any>{
    //console.log("user:",user,"pass:", pass)
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
        response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
        "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
        + response0['fecha_fin_vacaciones'])){
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
            fecha_respuesta: response0['fecha_respuesta'],
            status: response0['status'],
            peticion: 'cancelacion',
            observaciones: observaciones as string,
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
          response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'])){
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
              fecha_respuesta: response0['fecha_respuesta'],
              status: 'aprobada',
              peticion: '',
              observaciones: observaciones as string,
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
          response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'])){
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
              fecha_respuesta: response0['fecha_respuesta'],
              status: 'negada',
              peticion: '',
              observaciones: observaciones as string,
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
      var urlAPI="aprobarVacacionById/";
      var myDate = new Date();
      var Fecha_respt = myDate.getFullYear()+"-"+myDate.getMonth()+"-"+myDate.getDay()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()      
      this.ObtenerVacacionById(id).subscribe(response0 => {
        if (response0['status'] === 'pendiente' && response0['peticion'] === 'aprobacion' ){
          if(window.confirm("¿Desea aprobar la solicitud?\nID VACACIONES: "+
          response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'])){
            let options = this.createRequestOptions();
            var urlAPI="aprobarVacacionById/"+id;
            var vaca: Vacaciones ={
              id_vacaciones: response0['id_vacaciones'],
              id_personal: response0['id_personal'],
              fecha_solicitud:response0['fecha_solicitud'],
              fecha_inicio_vacaciones: response0['fecha_inicio_vacaciones'],
              fecha_fin_vacaciones: response0['fecha_fin_vacaciones'],
              dias_lab_solicitados: response0['dias_lab_solicitados'],
              dias_disponibles_acum: response0['dias_disponibles_acum'],
              fecha_respuesta: Fecha_respt as string,
              status: 'aprobada',
              peticion: response0['peticion'],
              observaciones: observaciones as string,
            }
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
                  fecha_respuesta: vaca['fecha_respuesta'],
                  status: vaca['status'],
                  peticion: vaca['peticion'],
                  observaciones: vaca['observaciones'],
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
          response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'])){
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
              fecha_respuesta: Fecha_respt as string,
              status: 'cancelada',
              peticion: response0['peticion'],
              observaciones: response0['observaciones']+'\nPeticion de cancelacion:\n'+observaciones as string,
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
                  fecha_respuesta: vaca['fecha_respuesta'],
                  status: vaca['status'],
                  peticion: vaca['peticion'],
                  observaciones: vaca['observaciones'],
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
          if(window.confirm("¿Desea aprobar la solicitud?\nID VACACIONES: "+
          response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'])){
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
              fecha_respuesta: Fecha_respt as string,
              status: 'negada',
              peticion: 'aprobacion',
              observaciones: observaciones as string,
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
                  fecha_respuesta: vaca['fecha_respuesta'],
                  status: vaca['status'],
                  peticion: vaca['peticion'],
                  observaciones: vaca['observaciones'],
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
          response0['id_vacaciones']+ "\nFECHA SOLICITUD: "+response0['fecha_solicitud']+ 
          "\nFECHA INICIO VACACIONES: "+response0['fecha_inicio_vacaciones']+ "\nFECHA FIN VACACIONES: "
          + response0['fecha_fin_vacaciones'])){
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
              fecha_respuesta: Fecha_respt as string,
              status: 'pendiente',
              peticion: 'aprobacion',
              observaciones: "Preaprobado:\n"+observaciones as string,
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
                  fecha_respuesta: vaca['fecha_respuesta'],
                  status: vaca['status'],
                  peticion: vaca['peticion'],
                  observaciones: vaca['observaciones'],
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

    EnviarCorreoNotificacionIngresoSolicitud(user:any,passw:any,id:any): Observable<any>{
      var consult = {"user":user, "passw":passw, "id":id}
      console.log(consult.user,consult.passw,consult.id)     
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

    
  


}
