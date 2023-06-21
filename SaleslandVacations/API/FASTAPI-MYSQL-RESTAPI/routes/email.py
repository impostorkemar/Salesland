from email.message import EmailMessage
from fastapi import APIRouter, Response, FastAPI
from config.db import conn, engine
from models.user import users, usuarios, candidatos, personales, cargos, contratos, centro_costos, vacaciones, supervisores
from schemas.user import Consult,Consult2
from cryptography.fernet import Fernet
from starlette import status
from starlette.requests import Request
from starlette.responses import JSONResponse
from sqlalchemy.sql import select
import re
from fastapi_mail import FastMail, MessageSchema,ConnectionConfig
from pydantic import EmailStr, BaseModel
from typing import List
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pydantic import BaseSettings

class Settings(BaseSettings):
    remitente: str
    passw: str
    class Config:
        env_file = ".env"


key = Fernet.generate_key()
f = Fernet(key)
email = APIRouter()

@email.get("/datosEmailSupervisor/{user}-{pass}-{id}", tags=["mail"])#EJEMPLO
def get_datosEmailSupervisor(user: str, passw: str, id: str):
  conn = engine.connect()
  sql = "SELECT supervisor.nombre_supervisor, supervisor.email, candidato.nombre,vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, candidato.direccion_correo FROM supervisor,candidato,vacaciones,personal WHERE candidato.cedula = personal.cedula AND vacaciones.id_personal = personal.id_personal AND supervisor.id_supervisor = (SELECT id_supervisor FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND vacaciones.id_vacaciones = '"+str(id)+"';"
  return conn.execute(sql).first()

@email.post("/sendEmailIngresoSolicitud/")
async def sendEmailIngresoSolicitud(consult:Consult):
  print(consult.user,consult.passw,consult.id)

  datosEnvio = get_datosEmailSupervisor(consult.user,consult.passw, consult.id)
  print("datosEnvio:\n",datosEnvio)
  # Configura los detalles del correo electrónico
  settings = Settings()
  smtp_server = 'smtp.gmail.com' 
  destinatario1 = datosEnvio[1]
  destinatario2 = datosEnvio[6]
  subject = 'Solicitud de vacación'
  html = f"""
    <html>    
    <head>
      <style>
        

      </style>
    </head>
    <body>
       <br>
      <h1> Saludos Cordiales   </h1>      
      <br>
      <h2> Se ha ingresado una solicitud con ID: {consult.id}</h1> 
      <h2> Perteneciente a: {datosEnvio[2]}</h1>
      <br>
      <h2> Fecha solicitud {datosEnvio[3]}</h1>
      <ul>
        <li><h3> De fecha inicio: {datosEnvio[4]}</h1></li>
        <li><h3> Hasta fecha fin: {datosEnvio[5]}</h1></li>
      </ul>
      <h2> En el siguiente link </h2>    
      <a href='http://192.168.1.29:4200/' target='_blank'>Ir a solicitudes de vacación</a>
    </body>   
    </html>
        """
  
  destinatarios = []
  destinatarios.append(destinatario1)
  destinatarios.append(destinatario2)

  email = EmailMessage()
  email['From'] = settings.remitente
  email['To'] = destinatarios
  email['Subject'] = subject
  email.set_content(html,subtype="html")  
  
  for i in destinatarios:    
    print("destinatarios:",i)
    # Conecta con el servidor SMTP y envía el correo electrónico
    smtp = smtplib.SMTP_SSL(smtp_server)
    smtp.login(settings.remitente,settings.passw)
    smtp.sendmail(settings.remitente,i,email.as_string())
    smtp.quit()

  return {"message": "Correos electrónicos de notificación enviados correctamente"} 
  
@email.post("/sendEmailSolicitudACancelacion/")
async def sendEmailSolicitudACancelacion(consult:Consult):
  print(consult.user,consult.passw,consult.id)

  datosEnvio = get_datosEmailSupervisor(consult.user,consult.passw)
   
  # Configura los detalles del correo electrónico
  settings = Settings()
  smtp_server = 'smtp.gmail.com' 
  destinatario = datosEnvio[1]
  subject = 'Cancelación de solicitud de vacación'
  html = f"""
    <html>    
    <br>
    <h1> Saludos Cordiales   </h1>
    <h1 >{datosEnvio[0]} </h1>
    <br>
    <h1> Revisar Solicitud con ID: {consult.id}</h1> 
    <h1> Para mayor información en el siguiente link </h1>    
    <a href='http://192.168.1.29:4200/' target='_blank'>Ir a solicitudes de vacación</a>
    </html>
        """

  email = EmailMessage()
  email['From'] = settings.remitente
  email['To'] = destinatario
  email['Subject'] = subject
  email.set_content(html,subtype="html")


  destinatarios = []
  destinatarios.append(destinatario)
  for i in destinatarios:    
    # Conecta con el servidor SMTP y envía el correo electrónico
    smtp = smtplib.SMTP_SSL(smtp_server)
    smtp.login(settings.remitente,settings.passw)
    smtp.sendmail(settings.remitente,i,email.as_string())
    smtp.quit()

  return {"message": "Correos electrónicos de notificación enviados correctamente"} 
  
@email.get("/datosEmailUser/{idVacacion}", tags=["mail"])#EJEMPLO
def get_datosEmailUser(idVacacion: str):
  conn = engine.connect()
  sql = ("SELECT candidato.nombre, candidato.direccion_correo, supervisor.email, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.status, vacaciones.observaciones FROM candidato,personal,vacaciones, supervisor WHERE supervisor.id_supervisor = personal.id_supervisor AND candidato.cedula = personal.cedula AND personal.id_personal = vacaciones.id_personal AND vacaciones.id_vacaciones = '"+str(idVacacion)+"' AND candidato.cedula = ( SELECT cedula FROM personal WHERE id_personal = (SELECT id_personal FROM vacaciones WHERE vacaciones.id_vacaciones = '"+str(idVacacion)+"'));")
  return conn.execute(sql).first()

