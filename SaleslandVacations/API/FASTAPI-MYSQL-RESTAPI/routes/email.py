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

@email.get("/datosEmailSupervisor/{user}-{pass}", tags=["mail"])#EJEMPLO
def get_datosEmailSupervisor(user: str, passw: str):
  conn = engine.connect()
  sql = ("SELECT supervisor.nombre_supervisor, supervisor.email FROM supervisor WHERE supervisor.id_supervisor = (SELECT id_supervisor FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '1724124084' AND password = '1724124084'));")
  return conn.execute(sql).first()

@email.post("/sendEmailIngresoSolicitud/")
async def sendEmailIngresoSolicitud(consult:Consult):
  print(consult.user,consult.passw,consult.id)

  datosEnvio = get_datosEmailSupervisor(consult.user,consult.passw)
   
  # Configura los detalles del correo electrónico
  settings = Settings()
  smtp_server = 'smtp.gmail.com' 
  destinatario = datosEnvio[1]
  subject = 'Solicitud de vacación'
  html = f"""
    <html>    
    <br>
    <h1> Saludos Cordiales   </h1>
    <h1 >{datosEnvio[0]} </h1>
    <br>
    <h1> Revisar Solicitud con ID: {consult.id}</h1> 
    <h1> En el siguiente link </h1>    
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

    return {"message": "Correo electrónico de notificación enviado correctamente"} 
  
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
    <h1> En el siguiente link </h1>    
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

    return {"message": "Correo electrónico de notificación enviado correctamente"} 
  
@email.get("/datosEmailUser/{idVacacion}", tags=["mail"])#EJEMPLO
def get_datosEmailUser(idVacacion: str):
  conn = engine.connect()
  sql = ("SELECT candidato.nombre, candidato.direccion_correo FROM candidato WHERE candidato.cedula = ( SELECT cedula FROM personal WHERE id_personal = (SELECT id_personal FROM vacaciones WHERE vacaciones.id_vacaciones = '"+str(idVacacion)+"'));")
  return conn.execute(sql).first()
  
@email.post("/sendEmailCambioEstadoSolicitud/")
async def sendEmailCambioEstadoSolicitud(consult2:Consult2):
  

  datosEnvio = get_datosEmailUser(consult2.id)
   
  # Configura los detalles del correo electrónico
  settings = Settings()
  smtp_server = 'smtp.gmail.com' 
  destinatario = datosEnvio[1]
  subject = 'Cambio de estado de Solicitud de vacación'
  html = f"""
    <html>    
    <br>
    <h1> Saludos Cordiales   </h1>
    <h1 >{datosEnvio[0]} </h1>
    <br>
    <h1> Cambio de estado de Solicitud con ID: {consult2.id}</h1> 
    <h1> En el siguiente link </h1>    
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

    return {"message": "Correo electrónico de notificación enviado correctamente"}

