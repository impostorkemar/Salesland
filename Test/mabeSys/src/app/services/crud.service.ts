import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Candidato } from './Candidato';
import { CentroCosto } from './CentroCosto';
import { Cargo } from './Cargo';
import { Contrato } from './Contrato';
import { ExperienciaLaboral } from './ExperienciaLaboral';
import { Personal } from './Personal';
import { map } from 'rxjs/operators';
import { HttpPostService } from './HttpPostService';	


@Injectable({
  providedIn: 'root'
})
export class CrudService {
API:string = 'http://192.168.1.35:8000/';
  constructor(private clienteHttp:HttpClient) { }

  private createRequestOptions() {
    let headers = new HttpHeaders({
        "accept": "application/json",
        "Content-Type": "application/json"        
    });
    return headers;
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
}
