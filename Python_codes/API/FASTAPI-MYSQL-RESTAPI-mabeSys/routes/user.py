from fastapi import APIRouter, Response
from config.db import conn
from models.user import usuarios,ventas
from schemas.user import Usuario, Venta
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
async def get_TablasDinamicas():
    #sql="SELECT * FROM "+varConsul
    #sql2=" WHERE "
    sql ="SELECT CONCAT(punto_venta.nombre_pdv,linea.nombre_linea) AS CLAVE, venta.validacion as 'Source.Name' ,usuario.nombre_usuario as PROMOTOR,punto_venta.nombre_cliente_hijo AS 'CLIENTE HIJO',punto_venta.nombre_pdv AS 'TIENDA HMPV',punto_venta.cobertura as 'Cobertura Mes' ,linea.nombre_linea AS LINEA, venta.ventas_mabe AS 'VENTAS MABE', venta.ventas_indurama AS 'VENTAS INDURAMA', venta.ventas_whirlpool AS 'VENTAS WHIRLPOOL', venta.ventas_lg AS 'VENTAS LG', venta.ventas_samsung AS 'VENTAS SAMSUNG', venta.ventas_electrolux AS 'VENTAS ELECTROLUX', venta.mastertech AS MASTERTECH, venta.hove AS HOVE, venta.teka AS TEKA, venta.smc AS SMC, venta.otros AS OTROS FROM usuario, punto_venta, linea, venta WHERE usuario.codigo_pdv = punto_venta.codigo_pdv AND punto_venta.codigo_pdv = linea.codigo_pdv AND venta.id_linea = linea.id_linea AND venta.codigo_pdv = linea.codigo_pdv;"
    print(sql)    
    return conn.execute(sql+";").fetchall()  
    #return None 

@user.get("/nombresTablas/", tags=["consulta"])
async def get_Tablas():
    return conn.execute("SHOW TABLES FROM mabesys;").fetchall()

@user.get("/nombresPuntosVentas/{user}-{pass}", tags=["puntosVentas"])
async def get_NombresPuntosVentas(user: str, passw: str):
    return conn.execute("SELECT nombre_pdv FROM punto_venta WHERE codigo_pdv IN (SELECT codigo_pdv FROM usuario WHERE usuario = '"+str(user)+"' AND password =  '"+str(passw)+"');").fetchall()

@user.get("/codigoPuntoVentaByName/{name}", tags=["puntosVentas"])
async def get_CodigoPuntoVentaByName(name: str):
    return conn.execute("SELECT codigo_pdv FROM punto_venta WHERE nombre_pdv = '"+str(name)+"' LIMIT 1;").first()

@user.post("/ventas/",response_model=Venta, tags=["ventas"])#EJEMPLO
async def create_venta(venta: Venta):
    nueva_venta = {"id_linea":venta.id_linea, "codigo_pdv":venta.codigo_pdv, "ventas_mabe":venta.ventas_mabe,
    "ventas_indurama":venta.ventas_indurama,"ventas_whirlpool":venta.ventas_whirlpool,
    "ventas_lg":venta.ventas_lg, "ventas_samsung":venta.ventas_samsung, 
    "ventas_electrolux":venta.ventas_electrolux, "mastertech": venta.mastertech
    ,"hove":venta.hove, "teka":venta.teka, "smc":venta.smc, "otros":venta.otros
    , "validacion":venta.validacion}
    result = conn.execute(ventas.insert().values(nueva_venta))    
    return conn.execute( ventas.select().where(ventas.c.id_venta == result.lastrowid)).first()
    
@user.get("/idLineaByNames/{nombreLinea}_{nombrePDV}", tags=["lineas"])
async def get_idLineaByName(nombreLinea: str,nombrePDV: str ):
    print(nombreLinea,"->",nombrePDV)    
    sql2 = "SELECT id_linea FROM linea where nombre_linea = '"+str(nombreLinea)+"' AND codigo_pdv = (SELECT codigo_pdv FROM punto_venta where nombre_pdv = '"+str(nombrePDV)+"');"
    print(sql2)
    return conn.execute(sql2).first()
    