from fastapi import APIRouter, Response
from config.db import conn
from models.user import usuarios
from schemas.user import Usuario
from cryptography.fernet import Fernet
from starlette import status
from sqlalchemy.sql import select

key = Fernet.generate_key()
f = Fernet(key)
user = APIRouter()

#CONSULTA USERS
@user.get("/usuarios/",response_model=list[Usuario], tags=["usuarios"])#EJEMPLO
def get_users():
    return conn.execute(usuarios.select()).fetchall()

@user.get("/usuarios/{user}-{pass}", tags=["usuarios"])
def comprobar_usuario(user: str, passw: str):   
    #print("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'")
    return conn.execute("SELECT tipo FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.get("/consultaDinamica/", tags=["consulta"])
async def get_Tablas():
    #sql="SELECT * FROM "+varConsul
    #sql2=" WHERE "
    sql ="SELECT punto_venta.codigo_pdv,punto_venta.nombre_pdv,linea.nombre_linea,usuario.nombre_usuario,venta.id_venta,venta.ventas_mabe, venta.ventas_indurama, venta.ventas_whirlpool, venta.ventas_lg, venta.ventas_lg, venta.ventas_samsung, venta.ventas_electrolux, venta.mastertech, venta.hove, venta.teka, venta.smc, venta.otros, venta.validacion FROM usuario, punto_venta, linea, venta WHERE usuario.clave = punto_venta.clave AND punto_venta.codigo_pdv = linea.codigo_pdv AND venta.id_linea = linea.id_linea AND venta.codigo_pdv = linea.codigo_pdv"
    print(sql)    
    return conn.execute(sql+";").fetchall()  
    #return None 

@user.get("/nombresTablas/", tags=["consulta"])
async def get_Tablas():
    return conn.execute("SHOW TABLES FROM mabesys;").fetchall()
