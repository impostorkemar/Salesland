import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Usuario } from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class TestuserService {
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
  
}


