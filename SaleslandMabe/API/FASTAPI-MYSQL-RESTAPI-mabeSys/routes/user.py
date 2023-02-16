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
    sql ="SELECT CONCAT(punto_venta.nombre_pdv,linea.nombre_linea) AS CLAVE, venta.validacion as 'Source.Name' ,usuario.nombre_usuario as PROMOTOR,punto_venta.nombre_cliente_hijo AS 'CLIENTE HIJO',punto_venta.nombre_pdv AS 'TIENDA HMPV',punto_venta.cobertura as 'Cobertura Mes' ,linea.nombre_linea AS LINEA, venta.ventas_mabe AS 'VENTAS MABE', venta.ventas_indurama AS 'VENTAS INDURAMA', venta.ventas_whirlpool AS 'VENTAS WHIRLPOOL', venta.ventas_lg AS 'VENTAS LG', venta.ventas_samsung AS 'VENTAS SAMSUNG', venta.ventas_electrolux AS 'VENTAS ELECTROLUX', venta.mastertech AS MASTERTECH, venta.hove AS HOVE, venta.teka AS TEKA, venta.smc AS SMC, venta.otros AS OTROS, venta.semana FROM usuario, punto_venta, linea,supervisor,venta WHERE venta.codigo_pdv = punto_venta.codigo_pdv AND punto_venta.codigo_pdv = linea.codigo_pdv AND venta.id_linea = linea.id_linea AND venta.codigo_pdv = linea.codigo_pdv AND punto_venta.codigo_pdv = usuario.codigo_pdv AND usuario.id_supervisor = venta.id_supervisor AND supervisor.id_supervisor = usuario.id_supervisor ;"
    print(sql)    
    return conn.execute(sql+";").fetchall()  
    #return None 

@user.get("/nombresTablas/", tags=["consulta"])
async def get_Tablas():
    return conn.execute("SHOW TABLES FROM mabesys;").fetchall()

@user.get("/nombresPuntosVentas/{user}-{pass}", tags=["puntosVentas"])
async def get_NombresPuntosVentas(user: str, passw: str):
    return conn.execute("SELECT nombre_pdv FROM punto_venta WHERE codigo_pdv IN (SELECT codigo_pdv FROM usuario WHERE usuario = '"+str(user)+"' AND password =  '"+str(passw)+"');").fetchall()

@user.get("/idLineaByNames/{nombreLinea}_{nombrePDV}", tags=["lineas"])
async def get_idLineaByName(nombreLinea: str,nombrePDV: str ):
    print(nombreLinea,"->",nombrePDV)    
    sql2 = "SELECT id_linea FROM linea where nombre_linea = '"+str(nombreLinea)+"' AND codigo_pdv = (SELECT codigo_pdv FROM punto_venta where nombre_pdv = '"+str(nombrePDV)+"');"
    print(sql2)
    return conn.execute("SELECT id_linea FROM linea where nombre_linea = '"+str(nombreLinea)+"' AND codigo_pdv = (SELECT codigo_pdv FROM punto_venta where nombre_pdv = '"+str(nombrePDV)+"');").fetchall()

@user.get("/codigoPuntoVentaByName/{name}", tags=["puntosVentas"])
async def get_CodigoPuntoVentaByName(name: str):
    return conn.execute("SELECT codigo_pdv FROM punto_venta WHERE nombre_pdv = '"+str(name)+"' LIMIT 1;").first()

@user.post("/ventas/",response_model=Venta, tags=["ventas"])#EJEMPLO
async def create_venta(venta: Venta):
    nueva_venta = {"clave":venta.clave,"cedula":venta.cedula,"id_supervisor":venta.id_supervisor
    ,"id_linea":venta.id_linea, "codigo_pdv":venta.codigo_pdv, "ventas_mabe":venta.ventas_mabe,
    "ventas_indurama":venta.ventas_indurama,"ventas_whirlpool":venta.ventas_whirlpool,
    "ventas_lg":venta.ventas_lg, "ventas_samsung":venta.ventas_samsung, 
    "ventas_electrolux":venta.ventas_electrolux, "mastertech": venta.mastertech
    ,"hove":venta.hove, "teka":venta.teka, "smc":venta.smc, "otros":venta.otros
    , "validacion":venta.validacion,"total_semanal":venta.total_semanal, "semana":venta.semana}
    print(ventas.insert().values(nueva_venta))
    result = conn.execute(ventas.insert().values(nueva_venta))    
    return conn.execute( ventas.select().where(ventas.c.id_venta == result.lastrowid)).first()
   