@email.get("/datosEmailUserViaje/{id}", tags=["mail"])#EJEMPLO
def datosEmailUserViaje(id: str):
  conn = engine.connect()
  sql = ("SELECT candidato.nombre, candidato.direccion_correo, viaje.fecha_reembolso, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin, viaje.fecha_respuesta, viaje.status, viaje.motivo FROM candidato,personal,viaje WHERE candidato.cedula = personal.cedula AND personal.id_personal = viaje.id_personal AND viaje.id_viaje = '"+str(id)+"' AND candidato.cedula = ( SELECT cedula FROM personal WHERE id_personal = (SELECT id_personal FROM viaje WHERE viaje.id_viaje = '"+str(id)+"'));")
  return conn.execute(sql).first()

@email.post("/sendEmailCambioEstadoSolicitudViaje/")
async def sendEmailCambioEstadoSolicitudViaje(consult2:Consult2):
  print(consult2)
  datosEnvio = 0
  datosEnvio = datosEmailUserViaje(consult2.id)
  print("datosEnvio:\n",datosEnvio)
  
  # Configura los detalles del correo electrónico
  settings = Settings()
  smtp_server = 'smtp.gmail.com' 
  destinatario1 = datosEnvio[1]
  subject = 'Cambio de estado de Solicitud  de Gastos de Viaje' 
  html = f"""
    <html>    
    <br>
    <h1> Saludos Cordiales   </h1>
    <br>
      <h2> Se ha producido un cambio de estado en la solicitud con ID: {consult2.id}</h1> 
      <h2> Status: {datosEnvio[6]} </h2>
      <h2> Motivo:</h2>
      <br>
      <h1>{datosEnvio[7]}</h1>
      <br>
      <h2> Perteneciente a: {datosEnvio[0]}</h1>
      <h2> Fecha Reembolso: </h2>      
      <h1> {datosEnvio[2]} </h1>
      <ul>
        <li><h3> De fecha inicio: {datosEnvio[3]}</h1></li>
        <li><h3> Hasta fecha fin: {datosEnvio[4]}</h1></li>
      </ul>
      <br>       
      <h2> Fecha respuesta: </h2>      
      <h1> {datosEnvio[5]} </h1>           
    <h1>Para mayor información en el siguiente link </h1>    
    <a href='http://192.168.1.27:4200/' target='_blank'>Ir a solicitudes de vacación</a>
    </html>
        """
  destinatarios = []
  destinatarios.append(destinatario1)
  #destinatarios.append(destinatario2)

  email = EmailMessage()
  email['From'] = settings.remitente
  email['To'] = destinatarios
  email['Subject'] = subject
  email.set_content(html,subtype="html")
  
  for i in destinatarios:    
    print("destinatarios:",i)
    # Conecta con el servidor SMTP y envía el correo electrónico
    smtp = smtplib.SMTP_SSL(smtp_server)
    smtp.login(settings.remitente,settings.passw)
    smtp.sendmail(settings.remitente,i,email.as_string())
    smtp.quit()

  return {"message": "Correos electrónicos de notificación enviados correctamente"}

@email.post("/sendEmailCambioEstadoSolicitud/")
async def sendEmailCambioEstadoSolicitud(consult2:Consult2):
  datosEnvio = 0
  datosEnvio = get_datosEmailUser(consult2.id)  
  print("datosEnvio:\n",datosEnvio)
  
  # Configura los detalles del correo electrónico
  settings = Settings()
  smtp_server = 'smtp.gmail.com' 
  destinatario1 = datosEnvio[1]
  destinatario2 = datosEnvio[2]
  subject = 'Cambio de estado de Solicitud  de Vacaciones' 
  html = f"""
    <html>    
    <br>
    <h1> Saludos Cordiales   </h1>
    <br>
      <h2> Se ha producido un cambio de estado en la solicitud con ID: {consult2.id}</h1> 
      <h2> Status: {datosEnvio[7]} </h2>
      <h2> Motivo:</h2>
      <br>
      <h1>{datosEnvio[8]}</h1>
      <br>
      <h2> Perteneciente a: {datosEnvio[0]}</h1>
      <h2> Fecha solicitud: </h2>      
      <h1> {datosEnvio[3]} </h1>
      <ul>
        <li><h3> De fecha inicio: {datosEnvio[4]}</h1></li>
        <li><h3> Hasta fecha fin: {datosEnvio[5]}</h1></li>
      </ul>
      <br>       
      <h2> Fecha respuesta: </h2>      
      <h1> {datosEnvio[6]} </h1>           
    <h1>Para mayor información en el siguiente link </h1>    
    <a href='http://192.168.1.27:4200/' target='_blank'>Ir a solicitudes de vacación</a>
    </html>
        """
  destinatarios = []
  destinatarios.append(destinatario1)
  destinatarios.append(destinatario2)

  email = EmailMessage()
  email['From'] = settings.remitente
  email['To'] = destinatarios
  email['Subject'] = subject
  email.set_content(html,subtype="html")
  
  for i in destinatarios:    
    print("destinatarios:",i)
    # Conecta con el servidor SMTP y envía el correo electrónico
    smtp = smtplib.SMTP_SSL(smtp_server)
    smtp.login(settings.remitente,settings.passw)
    smtp.sendmail(settings.remitente,i,email.as_string())
    smtp.quit()

  return {"message": "Correos electrónicos de notificación enviados correctamente"}

