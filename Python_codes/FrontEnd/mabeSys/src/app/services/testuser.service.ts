import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Venta } from './Venta';


@Injectable({
  providedIn: 'root'
})
export class TestuserService {
  API:string = 'http://192.168.1.37:8000/';

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
    console.log("USER",datosUsuario);
    var urlAPI="usuarios/";
    console.log("URL=",this.API +urlAPI);
    return this.postData(datosUsuario,urlAPI)
  }

  ObtenerUsuarios(){
    var urlAPI="usuarios/";
    return this.clienteHttp.get(this.API +urlAPI);
  }
  ObtenerUsuario(id:any):Observable<any>{
    var urlAPI="usuarios/";    
    return this.clienteHttp.get(this.API+urlAPI+id);
  }
  confirmarUsuario(user:any,pass:any):Observable<any>{
    var urlAPI="usuarios/"+user+"-{pass}?passw="+pass;      
    return this.clienteHttp.get(this.API+urlAPI);                
  }
  ObtenerConsultaDinamica(){
    var urlAPI="consultaDinamica/";
    console.log("URI",this.API+urlAPI)
    return this.clienteHttp.get(this.API+urlAPI);
  }
  ObtenerTablasBaseDatos(){
    var urlAPI="nombresTablas/";
    console.log("URI",this.API+urlAPI)
    return this.clienteHttp.get(this.API+urlAPI);
  }


  ObtenerCodigoPuntoVenta(name:any):Observable<any>{
    var urlAPI="codigoPuntoVentaByName/"+name;      
    return this.clienteHttp.get(this.API+urlAPI);                
  } 
  
  AgregarVenta(datosVenta:Venta): Observable<any>{   
    console.log("Venta:",datosVenta);
    var urlAPI="ventas/";
    console.log("URL=",this.API +urlAPI);
    return this.postData(datosVenta,urlAPI)
  }

  ObtenerNombresPuntosVenta(user:any,pass:any):Observable<any>{
    var urlAPI="nombresPuntosVentas/"+user+"-{pass}?passw="+pass;      
    return this.clienteHttp.get(this.API+urlAPI);                
  } 

  ObtenerIdLineaByCodigoPdv_nombreLinea(nombreLinea: any,nombrePdv: any):Observable<any>{
    console.log("nombreLinea:",nombreLinea,"nombrePdv:", nombrePdv)
    var urlAPI="idLineaByNames/"+nombreLinea+"_"+nombrePdv;      
    return this.clienteHttp.get(this.API+urlAPI);                
  }

  ConsultarNombrePromotor(user:any,pass:any):Observable<any>{
    console.log("usuario:",user,"pass:", pass)
    var urlAPI="nombrePromotorByUser_Pass/"+user+"-{pass}?passw="+pass;    
    return this.clienteHttp.get(this.API+urlAPI);
  }

  ComprobarVentaSemanalByPromotor_Linea_Semana(promotor: any, linea:any, semana:any):Observable<any>{
    console.log("promotor:",promotor,"linea:", linea,"semana:",semana)
    var urlAPI="ventaSemanalByPromotor_Linea_Semana/"+promotor+"_"+linea+"_"+semana;      
    return this.clienteHttp.get(this.API+urlAPI);                
  }


}