@user.get("/ventaSemanalByPromotor_Linea_Semana/{promotor}_{linea}_{semana}", tags=["ventas"])
async def get_VentaSemanalByPromotor_Linea_Semana(promotor: str,linea: str, semana: str ):
    print(promotor,"->",linea,"->",semana)     
    sql2 = "SELECT id_venta FROM venta WHERE semana = '"+str(semana)+"' AND codigo_pdv IN (SELECT codigo_pdv FROM usuario WHERE nombre_usuario = '"+str(promotor)+"') AND id_linea IN (SELECT id_linea FROM linea WHERE codigo_pdv = (SELECT codigo_pdv FROM usuario WHERE nombre_usuario = '"+str(promotor)+"') AND nombre_linea = '"+str(linea)+"');"
    print(sql2)
    return conn.execute(sql2).first()

@user.get("/nombrePromotorByUser_Pass/{user}-{pass}", tags=["promotor"])
async def get_NombresPuntosVentas(user: str, passw: str):
    return conn.execute("SELECT nombre_usuario FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.get("/clavePromotorByUser_Pass/{user}-{pass}", tags=["promotor"])
async def get_clavePromotorByUser_Pass(user: str, passw: str):
    print("SELECT clave FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';")
    return conn.execute("SELECT clave FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.get("/cedulaPromotorByUser_Pass/{clave}", tags=["promotor"])
async def get_cedulaPromotorByUser_Pass(clave: str):
    print("SELECT cedula FROM usuario WHERE clave = '"+str(clave)+"';")
    return conn.execute("SELECT cedula FROM usuario WHERE clave = '"+str(clave)+"';").first()

@user.get("/idSupervisorByUser_Pass/{user}-{pass}", tags=["supervisor"])
async def get_idSupervisorByUser_Pass(user:str,passw: str):
    print("SELECT id_supervisor FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"' LIMIT 1;")
    return conn.execute("SELECT id_supervisor FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"' LIMIT 1;").first()

@user.get("/comprobarVentatByIdLinea_Semana_Cedula/{idLinea}_{semana}_{cedula}_{codigo_pdv}", tags=["ventas"])
async def get_ComprobarVentatByIdLinea_Semana_Cedula(idLinea: str, semana: str,cedula: str,codigo_pdv: str ):
    print("SELECT id_venta FROM venta WHERE semana = '"+str(semana)+"' AND cedula = '"+str(cedula)+"' AND id_linea='"+str(idLinea)+"' AND codigo_pdv = '"+str(codigo_pdv)+"';")
    return conn.execute("SELECT id_venta FROM venta WHERE semana = '"+str(semana)+"' AND cedula = '"+str(cedula)+"' AND id_linea='"+str(idLinea)+"' AND codigo_pdv = '"+str(codigo_pdv)+"';").first()

@user.get("/comprobarnombresLineasRegistradaBySemana_Cedula_CodigoPdv/{semana}_{cedula}_{codigo_pdv}", tags=["ventas"])
async def get_comprobarLineaRegistradaBase(semana: str,cedula: str,codigo_pdv: str ):
    print("SELECT linea.nombre_linea FROM venta, linea WHERE venta.id_linea = linea.id_linea AND venta.cedula = '"+str(cedula)+"' AND venta.codigo_pdv= '"+str(codigo_pdv)+"' AND venta.semana = '"+str(semana)+"';")
    return conn.execute("SELECT linea.nombre_linea FROM venta, linea WHERE venta.id_linea = linea.id_linea AND venta.cedula = '"+str(cedula)+"' AND venta.codigo_pdv= '"+str(codigo_pdv)+"' AND venta.semana = '"+str(semana)+"';").fetchall()