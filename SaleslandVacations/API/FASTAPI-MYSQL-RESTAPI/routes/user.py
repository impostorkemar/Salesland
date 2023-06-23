from fastapi import APIRouter, Response
from config.db import conn, engine
from models.user import users, usuarios, candidatos, personales, cargos, contratos, centro_costos, vacaciones, supervisores, viajes, comprobantes, detalle_comprobantes
from schemas.user import User,Usuario, Centro_costo, Cargo, Contrato, Candidato, Personal, Experiencia_laboral, Vacacion, Supervisor, Rol_pagos, Viaje, Comprobante, Detalle_Comprobante
from cryptography.fernet import Fernet
from starlette import status
from sqlalchemy.sql import select
from fastapi import APIRouter, Response, FastAPI,File, UploadFile
from fastapi.responses import FileResponse
from datetime import datetime
import re
import os
import shutil
import pandas as pd
import json

key = Fernet.generate_key()
f = Fernet(key)
user = APIRouter()

#CONSULTA USERS
@user.get("/users/",response_model=list[User], tags=["users"])#EJEMPLO
def get_users():
    conn = engine.connect()
    return conn.execute(users.select()).fetchall()

@user.post("/users/",response_model=User, tags=["users"])#EJEMPLO
def create_user(user: User):
    conn = engine.connect()
    new_user = {"name": user.name, "email": user.email}
    new_user["password"] = f.encrypt(user.password.encode("utf-8"))
    result = conn.execute(users.insert().values(new_user))    
    return conn.execute(users.select().where(users.c.id == result.lastrowid)).first()

@user.get("/users/{id}",response_model=User, tags=["users"])#EJEMPLO
def get_user(id: str):        
    conn = engine.connect()
    return conn.execute(users.select().where(users.c.id == id)).first()

@user.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["users"])
def delete_user(id: str):   
    conn = engine.connect()
    conn.execute(users.delete().where(users.c.id==id)) 
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/users/{id}", response_model=User, tags=["users"])
def update_user(id: str, user: User):    
    conn = engine.connect()
    conn.execute(
        users.update().values(
            name=user.name, 
            email=user.email, 
            password=f.encrypt(user.password.encode("utf-8"))).where(users.c.id == id)) 
    return get_user(id)

#CONSULTA USUARIOS
@user.get("/usuarios/",response_model=list[Usuario], tags=["usuarios"])
def get_usuarios():
    conn = engine.connect()
    return conn.execute(usuarios.select()).fetchall()

@user.get("/usuarios/{user}-{pass}", tags=["usuarios"])
def comprobar_usuario(user: str, passw: str):   
    conn = engine.connect()
    #print("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'")
    return conn.execute("SELECT tipo FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.post('/usuarios/', response_model=Usuario,tags=["usuarios"])
def create_usuario(user: Usuario):
    conn = engine.connect()
    nuevo_usuario = {"cedula":user.cedula, "usuario":user.usuario, "password":user.password, "tipo": user.tipo}
    result = conn.execute(usuarios.insert().values(nuevo_usuario))    
    print(result)
    return conn.execute( usuarios.select().where(usuarios.c.id_usuario == result.lastrowid)).first()

@user.get("/usuarios/{id}",response_model=Usuario, tags=["usuarios"])
def get_usuario(id: str):    
    conn = engine.connect()
    #return conn.execute("SELECT * FROM `usuario` WHERE  id_usuario = "+str(id)).first()
    return  conn.execute(usuarios.select().where(usuarios.c.id_usuario == id)).first()

@user.delete("/usuarios/{id}", status_code=status.HTTP_204_NO_CONTENT,tags=["usuarios"])
def delete_usuario(id: str):    
    conn = engine.connect()
    conn.execute(usuarios.delete().where(usuarios.c.id_usuario == id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/usuarios/{id}",response_model=Usuario,tags=["usuarios"])
def update_usuario(id: str,user: Usuario): 
    conn = engine.connect()
    sql="UPDATE `usuario` SET `id_usuario`='"+str(user.id_usuario)+"',`cedula`='"+str(user.cedula)+"',`usuario`='"+str(user.usuario)+"',`password`='"+str(user.password)+"',`tipo`='"+str(user.tipo)+"' WHERE `id_usuario` = '"+str(id)+"'"  
    conn.execute(sql)
    return get_usuario(user.id_usuario)

#CONSULTA CENTRO_COSTO
@user.get("/centro_costos/", tags=["centro_costos"])
def get_centro_costos():
    conn = engine.connect()
    return conn.execute("SELECT * FROM centro_costo;").fetchall()

@user.post("/centro_costos/", tags=["centro_costos"])
def create_centro_costo(centro_costo: Centro_costo):    
    conn = engine.connect()
    sql="INSERT INTO centro_costo(id_centro_costo, nombre_centro, tienda, cuenta) VALUES "
    datos = (centro_costo.id_centro_costo,centro_costo.nombre_centro,
    centro_costo.tienda,centro_costo.cuenta)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `centro_costo` WHERE `id_centro_costo` = "+str(centro_costo.id_centro_costo)).first()

@user.get("/centro_costos/{id}", tags=["centro_costos"])
def get_centro_costo(id: str):    
    conn = engine.connect()
    return conn.execute("SELECT * FROM `centro_costo` WHERE `id_centro_costo` = "+str(id)).first()

@user.delete("/centro_costos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["centro_costos"])
def delete_centro_costo(id: str):    
    conn = engine.connect()
    conn.execute("DELETE FROM `centro_costo` WHERE  id_centro_costo = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT) 

@user.put("/centro_costos/{id}", response_model=Centro_costo, tags=["centro_costos"])
def update_centro_costo(id: str, centro_costo: Centro_costo):    
    conn = engine.connect()
    sql="UPDATE `centro_costo` SET `id_centro_costo`='"+str(centro_costo.id_centro_costo)+"',`nombre_centro`='"+str(centro_costo.nombre_centro)+"',`tienda`='"+str(centro_costo.tienda)+"',`cuenta`='"+str(centro_costo.cuenta)+"' WHERE  id_centro_costo = '"+str(id)+"'"
    conn.execute(sql)
    return get_centro_costo(centro_costo.id_centro_costo)

#CONSULTA CONTRATOS
@user.get("/contratos/", tags=["contratos"])
def get_contratos():
    conn = engine.connect()
    return conn.execute("SELECT * FROM contrato;").fetchall()

@user.post("/contratos/", tags=["contratos"])
def create_contrato(contrato: Contrato):    
    conn = engine.connect()
    sql = "INSERT INTO `contrato`(`tipo_contrato`, `fecha_inicio_contrato`, `salario`, `observaciones`) VALUES "
    datos = (contrato.tipo_contrato, contrato.fecha_inicio_contrato, contrato.salario, contrato.observaciones)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `contrato` WHERE `id_contrato` = "+str(result.lastrowid)).first()

@user.get("/contratos/{id}", tags=["contratos"])
def get_contrato(id: str):  
    conn = engine.connect()
    return conn.execute("SELECT * FROM `contrato` WHERE `id_contrato` = "+str(id)).first()

@user.delete("/contratos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["contratos"])
def delete_contrato(id: str):  
    conn = engine.connect()
    conn.execute("DELETE FROM `contrato` WHERE `id_contrato` = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/contratos/{id}",response_model=Contrato, tags=["contratos"])
def update_contrato(id: str, contrato: Contrato):  
    conn = engine.connect()
    print(contrato);
    sql="UPDATE `contrato` SET `id_contrato`='"+str(contrato.id_contrato)+"',`tipo_contrato`='"+str(contrato.tipo_contrato)+"',`fecha_inicio_contrato`='"+str(contrato.fecha_inicio_contrato)+"',`salario`='"+str(contrato.salario)+"',`observaciones`='"+str(contrato.observaciones)+"' WHERE `id_contrato` = '"+str(id)+"'"
    conn.execute(sql)
    return get_contrato(contrato.id_contrato)


#CONSULTA EXPERIENCIA_LABORAL
@user.get("/experiencia_laborales/", tags=["experiencia_laborales"])
def get_experiencia_laborales():
    conn = engine.connect()
    return conn.execute("SELECT * FROM experiencia_laboral;").fetchall()

@user.post("/experiencia_laborales/", tags=["experiencia_laborales"])
def create_experiencia_laboral(experiencia_laboral: Experiencia_laboral):    
    conn = engine.connect()
    sql = "INSERT INTO `experiencia_laboral`( `cedula`,`nombre_experiencia`, `tiempo_experiencia`, `estudios_universitarios`) VALUES"
    datos = (experiencia_laboral.cedula,experiencia_laboral.nombre_experiencia,experiencia_laboral.tiempo_experiencia,
    experiencia_laboral.estudios_universitarios)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `experiencia_laboral` WHERE `id_experiencia_laboral` = "+str(result.lastrowid)).first()

@user.get("/experiencia_laborales/{id}", tags=["experiencia_laborales"])
def get_experiencia_laboral(id: str):    
    conn = engine.connect()
    return conn.execute("SELECT * FROM `experiencia_laboral` WHERE `id_experiencia_laboral` = "+str(id)).first()

@user.delete("/experiencia_laborales/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["experiencia_laborales"])
def delete_experiencia_laboral(id: str):    
    conn = engine.connect()
    conn.execute("DELETE FROM `experiencia_laboral` WHERE `id_experiencia_laboral` = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/experiencia_laborales/{id}",response_model=Experiencia_laboral, tags=["experiencia_laborales"] )
def update_experiencia_laboral(id: str,experiencia_laboral: Experiencia_laboral):    
    conn = engine.connect()
    sql="UPDATE `experiencia_laboral` SET `id_experiencia_laboral`='"+str(experiencia_laboral.id_experiencia_laboral)+"',`cedula`='"+str(experiencia_laboral.cedula)+"',`nombre_experiencia`='"+str(experiencia_laboral.nombre_experiencia)+"',`tiempo_experiencia`='"+str(experiencia_laboral.tiempo_experiencia)+"',`estudios_universitarios`='"+str(experiencia_laboral.estudios_universitarios)+"' WHERE `id_experiencia_laboral` = '"+str(id)+"'"
    conn.execute(sql)
    return get_experiencia_laboral(experiencia_laboral.id_experiencia_laboral)

#CONSULTA PERSONAS
@user.get("/candidatos/", tags=["candidatos"])
def get_candidatos():
    conn = engine.connect()
    return conn.execute("SELECT * FROM candidato;").fetchall()

@user.post("/candidatos/", tags=["candidatos"])
def create_candidatos(candidato: Candidato):    
    conn = engine.connect()
    sql = "INSERT INTO `candidato`(`cedula`, `nombre`, `apellido`, `genero`, `direccion_domicilio`, `ciudad`, `provincia`, `estado_civil`, `telefono_celular`, `telefono_casa`, `direccion_correo`, `fecha_nacimiento`, `edad`, `nacionalidad`, `status`) VALUES"
    datos = (candidato.cedula,candidato.nombre,candidato.apellido,candidato.genero,candidato.direccion_domicilio,
    candidato.ciudad,candidato.provincia,candidato.estado_civil,candidato.telefono_celular,candidato.telefono_casa,
    candidato.direccion_correo,candidato.fecha_nacimiento,candidato.edad,candidato.nacionalidad,candidato.status)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `candidato` WHERE `cedula` = '"+ str(candidato.cedula)+"'").first()

@user.get("/candidatos/{id}", tags=["candidatos"])
def get_candidato(id: str):
    conn = engine.connect()
    return conn.execute("SELECT * FROM `candidato` WHERE `cedula` = '"+ str(id)+"'").first()

@user.delete("/candidatos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["candidatos"])
def delete_candidato(id: str):
    conn = engine.connect()
    conn.execute("DELETE FROM `candidato` WHERE  cedula = '"+str(id)+"'")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/candidatos/{id}",response_model=Candidato, tags=["candidatos"])
async def update_candidato(id: str, candidato: Candidato):
    conn = engine.connect()
    sql="UPDATE `candidato` SET `cedula`='"+str(candidato.cedula)+"',`nombre`='"+str(candidato.nombre)+"',`apellido`='"+str(candidato.apellido)+"',`genero`='"+str(candidato.genero)+"',`direccion_domicilio`='"+str(candidato.direccion_domicilio)+"',`ciudad`='"+str(candidato.ciudad)+"',`provincia`='"+str(candidato.provincia)+"',`estado_civil`='"+str(candidato.estado_civil)+"',`telefono_celular`='"+str(candidato.telefono_celular)+"',`telefono_casa`='"+str(candidato.telefono_casa)+"',`direccion_correo`='"+str(candidato.direccion_correo)+"',`fecha_nacimiento`='"+str(candidato.fecha_nacimiento)+"',`edad`='"+str(candidato.edad)+"',`nacionalidad`='"+str(candidato.nacionalidad)+"',`status`='"+str(candidato.status)+"' WHERE `cedula` ='"+str(id)+"'"
    conn.execute(sql)
    return get_candidato(candidato.cedula)

#CONSULTA PERSONALES
@user.get("/personales/", tags=["personales"])
def get_personales():
    conn = engine.connect()
    return conn.execute("SELECT * FROM personal;").fetchall()

@user.post("/personales/", tags=["personales"])
def create_personal(personal: Personal):
    conn = engine.connect()
    #password = f.encrypt(usuario.password.encode("utf-8"))
    sql="INSERT INTO `personal`( `id_centro_costo`, `cedula`, `status`, `adendum_contrato`, `id_contrato`, `id_cargo`) VALUES ";
    datos = (personal.id_centro_costo,personal.cedula,personal.status,personal.adendum_contrato,
    personal.id_contrato,personal.id_cargo) 
    sql = sql + str(datos)    
    result = conn.execute(sql)    
    return conn.execute("SELECT * FROM `personal` WHERE  id_personal = "+str(result.lastrowid)).first()

@user.get("/personales/{id}-{id_centro_costo}-{cedula}", tags=["personales"])
def get_personal(id: str, id_centro_costo: str, cedula: str):   
    conn = engine.connect()
    #print("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'")
    return conn.execute("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'").first()

@user.delete("/personales/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["personales"])
def delete_personal(id: str):   
    conn = engine.connect()
    conn.execute("DELETE FROM `personal` WHERE  id_personal = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/personales/{id}-{id_centro_costo}-{cedula}",response_model=Personal, tags=["personales"])
def update_personal(id: str, id_centro_costo: str, cedula: str,personal: Personal):  
    conn = engine.connect()
    sql="UPDATE `personal` SET `id_personal`='"+str(personal.id_personal)+"',`id_centro_costo`='"+str(personal.id_centro_costo)+"',`cedula`='"+str(personal.cedula)+"',`status`='"+str(personal.status)+"',`adendum_contrato`='"+str(personal.adendum_contrato)+"',`id_contrato`='"+str(personal.id_contrato)+"',`id_cargo`='"+str(personal.id_cargo)+"' WHERE `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'" 
    conn.execute(sql)
    return get_personal(personal.id_personal,personal.id_centro_costo,personal.cedula)

#CONSULTA CARGOS
@user.get("/cargos/", tags=["cargos"])
def get_cargos():
    conn = engine.connect()
    return conn.execute("SELECT * FROM cargo;").fetchall()

@user.post("/cargos/", tags=["cargos"])
def create_cargo(cargo: Cargo):
    conn = engine.connect()
    #password = f.encrypt(usuario.password.encode("utf-8"))
    sql = "INSERT INTO `cargo`(`id_cargo`, `nombre_cargo`) VALUES"
    datos = (cargo.id_cargo,cargo.nombre_cargo) 
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `cargo` WHERE  id_cargo = "+str(cargo.id_cargo)).first()

@user.get("/cargos/{id}", tags=["cargos"])
def get_cargo(id: str):    
    conn = engine.connect()
    return conn.execute("SELECT * FROM `cargo` WHERE  id_cargo = "+str(id)).first()

@user.delete("/cargos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["cargos"])
def delete_cargo(id: str):    
    conn = engine.connect()
    conn.execute("DELETE FROM `cargo` WHERE  id_cargo = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/cargos/{id}",response_model=Cargo, tags=["cargos"])
def update_cargo(id: str, cargo: Cargo):   
    conn = engine.connect()
    sql="UPDATE `cargo` SET `id_cargo`='"+str(cargo.id_cargo)+"',`nombre_cargo`='"+str(cargo.nombre_cargo)+"' WHERE `id_cargo` = '"+str(id)+"'" 
    conn.execute(sql)
    return get_cargo(cargo.id_cargo)

#CONSULTA VIAJE
@user.get("/viaje/", tags=["viaje"])
def get_viaje():
    conn = engine.connect()
    return conn.execute("SELECT * FROM viaje;").fetchall()

@user.post("/viaje/", tags=["viaje"])
def create_viaje(viaje: Viaje):
    
    conn = engine.connect()
    #password = f.encrypt(usuario.password.encode("utf-8"))
    sql = "INSERT INTO `viaje`(`id_personal`, `lugar`, `fecha_reembolso`, `fecha_viaje_inicio`, `fecha_viaje_fin`, `duracion`, `punto_partida`, `punto_destino`, `fecha_gasto`, `moneda`, `cantidad_comprobantes`, `importe`, `status`, `peticion`, `motivo`) VALUES"
    datos = (viaje.id_personal,viaje.lugar, viaje.fecha_reembolso, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin,viaje.duracion,
             viaje.punto_partida,viaje.punto_destino,viaje.fecha_gasto,viaje.moneda,viaje.cantidad_comprobantes,viaje.importe,
             viaje.status,viaje.peticion,viaje.motivo) 
    sql = sql + str(datos)
    print(sql)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `viaje` WHERE  id_viaje = "+str(result.lastrowid)).first()

@user.get("/viaje/{id}", tags=["viaje"])
def get_viaje(id: str):    
    conn = engine.connect()
    return conn.execute("SELECT * FROM `viaje` WHERE  id_viaje = "+str(id)).first()

@user.delete("/viaje/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["viaje"])
def delete_viaje(id: str):    
    conn = engine.connect()
    conn.execute("DELETE FROM `viaje` WHERE  id_viaje = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/viaje/{id}",response_model=Viaje, tags=["viaje"])
def update_viaje(id: str, viaje: Viaje):   
    conn = engine.connect()
    sql="UPDATE `viaje` SET`id_personal`='"+str(viaje.id_personal)+"',`lugar`='"+str(viaje.lugar)+"',`fecha_reembolso`='"+str(viaje.fecha_reembolso)+"',`fecha_viaje_inicio`='"+str(viaje.fecha_viaje_inicio)+"',`fecha_viaje_fin`='"+str(viaje.fecha_viaje_fin)+"',`duracion`='"+str(viaje.duracion)+"',`punto_partida`='"+str(viaje.punto_partida)+"',`punto_destino`='"+str(viaje.punto_destino)+"',`fecha_gasto`='"+str(viaje.fecha_gasto)+"',`moneda`='"+str(viaje.moneda)+"',`cantidad_comprobantes`='"+str(viaje.cantidad_comprobantes)+"',`importe`='"+str(viaje.importe)+"',`status`='"+str(viaje.status)+"',`peticion`='"+str(viaje.peticion)+"',`motivo`='"+str(viaje.motivo)+"' WHERE `id_viaje` = '"+str(id)+"';" 
    conn.execute(sql)
    return get_viaje(id)

@user.get("/dataHistoricaViajePersonabyUserAndPass/{user}_{passw}",tags=['viaje'])
def get_dataHistoricaViajePersonabyUserAndPass(user: str, passw:str): 
    print("user:",user,"\npassw:",passw)
    conn = engine.connect()
    sql="SELECT viaje.id_viaje, viaje.lugar, viaje.fecha_reembolso,candidato.nombre, candidato.cedula, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin, viaje.duracion, viaje.punto_partida, viaje.punto_destino, viaje.fecha_gasto, viaje.moneda, viaje.cantidad_comprobantes, viaje.importe, viaje.status, viaje.motivo FROM viaje, personal,candidato, usuario WHERE candidato.cedula = personal.cedula AND viaje.id_personal = personal.id_personal AND personal.cedula = usuario.cedula AND viaje.id_personal = (SELECT personal.id_personal FROM personal WHERE personal.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario.usuario = '"+str(user)+"' AND usuario.password = '"+str(passw)+"'));"
    print(sql)
    return conn.execute(sql).fetchall()

@user.get("/dataHistoricaViajePersonal/",tags=['viaje'])
def get_dataHistoricaViajePersonal(): 
    conn = engine.connect()
    sql="SELECT viaje.id_viaje, viaje.lugar, viaje.fecha_reembolso,candidato.nombre, candidato.apellido, candidato.cedula, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin, viaje.duracion, viaje.punto_partida, viaje.punto_destino, viaje.fecha_gasto, viaje.moneda, viaje.cantidad_comprobantes, viaje.importe, viaje.status, viaje.motivo, viaje.fecha_respuesta FROM viaje, personal,candidato, usuario WHERE candidato.cedula = personal.cedula AND viaje.id_personal = personal.id_personal AND personal.cedula = usuario.cedula;"
    print(sql)
    return conn.execute(sql).fetchall()

@user.get("/comprobarViajesRegistradasByUserPasswordFechas/{user}_{pass}_{fecha1}_{fecha2}", tags=["viaje"])
def get_viajesRegistradasByUserPasswordFechas(user: str, passw: str, fecha1: str, fecha2 :str):
    conn = engine.connect()
    sql = ("SELECT SUM(CASE WHEN (CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_inicio AS DATE)   AND   CAST(viaje.fecha_viaje_inicio AS DATE) = CAST('"+str(fecha2)+"' AS DATE))  THEN '0'  WHEN  CAST(viaje.fecha_viaje_fin AS DATE) = CAST('"+str(fecha1)+"' AS DATE)  AND  CAST(viaje.fecha_viaje_fin AS DATE) < CAST('"+str(fecha2)+"' AS DATE)  THEN '0'  WHEN  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE)  < CAST(viaje.fecha_viaje_fin AS DATE) AND CAST('"+str(fecha2)+"' AS DATE)  > CAST(viaje.fecha_viaje_inicio AS DATE)  THEN '1'  WHEN  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE)  > CAST(viaje.fecha_viaje_fin AS DATE) AND CAST('"+str(fecha2)+"' AS DATE)  > CAST(viaje.fecha_viaje_inicio AS DATE)  THEN '2'	WHEN  CAST(viaje.fecha_viaje_inicio AS DATE) = CAST('"+str(fecha1)+"' AS DATE)  AND  CAST(viaje.fecha_viaje_fin AS DATE) > CAST('"+str(fecha2)+"' AS DATE)  AND  CAST(viaje.fecha_viaje_inicio AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '3' WHEN  CAST('"+str(fecha1)+"' AS DATE) > CAST(viaje.fecha_viaje_inicio AS DATE)  AND CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE) AND  CAST(viaje.fecha_viaje_fin AS DATE) = CAST('"+str(fecha2)+"' AS DATE)  THEN '4' WHEN  CAST('"+str(fecha1)+"' AS DATE) = CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE) > CAST(viaje.fecha_viaje_fin AS DATE) THEN '5' WHEN  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE) = CAST(viaje.fecha_viaje_fin AS DATE) THEN '6' WHEN  CAST('"+str(fecha1)+"' AS DATE) > CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE)  AND CAST('"+str(fecha2)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE)  AND CAST('"+str(fecha2)+"' AS DATE) > CAST(viaje.fecha_viaje_inicio AS DATE) THEN '7' WHEN  CAST('"+str(fecha1)+"' AS DATE) = CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE) = CAST(viaje.fecha_viaje_fin AS DATE) THEN '8' ELSE '0'  END) AS FECHAS_CAL  FROM `viaje`  WHERE viaje.id_personal = (SELECT id_personal     FROM personal     WHERE cedula = (SELECT cedula   FROM usuario   WHERE usuario = '"+str(user)+"'   AND password = '"+str(passw)+"'));")
    print(sql)
    return conn.execute(sql).first()

@user.get('/viajesAReasignarByUserPasswordFechas/{user}_{pass}_{fecha1}_{fecha2}',tags=["viaje"])
def get_viajesAReasignarByUserPasswordFechas(user: str, passw: str, fecha1: str, fecha2 : str):
    conn = engine.connect()
    sql = ("(SELECT viaje.id_viaje, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin  FROM `viaje`  WHERE viaje.id_personal = (SELECT id_personal     FROM personal     WHERE cedula = (SELECT cedula   FROM usuario   WHERE usuario = '"+str(user)+"'   AND password = '"+str(passw)+"')) AND (CASE WHEN (CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_inicio AS DATE)   AND   CAST(viaje.fecha_viaje_inicio AS DATE) = CAST('"+str(fecha2)+"' AS DATE))  THEN '0'  WHEN  CAST(viaje.fecha_viaje_fin AS DATE) = CAST('"+str(fecha1)+"' AS DATE)  AND  CAST(viaje.fecha_viaje_fin AS DATE) < CAST('"+str(fecha2)+"' AS DATE)  THEN '0'  WHEN  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_inicio AS DATE) AND  CAST('"+str(fecha2)+"' AS DATE)  < CAST(viaje.fecha_viaje_fin AS DATE) AND CAST('"+str(fecha2)+"' AS DATE)  > CAST(viaje.fecha_viaje_inicio AS DATE)  THEN '1'  WHEN  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE)  > CAST(viaje.fecha_viaje_fin AS DATE) AND CAST('"+str(fecha2)+"' AS DATE)  > CAST(viaje.fecha_viaje_inicio AS DATE)  THEN '2'WHEN  CAST(viaje.fecha_viaje_inicio AS DATE) = CAST('"+str(fecha1)+"' AS DATE)  AND  CAST(viaje.fecha_viaje_fin AS DATE) > CAST('"+str(fecha2)+"' AS DATE)  AND  CAST(viaje.fecha_viaje_inicio AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '3' WHEN  CAST('"+str(fecha1)+"' AS DATE) > CAST(viaje.fecha_viaje_inicio AS DATE)  AND CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE) AND  CAST(viaje.fecha_viaje_fin AS DATE) = CAST('"+str(fecha2)+"' AS DATE)  THEN '4' WHEN  CAST('"+str(fecha1)+"' AS DATE) = CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE) > CAST(viaje.fecha_viaje_fin AS DATE) THEN '5' WHEN  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE) = CAST(viaje.fecha_viaje_fin AS DATE) THEN '6' WHEN  CAST('"+str(fecha1)+"' AS DATE) > CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha1)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE)  AND CAST('"+str(fecha2)+"' AS DATE) < CAST(viaje.fecha_viaje_fin AS DATE)  AND CAST('"+str(fecha2)+"' AS DATE) > CAST(viaje.fecha_viaje_inicio AS DATE) THEN '7' WHEN  CAST('"+str(fecha1)+"' AS DATE) = CAST(viaje.fecha_viaje_inicio AS DATE)  AND  CAST('"+str(fecha2)+"' AS DATE) = CAST(viaje.fecha_viaje_fin AS DATE) THEN '8' ELSE '0'  END) >0);")
    print(sql)
    return conn.execute(sql).fetchall()


@user.post("/uploadFile/{name}")
async def upload_file(name: str,file: UploadFile = File(...) ):
    save_path = os.path.join("C:/comprobantes/", name)
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"filename": file.filename, "saved_path": save_path}

@user.post("/uploadFile/")
async def upload_file(file: UploadFile = File(...) ):
    save_path = os.path.join("C:/comprobantes/", file.filename)
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"filename": file.filename, "saved_path": save_path}

@user.get("/download-excel-FormatoReembolso/")
async def download_excel():
    file_path = r"C:\comprobantes\formatos\Formato Reembolso de Gastos viaje.xlsx"
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename="Formato Reembolso de Gastos viaje.xlsx")
    else:
        return {"message": "El archivo no existe"}

@user.get("/download-zip/{nombre}", tags=["comprobante"])
async def download_zip(nombre: str):
    base_path = r"C:\comprobantes"  # Ruta base de los archivos
    file_path = os.path.join(base_path, nombre)  # Unir la ruta base con el nombre del archivo

    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename=nombre)
    else:
        return {"message": "El archivo no existe"}

@user.get("/nombreRutaComprobanteByIdViaje/{id}", tags=["comprobante"])
def get_nombreRutaComprobanteByIdViaje(id: str):
    conn = engine.connect()   
    sql = "SELECT comprobante.ruta_zip FROM comprobante WHERE comprobante.id_viaje = '"+str(id)+"';"
    print("sql:\n",sql)
    return conn.execute(sql).first()

#CONSULTA DETALLE COMPROBANTE
@user.get("/detalle_comprobanteByIdComprobante/{id}", tags=["detalle_comprobante"])
def get_detalle_comprobanteByIdComprobante(id: str):
    conn = engine.connect()   
    sql = "SELECT * FROM detalle_comprobante WHERE detalle_comprobante.id_comprobante = (SELECT comprobante.id_comprobante FROM comprobante WHERE comprobante.id_viaje = (SELECT viaje.id_viaje FROM viaje WHERE viaje.id_viaje = '"+str(id)+"'))"
    print("sql:\n",sql)
    return conn.execute(sql).fetchall()

@user.post("/detalle_comprobante/", tags=["detalle_comprobante"])
def create_detalle_comprobante(detalle_Comprobante: Detalle_Comprobante):
    conn = engine.connect()   
    sql = "INSERT INTO `detalle_comprobante`( `id_comprobante`, `tipo`, `ruc_cedula`, `razon_social`, `n_documento`, `fecha_emision`, `base_imponible`, `cero_base_imponible`, `iva`, `servicio10`, `importe_sin_facturas`) VALUES"
    datos = (detalle_Comprobante.id_comprobante, detalle_Comprobante.tipo,detalle_Comprobante.ruc_cedula,
             detalle_Comprobante.razon_social,detalle_Comprobante.n_documento,detalle_Comprobante.fecha_emision,
             detalle_Comprobante.base_imponible,detalle_Comprobante.cero_base_imponible,detalle_Comprobante.iva,
             detalle_Comprobante.servicio10,detalle_Comprobante.importe_sin_facturas
             ) 
    sql = sql + str(datos)
    result = conn.execute(sql)   
    print("sql:\n",sql)
    return conn.execute("SELECT * FROM `detalle_comprobante` WHERE  id_detalle_comprobante = "+str(result.lastrowid)).first()

#CONSULTA COMPROBANTE
@user.post("/comprobante/", tags=["comprobante"])
def create_comprobante(comprobante: Comprobante):
    conn = engine.connect()   
    sql = "INSERT INTO `comprobante`(`id_viaje`, `ruta_zip`) VALUES"
    datos = (comprobante.id_viaje, "C:/comprobantes/"+comprobante.ruta_zip) 
    sql = sql + str(datos)
    result = conn.execute(sql)   
    return conn.execute("SELECT * FROM `comprobante` WHERE  id_comprobante = "+str(result.lastrowid)).first()

@user.get("/comprobante/{id}", tags=["comprobante"])
def get_comprobante(id: str):    
    conn = engine.connect()   
    return conn.execute("SELECT * FROM `comprobante` WHERE  id_comprobante = "+str(id)).first()

@user.delete("/comprobante/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["comprobante"])
def delete_comprobante(id: str):    
    conn = engine.connect()    
    conn.execute("DELETE FROM `comprobante` WHERE  id_comprobante = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/comprobante/{id}",response_model=Comprobante, tags=["comprobante"])
def update_comprobante(id: str, comprobante: Comprobante):   
    conn = engine.connect()
    sql="UPDATE `comprobante` SET `id_viaje`='"+str(comprobante.id_viaje)+"',`ruta_zip`='"+str(comprobante.ruta_zip)+"' WHERE `id_comprobante` = "+str(id)+";" 
    conn.execute(sql)
    return get_comprobante(id)

#Consultas sistema Salesland

@user.get("/personalesDeTiendas/", tags=["consulta"])
async def get_personalesDeTiendas():
    conn = engine.connect()
    return conn.execute("SELECT personal.id_personal, centro_costo.id_centro_costo, centro_costo.nombre_centro, centro_costo.cuenta, candidato.cedula, candidato.nombre, candidato.apellido, candidato.status, candidato.ciudad FROM candidato, centro_costo, personal WHERE personal.cedula = candidato.cedula AND personal.id_centro_costo = centro_costo.id_centro_costo;").fetchall()

@user.get("/personalesDeTiendasByParameter/{id}", tags=["consulta"])
async def get_personalesDeTiendas(id:str):
    conn = engine.connect()
    return conn.execute(select([personales.c.id_personal,centro_costos.c.id_centro_costo,centro_costos.c.nombre_centro,
        centro_costos.c.cuenta,
          candidatos.c.cedula,candidatos.c.nombre,candidatos.c.apellido, candidatos.c.status,
            candidatos.c.ciudad]).where(personales.c.cedula==candidatos.c.cedula,
            centro_costos.c.id_centro_costo==personales.c.id_centro_costo).order_by(str(id))).fetchall()

@user.get("/nombresTablas/", tags=["consulta"])
async def get_Tablas():
    conn = engine.connect()
    return conn.execute("SHOW TABLES FROM salesland;").fetchall()

@user.get("/consultaDinamica/{varConsul}-{varOrd}", tags=["consulta"])
async def get_Tablas(varConsul : str, varOrd : str ):
    conn = engine.connect()
    sql="SELECT * FROM "+varConsul
    sql2=" WHERE "
    print(sql)    
    return conn.execute(sql+";").fetchall()  
    #return None  

#CONSULTA VACACIONES

@user.get("/nombreUsuarioByUser_Pass/{user}-{pass}", tags=["usuarios"])
def get_NombresPuntosVentas(user: str, passw: str):
    conn = engine.connect()
    return conn.execute("SELECT usuario FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.get("/fechaInicioContratoByCedula/{ced}", tags=["contratos"])
def get_fechaInicioContratoByCedula(ced: str):
    conn = engine.connect()
    sql = "SELECT contrato.fecha_inicio_contrato as fechaContrato FROM contrato, personal, usuario WHERE personal.id_contrato = contrato.id_contrato and usuario.cedula = personal.cedula and usuario.cedula = '"+str(ced)+"' LIMIT 1;"
    print(sql)
    return conn.execute(sql).first()

@user.get("/cedByPassAndUSer/{user}-{pass}", tags=["usuarios"])
def get_cedByPassAndUSer(user: str, passw: str):
    conn = engine.connect()
    return conn.execute("SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"' LIMIT 1;").first()

@user.get("/idpersonalByPassAndUSer/{user}-{pass}", tags=["personales"])
def get_idpersonalByPassAndUSer(user: str, passw: str):
    conn = engine.connect()
    return conn.execute("SELECT id_personal from personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"') LIMIT 1;").first()

@user.get("/totalVacacionesTomadas/{user}-{pass}", tags=["vacaciones"])
def get_totalVacacionesTomadas(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT SUM(vacaciones.dias_lab_solicitados) AS VACA_PREV FROM vacaciones WHERE id_personal = (select id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND vacaciones.status = 'aprobada' LIMIT 1;"
    print(sql)
    return conn.execute(sql).first()

@user.get("/totalVacacionesTomadasPendientes/{user}-{pass}", tags=["vacaciones"])
def get_totalVacacionesTomadas(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT SUM(vacaciones.dias_lab_solicitados) AS VACA_PREV FROM vacaciones WHERE id_personal = (select id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND vacaciones.status = 'pendiente' LIMIT 1;"
    return conn.execute(sql).first()

@user.post("/vacation2/", tags=["vacaciones"])
def create_vacation2(vacacion : Vacacion ):    
    conn = engine.connect()
    sql = "INSERT INTO `vacaciones`(`id_personal`, `fecha_solicitud`, `fecha_inicio_vacaciones`, `fecha_fin_vacaciones`, `dias_lab_solicitados`, `dias_disponibles_acum`, `saldo_dias_vacaciones`, `status`,`peticion`, `observaciones`,`motivo`) VALUES"
    datos = (vacacion.id_personal,vacacion.fecha_solicitud,vacacion.fecha_inicio_vacaciones,vacacion.fecha_fin_vacaciones,
             vacacion.dias_lab_solicitados,vacacion.dias_disponibles_acum,vacacion.saldo_dias_vacaciones,vacacion.status, vacacion.peticion, vacacion.observaciones, vacacion.motivo) 
    sql = sql + str(datos) 
    print(sql);
    result = conn.execute(sql)
    return conn.execute(vacaciones.select().where(vacaciones.c.id_vacaciones == result.lastrowid)).first() 


@user.get("/vacacionesPersonal/", tags=["vacaciones"])
def get_vacacionesPersonal():
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.saldo_dias_vacaciones, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo, centro_costo.nombre_centro, centro_costo.tienda FROM candidato, vacaciones, personal, usuario, centro_costo WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND centro_costo.id_centro_costo = personal.id_centro_costo ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalPendientes/", tags=["vacaciones"])
def get_vacacionesPersonalPendientes():
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula  AND ((vacaciones.peticion = 'aprobacion' AND vacaciones.status = 'pendiente')  OR (vacaciones.peticion = 'cancelacion' AND vacaciones.status = 'pendiente')) AND  vacaciones.status!='eliminada' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalPendientesAprobacion/", tags=["vacaciones"])
def get_vacacionesPersonalPendientesAprobacion():
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.status = 'pendiente' AND  vacaciones.peticion = 'aprobacion' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalPendientesCancelacion/", tags=["vacaciones"])
def get_vacacionesPersonalPendientesCancelacion():
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.status = 'pendiente' AND vacaciones.peticion = 'cancelacion' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalAprobadas/", tags=["vacaciones"])
def get_vacacionesPersonalAprobadas():
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.status = 'aprobada' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalNegadas/", tags=["vacaciones"])
def get_vacacionesPersonalNegadas():
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.status = 'negada' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalBySupervisor/{user}-{pass}", tags=["supervisor"])
def get_vacacionesPersonalBySupervisor(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.saldo_dias_vacaciones, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo, centro_costo.nombre_centro, centro_costo.tienda FROM candidato, vacaciones, personal, usuario, centro_costo WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND personal.id_supervisor = (SELECT supervisor.id_supervisor FROM supervisor WHERE supervisor.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND  vacaciones.status!='eliminada' AND centro_costo.id_centro_costo = personal.id_centro_costo ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalPendientesBySupervisor/{user}-{pass}", tags=["supervisor"])
def get_vacacionesPersonalPendientesBySupervisor(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND (vacaciones.peticion = 'aprobacion'  OR vacaciones.peticion = 'cancelacion') AND vacaciones.status = 'pendiente' AND personal.id_supervisor = (SELECT supervisor.id_supervisor FROM supervisor WHERE supervisor.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalPendientesAprobacionBySupervisor/{user}-{pass}", tags=["supervisor"])
def get_vacacionesPersonalPendientesAprobacionBySupervisor(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.peticion = 'aprobacion' AND vacaciones.status = 'pendiente' AND personal.id_supervisor = (SELECT supervisor.id_supervisor FROM supervisor WHERE supervisor.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalPendientesCancelacionBySupervisor/{user}-{pass}", tags=["supervisor"])
def get_vacacionesPersonalPendientesCancelacionBySupervisor(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.peticion = 'cancelacion' AND vacaciones.status = 'pendiente' AND personal.id_supervisor = (SELECT supervisor.id_supervisor FROM supervisor WHERE supervisor.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalAprobadasBySupervisor/{user}-{pass}", tags=["supervisor"])
def get_vacacionesPersonalAprobadasBySupervisor(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND vacaciones.status = 'aprobada' AND personal.id_supervisor = (SELECT supervisor.id_supervisor FROM supervisor WHERE supervisor.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesPersonalNegadasBySupervisor/{user}-{pass}", tags=["supervisor"])
def get_vacacionesPersonalNegadasBySupervisor(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula AND (vacaciones.status = 'negada' OR vacaciones.status = 'cancelada') AND personal.id_supervisor = (SELECT supervisor.id_supervisor FROM supervisor WHERE supervisor.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesByUserAndPass/{user}-{pass}", tags=["vacaciones"])
def get_vacacionesByUserAndPass(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.status, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula and usuario.usuario = '"+str(user)+"' and usuario.password = '"+str(passw)+"' AND  vacaciones.status!='eliminada' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesByUserAndPassPendientes/{user}-{pass}", tags=["vacaciones"])
def get_vacacionesByUserAndPassPendientes(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula AND usuario.usuario = '"+str(user)+"' AND usuario.password = '"+str(passw)+"' AND vacaciones.status = 'pendiente'  AND ( vacaciones.peticion = 'aprobacion' OR vacaciones.peticion = 'cancelacion') ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesByUserAndPassPendientesAprobacion/{user}-{pass}", tags=["vacaciones"])
def get_vacacionesByUserAndPassPendientesAprobacion(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula and usuario.usuario = '"+str(user)+"' and usuario.password = '"+str(passw)+"' AND vacaciones.peticion = 'aprobacion' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesByUserAndPassPendientesCancelacion/{user}-{pass}", tags=["vacaciones"])
def get_vacacionesByUserAndPassPendientesCancelacion(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula and usuario.usuario = '"+str(user)+"' and usuario.password = '"+str(passw)+"' AND vacaciones.peticion = 'cancelacion' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesByUserAndPassAprobadas/{user}-{pass}", tags=["vacaciones"])
def get_vacacionesByUserAndPassAprobadas(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula and usuario.usuario = '"+str(user)+"' and usuario.password = '"+str(passw)+"' AND vacaciones.status = 'aprobada' ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get("/vacacionesByUserAndPassNegadas/{user}-{pass}", tags=["vacaciones"])
def get_vacacionesByUserAndPassNegadas(user: str, passw: str):
    conn = engine.connect()
    sql = "SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula and usuario.usuario = '"+str(user)+"' and usuario.password = '"+str(passw)+"' AND (vacaciones.status = 'negada' OR vacaciones.status = 'cancelada') ORDER BY vacaciones.fecha_solicitud DESC;"
    #print(sql)
    return conn.execute(sql).fetchall()

@user.delete("/vacaciones/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["candidatos"])
def delete_candidato(id: str):
    conn = engine.connect()
    conn.execute("DELETE FROM `vacaciones` WHERE  id_vacaciones = '"+str(id)+"'")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.get("/comprobarUnicaSolicitudPendiente/{user}_{pass}", tags=["vacaciones"])
def get_comprobarUnicaSolicitudPendiente(user: str, passw: str):
    conn = engine.connect()
    sql = ("SELECT COUNT(*) as n_solici_pendientes  FROM vacaciones WHERE vacaciones.status = 'pendiente' AND vacaciones.id_personal = (SELECT personal.id_personal FROM personal WHERE personal.cedula= (SELECT usuario.cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"'));")
    #print(sql)
    return conn.execute(sql).first()

@user.get("/comprobarVacacionesRegistradasByUserPassword/{user}_{pass}_{fecha}", tags=["vacaciones"])
def get_vacacionesregistradasByUserPassword(user: str, passw: str, fecha: str):
    conn = engine.connect()
    sql = ("SELECT SUM(CASE WHEN (CAST('"+str(fecha)+"' AS DATE) > CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE)) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) THEN '2' WHEN CAST('"+str(fecha)+"' AS DATE) < CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '3' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '4' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '5' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '6' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE) THEN '7' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE) THEN '8' WHEN CAST(fecha_inicio_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) THEN '9' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '10' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '11' ELSE '0' END) AS FECHAS_CAL FROM `vacaciones` WHERE id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND (vacaciones.status = 'pendiente' OR vacaciones.status = 'aprobada');")
    #print(sql)
    return conn.execute(sql).first()

@user.get('/vacacionesAReasignarByUserPassword/{user}_{pass}_{fecha}',tags=["vacaciones"])
def get_vacacionesAReasignarByUserPassword(user: str, passw: str, fecha: str):
    conn = engine.connect()
    sql = "SELECT id_vacaciones FROM `vacaciones` WHERE 0 NOT IN (CASE WHEN (CAST('"+str(fecha)+"' AS DATE) > CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE)) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) THEN '2' WHEN CAST('"+str(fecha)+"' AS DATE) < CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '3' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '4' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '5' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '6' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE) THEN '7' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE) THEN '8' WHEN CAST(fecha_inicio_vacaciones AS DATE) > CAST('"+str(fecha)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha)+"' AS DATE) THEN '9' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '10' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha)+"' AS DATE) THEN '11' ELSE '0' END) AND (vacaciones.status = 'pendiente' OR vacaciones.status = 'aprobada'); "
    #print(sql)
    return conn.execute(sql).fetchall()

@user.get('/vacacionesDiasAprobadosById/{id}',tags=["vacaciones"])
def get_vacacionesDiasAprobadosById(id: str):
    conn = engine.connect()
    sql = "SELECT SUM(vacaciones.dias_lab_solicitados) as tot_dias_aprobados FROM `vacaciones` WHERE vacaciones.status = 'aprobada' AND id_personal = (SELECT vacaciones.id_personal FROM `vacaciones` WHERE vacaciones.id_vacaciones = '"+str(id)+"');"
    print(sql)
    return conn.execute(sql).first()

@user.get('/vacacionesFechaInicioAndFin/{idVacacion}',tags=["vacaciones"])
def get_vacacionesFechaInicioAndFin(idVacacion: str):
    conn = engine.connect()
    return conn.execute("SELECT fecha_inicio_vacaciones, fecha_fin_vacaciones FROM vacaciones WHERE id_vacaciones = '"+str(idVacacion)+"';").first()

@user.get("/comprobarVacacionesRegistradasByUserPasswordFechas/{user}_{pass}_{fecha1}_{fecha2}", tags=["vacaciones"])
def get_VacacionesRegistradasByUserPasswordFechas(user: str, passw: str, fecha1: str, fecha2 :str):
    conn = engine.connect()
    sql = ("SELECT SUM(CASE WHEN (CAST('"+str(fecha1)+"' AS DATE) > CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha2)+"' AS DATE)) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '2' WHEN CAST('"+str(fecha1)+"' AS DATE) < CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '3' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '4' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) THEN '5' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '6' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha2)+"' AS DATE) THEN '7' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha1)+"' AS DATE) THEN '8' WHEN CAST(fecha_inicio_vacaciones AS DATE) > CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '9' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) THEN '10' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '11' ELSE '0' END) AS FECHAS_CAL FROM `vacaciones` WHERE id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND (vacaciones.status = 'pendiente' OR vacaciones.status = 'aprobada'); ")
    print(sql)
    return conn.execute(sql).first()

@user.get('/vacacionesAReasignarByUserPasswordFechas/{user}_{pass}_{fecha1}_{fecha2}',tags=["vacaciones"])
def get_vacacionesAReasignarByUserPasswordFechas(user: str, passw: str, fecha1: str, fecha2 : str):
    conn = engine.connect()
    sql = ("SELECT id_vacaciones FROM `vacaciones`  WHERE 1 IN (CASE WHEN (CAST('"+str(fecha1)+"' AS DATE) > CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha2)+"' AS DATE)) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST('"+str(fecha1)+"' AS DATE) < CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) THEN '1' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha1)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) > CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' ELSE '0' END) AND id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula  FROM usuario  WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND (vacaciones.status = 'pendiente' OR vacaciones.status = 'aprobada');; ")
    print(sql)
    return conn.execute(sql).fetchall()

@user.get('/vacacionesAReasignarByUserPasswordFechasInfo/{user}_{pass}_{fecha1}_{fecha2}',tags=["vacaciones"])
def get_vacacionesAReasignarByUserPasswordFechasInfo(user: str, passw: str, fecha1: str, fecha2 : str):
    conn = engine.connect()
    sql = ("SELECT  id_vacaciones, fecha_inicio_vacaciones, fecha_fin_vacaciones FROM `vacaciones`  WHERE 1 IN (CASE WHEN (CAST('"+str(fecha1)+"' AS DATE) > CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha2)+"' AS DATE)) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST('"+str(fecha1)+"' AS DATE) < CAST(fecha_inicio_vacaciones AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) THEN '1' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) < CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) > CAST('"+str(fecha1)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) > CAST('"+str(fecha1)+"' AS DATE) AND CAST(fecha_fin_vacaciones AS DATE) < CAST('"+str(fecha2)+"' AS DATE) THEN '1' WHEN CAST(fecha_fin_vacaciones AS DATE) = CAST('"+str(fecha1)+"' AS DATE) THEN '1' WHEN CAST(fecha_inicio_vacaciones AS DATE) = CAST('"+str(fecha2)+"' AS DATE) THEN '1' ELSE '0' END) AND id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula  FROM usuario  WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) AND (vacaciones.status = 'pendiente' OR vacaciones.status = 'aprobada'); ")
    return conn.execute(sql).fetchall()

@user.get('/vacacionesById/{id}',tags=["vacaciones"])
def vacacionesById(id : str):
    conn = engine.connect()
    sql = ("SELECT vacaciones.id_vacaciones,candidato.nombre,candidato.apellido, vacaciones.id_personal, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.fecha_respuesta, vacaciones.dias_disponibles_acum, vacaciones.saldo_dias_vacaciones, vacaciones.dias_lab_solicitados, vacaciones.status, vacaciones.peticion, vacaciones.observaciones, vacaciones.motivo FROM vacaciones,personal, candidato WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND id_vacaciones = '"+str(id)+"';")
    return conn.execute(sql).first()

@user.get('/vacacionesByIdFormat/{id}',tags=["vacaciones"])
def get_vacacionesByIdFormat(id : str):
    conn = engine.connect()
    sql = ("SELECT * FROM vacaciones,personal, candidato WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND id_vacaciones = '"+str(id)+"';")
    return conn.execute(sql).first()

@user.put("/vacacionesAEliminaryId/{id}",response_model=Vacacion, tags=["vacaciones"])
def update_vacacionesAEliminaryId(id: str,vacacion : Vacacion): 
    conn = engine.connect()
    print("vacacion:",vacacion)
    sql = (vacaciones.update().values(
            fecha_respuesta=vacacion.fecha_respuesta,
            status=vacacion.status,
            peticion=vacacion.peticion,
            observaciones=vacacion.observaciones
    ).where(vacaciones.c.id_vacaciones == id))
    print("vacacionesAEliminaryId:",sql)
    conn.execute(sql)
    return get_vacacionesByIdFormat(id)

@user.put("/vacacionesACancelarbyId/{id}",response_model=Vacacion, tags=["vacaciones"])
def update_vacacionesACancelarbyId(id: str,vacacion : Vacacion):   
    #sql="UPDATE `vacaciones` SET `status`='pendiente-cancelacion',`observaciones`='"+str(observaciones)+"' WHERE  id_vacaciones = '"+str(id)+"';" 
    #conn.execute(sql)
    conn = engine.connect()
    print("vacacion:",vacacion)
    sql = (vacaciones.update().values(
            fecha_respuesta=vacacion.fecha_respuesta,
            status=vacacion.status,
            peticion=vacacion.peticion,
            observaciones=vacacion.observaciones
    ).where(vacaciones.c.id_vacaciones == id))
    print("vacacionesACancelarbyId:",sql)
    conn.execute(sql)
    return get_vacacionesByIdFormat(id)

@user.put("/vacacionesAAprobarbyId/{id}",response_model=Vacacion, tags=["vacaciones"])
def update_vacacionesAAprobarbyId(id: str,vacacion : Vacacion):   
    #sql="UPDATE `vacaciones` SET `status`='pendiente-cancelacion',`observaciones`='"+str(observaciones)+"' WHERE  id_vacaciones = '"+str(id)+"';" 
    #conn.execute(sql)
    conn = engine.connect()
    print("\nvacacion:",vacacion)        
    if(get_vacacionesDiasAprobadosById(str(id))[0] != None):
        totalDiasApr = get_vacacionesDiasAprobadosById(str(id))[0]
    else:
        totalDiasApr = 0
    print("\ntotalDiasApr:",totalDiasApr)
    sql = (vacaciones.update().values(
            fecha_respuesta=vacacion.fecha_respuesta,
            status=vacacion.status,
            peticion='aprobacion',
            observaciones=vacacion.observaciones,
            saldo_dias_vacaciones= str((vacacion.dias_disponibles_acum) - (totalDiasApr + vacacion.dias_lab_solicitados))       
            ).where(vacaciones.c.id_vacaciones == id))
    print("vacacionesAAprobarbyId:",sql)    
    conn.execute(sql)
    return get_vacacionesByIdFormat(id)

@user.get('/viajesById/{id}',tags=["viajes"])
def viajesById(id : str):
    conn = engine.connect()
    sql = ("SELECT candidato.nombre,candidato.apellido, viaje.id_viaje, viaje.id_personal, viaje.lugar, viaje.fecha_reembolso, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin, viaje.duracion, viaje.duracion, viaje.punto_partida, viaje.punto_destino, viaje.fecha_gasto, viaje.moneda, viaje.cantidad_comprobantes, viaje.importe, viaje.status, viaje.peticion, viaje.motivo, viaje.fecha_respuesta FROM viaje, personal, candidato WHERE viaje.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND viaje.id_viaje = '"+str(id)+"';")
    return conn.execute(sql).first()

@user.get('/viajesByIdFormat/{id}',tags=["viajes"])
def get_viajesByIdFormat(id : str):
    conn = engine.connect()
    sql = ("SELECT viaje.id_viaje, viaje.lugar, viaje.fecha_reembolso,candidato.nombre, candidato.apellido, candidato.cedula, viaje.fecha_viaje_inicio, viaje.fecha_viaje_fin, viaje.duracion, viaje.punto_partida, viaje.punto_destino, viaje.fecha_gasto, viaje.moneda, viaje.cantidad_comprobantes, viaje.importe, viaje.status, viaje.motivo, viaje.fecha_respuesta FROM viaje, personal,candidato, usuario WHERE candidato.cedula = personal.cedula AND viaje.id_personal = personal.id_personal AND personal.cedula = usuario.cedula AND viaje.id_viaje = '"+str(id)+"';")
    return conn.execute(sql).first()

@user.put("/viajesAAprobarbyId/{id}", tags=["viajes"])
def update_viajesAAprobarbyId(id: str,viaje : Viaje):   
    conn = engine.connect()
    print("\viaje:",viaje) 
    sql = (viajes.update().values(
            fecha_respuesta=viaje.fecha_respuesta,
            status=viaje.status,            
            motivo=viaje.motivo,
            ).where(viajes.c.id_viaje == id))
    print("viajesAAprobarbyId:",sql)    
    conn.execute(sql)
    return get_viajesByIdFormat(id)

@user.put("/negarViajeById/{id}", tags=["viajes"])
def update_negarViajeById(id: str,viaje : Viaje):   
    conn = engine.connect()
    sql = (viajes.update().values(
            fecha_respuesta=viaje.fecha_respuesta,
            status=viaje.status,            
            motivo=viaje.motivo,
    ).where(viajes.c.id_viaje == id))
    print("negarVacacionById:",sql)
    conn.execute(sql)
    return get_viajesByIdFormat(id)

@user.put("/viajeAEliminaryId/{id}", tags=["viajes"])
def update_viajeAEliminaryId(id: str,viaje : Viaje): 
    conn = engine.connect()
    print("vacacion:",viaje)
    sql = (viajes.update().values(
            fecha_respuesta=viaje.fecha_respuesta,
            status=viaje.status,            
            motivo=viaje.motivo,
    ).where(viajes.c.id_viaje == id))
    print("viajeAEliminaryId:",sql)
    conn.execute(sql)
    return get_viajesByIdFormat(id)


@user.put("/aprobarVacacionById/{id}",response_model=Vacacion, tags=["vacaciones"])
def update_aprobarVacacionById(id: str,vacacion : Vacacion):   
    #sql="UPDATE `vacaciones` SET `status`='pendiente-cancelacion',`observaciones`='"+str(observaciones)+"' WHERE  id_vacaciones = '"+str(id)+"';" 
    #conn.execute(sql)
    conn = engine.connect()
    sql = (vacaciones.update().values(
            fecha_respuesta=vacacion.fecha_respuesta,
            status=vacacion.status,
            peticion=vacacion.peticion,
            observaciones=vacacion.observaciones
    ).where(vacaciones.c.id_vacaciones == id))
    print(sql)
    conn.execute("aprobarVacacionById:",sql)
    return get_vacacionesByIdFormat(id)

@user.put("/negarVacacionById/{id}",response_model=Vacacion, tags=["vacaciones"])
def update_negarVacacionById(id: str,vacacion : Vacacion):   
    #sql="UPDATE `vacaciones` SET `status`='pendiente-cancelacion',`observaciones`='"+str(observaciones)+"' WHERE  id_vacaciones = '"+str(id)+"';" 
    #conn.execute(sql)
    conn = engine.connect()
    sql = (vacaciones.update().values(
            fecha_respuesta=vacacion.fecha_respuesta,
            status=vacacion.status,
            peticion=vacacion.peticion,
            observaciones=vacacion.observaciones
    ).where(vacaciones.c.id_vacaciones == id))
    print("negarVacacionById:",sql)
    conn.execute(sql)
    return get_vacacionesByIdFormat(id)

@user.get("/nombreApellidoPersonalByIdVacacion/{id}", tags=["vacaciones"])
def get_nombreApellidoPersonalByIdVacacion(id: str):   
    conn = engine.connect()
    sql="SELECT candidato.nombre, candidato.apellido  FROM vacaciones,personal,candidato WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND vacaciones.id_vacaciones = '"+str(id)+"';"
    return conn.execute(sql).first()

@user.get("/dataReporteEstadistico/{corte}_{actual}",tags=['reporteEstadistico'])
def get_dataReporteEstadistico(corte: str, actual:str): 
    print("corte:",corte,"\nactual",actual)
    conn = engine.connect()
    sql="SELECT ROUND((SELECT SUM(CASE WHEN ((YEAR(CAST( '"+str(corte)+"' AS DATE))-YEAR(fecha_inicio_contrato))*12+(MONTH(CAST( '"+str(corte)+"' AS DATE))-MONTH(fecha_inicio_contrato))+(DAY(CAST( '"+str(corte)+"' AS DATE))-DAY(fecha_inicio_contrato))/30) IS NOT NULL THEN ((YEAR(CAST( '"+str(corte)+"' AS DATE))-YEAR(fecha_inicio_contrato))*12+(MONTH(CAST( '"+str(corte)+"' AS DATE))-MONTH(fecha_inicio_contrato))+(DAY(CAST( '"+str(corte)+"' AS DATE))-DAY(fecha_inicio_contrato))/30) ELSE 0     END) AS ANTIGUEDAD     FROM candidato,contrato, personal      WHERE personal.id_contrato = contrato.id_contrato AND personal.cedula = candidato.cedula),2) AS 'vaca_acum', ROUND((SELECT SUM(CASE  WHEN (SELECT SUM(vacaciones.dias_lab_solicitados)     FROM vacaciones     WHERE vacaciones.status = 'aprobada' AND CAST(vacaciones.fecha_fin_vacaciones AS DATE) < CAST(('"+str(actual)+"') AS DATE)) IS NOT NULL THEN (SELECT SUM(vacaciones.dias_lab_solicitados)     FROM vacaciones     WHERE vacaciones.status = 'aprobada' AND CAST(vacaciones.fecha_fin_vacaciones AS DATE) < CAST(('"+str(actual)+"') AS DATE))     ELSE 0 END)),2)  AS 'vaca_tomadas', ROUND((SELECT SUM(CASE WHEN ((YEAR(CAST( '"+str(corte)+"' AS DATE))-YEAR(fecha_inicio_contrato))*12+(MONTH(CAST( '"+str(corte)+"' AS DATE))-MONTH(fecha_inicio_contrato))+(DAY(CAST( '"+str(corte)+"' AS DATE))-DAY(fecha_inicio_contrato))/30) IS NOT NULL THEN ((YEAR(CAST( '"+str(corte)+"' AS DATE))-YEAR(fecha_inicio_contrato))*12+(MONTH(CAST( '"+str(corte)+"' AS DATE))-MONTH(fecha_inicio_contrato))+(DAY(CAST( '"+str(corte)+"' AS DATE))-DAY(fecha_inicio_contrato))/30) ELSE 0     END) AS ANTIGUEDAD     FROM candidato,contrato, personal      WHERE personal.id_contrato = contrato.id_contrato AND personal.cedula = candidato.cedula)-  (SELECT SUM(CASE  WHEN (SELECT SUM(vacaciones.dias_lab_solicitados)     FROM vacaciones     WHERE vacaciones.status = 'aprobada' AND CAST(vacaciones.fecha_fin_vacaciones AS DATE) < CAST(('"+str(actual)+"') AS DATE)) IS NOT NULL THEN (SELECT  SUM(vacaciones.dias_lab_solicitados)     FROM vacaciones     WHERE vacaciones.status = 'aprobada' AND CAST(vacaciones.fecha_fin_vacaciones AS DATE) < CAST(('"+str(actual)+"') AS DATE))     ELSE 0 END)),2) AS 'dias_dispo', (SELECT  (CASE      WHEN ((SELECT SUM(vacaciones.dias_lab_solicitados) FROM vacaciones  WHERE vacaciones.status = 'aprobada'  AND CAST(vacaciones.fecha_fin_vacaciones AS DATE) > CAST(('"+str(actual)+"') AS DATE))) IS NOT NULL THEN ((SELECT SUM(vacaciones.dias_lab_solicitados) FROM vacaciones  WHERE vacaciones.status = 'aprobada'  AND CAST(vacaciones.fecha_fin_vacaciones AS DATE) > CAST(('"+str(actual)+"') AS DATE)))  ELSE 0  END)) AS 'dias_PorTomar_Apro' "
    print(sql)
    return conn.execute(sql).first()

@user.get("/centroCostoByUserPass/{user}_{passw}",tags=['centro_costos'])
def get_centroCostoByUserPass(user: str, passw:str): 
    print("user:",user,"\pass",passw)
    conn = engine.connect()
    sql="SELECT centro_costo.cuenta FROM centro_costo,personal,usuario WHERE personal.id_centro_costo = centro_costo.id_centro_costo AND usuario.cedula = personal.cedula AND usuario.usuario = '"+str(user)+"' AND password = '"+str(passw)+"';"
    print(sql)
    return conn.execute(sql).first()

@user.get("/idSupervisorByUserAndPass/{user}_{passw}",tags=['supervisor'])
def get_idSupervisorByUserAndPass(user: str, passw:str): 
    print("user:",user,"\passw:",passw)
    conn = engine.connect()
    sql="SELECT supervisor.id_supervisor FROM supervisor WHERE cedula = (SELECT usuario.cedula FROM usuario	WHERE usuario.usuario='"+str(user)+"' AND usuario.password='"+str(passw)+"');"
    print(sql)
    return conn.execute(sql).first()

@user.get("/dataPersonabyUserAndPass/{user}_{passw}",tags=['personales'])
def get_dataPersonabyUserAndPass(user: str, passw:str): 
    print("user:",user,"\npassw:",passw)
    conn = engine.connect()
    sql="SELECT candidato.nombre, candidato.apellido, candidato.cedula, centro_costo.cuenta, cargo.nombre_cargo FROM candidato,centro_costo, personal, usuario, cargo WHERE centro_costo.id_centro_costo = personal.id_centro_costo AND personal.cedula = candidato.cedula AND personal.id_cargo = cargo.id_cargo AND usuario.cedula = personal.cedula AND usuario.usuario = '"+str(user)+"' AND usuario.password = '"+str(passw)+"';"
    print(sql)
    return conn.execute(sql).first()

#Consultas Rol-Pagos

#Encabezado ROl de Pagos segun Usuario
@user.get("/dataRolpago/{user}_{passw}_{anio}_{mes}",tags=['Rol_pago'])
def get_dataRolpago(user: str, passw:str, anio:str, mes:str):
    print("user:",user,"\npassw:",passw,"anio:", anio, "mes:",mes)
    conn = engine.connect()
    sql="SELECT candidato.nombre, candidato.apellido, contrato.fecha_inicio_contrato, cargo.nombre_cargo, candidato.cedula,rol_pagos.sueldo_nominal,rol_pagos.tiempo_parcial,rol_pagos.dias_trabajados,rol_pagos.sueldo_base,rol_pagos.sueldo_vacaciones,rol_pagos.dias_paternidad,rol_pagos.permiso_paternidad,rol_pagos.dias_subsidio_maternidad,rol_pagos.subsidio_maternidad,rol_pagos.dias_enfermedad,rol_pagos.subsidio_enfermedad,rol_pagos.numero_horas_suplementarias,rol_pagos.valor_horas_suplementarias,rol_pagos.numero_horas_extraordinarias,rol_pagos.valor_horas_extraordinarias,rol_pagos.comisiones,rol_pagos.comisiones_mes_anterior,rol_pagos.incentivo_upsell,rol_pagos.movilizacion,rol_pagos.incentivo_dolarazo,rol_pagos.incentivo_alta_gama,rol_pagos.bono_pospago_ruc,rol_pagos.bono_plan_celular,rol_pagos.base_iess,rol_pagos.alimentacion,rol_pagos.decimo_tercero_mensual,rol_pagos.decimo_cuarta_mensual,rol_pagos.fondo_reserva_mensual,rol_pagos.total_ingresos,rol_pagos.aporte_iess,rol_pagos.chargeback_aplicar,rol_pagos.impuesto_renta,rol_pagos.prestamo_hipotecario_iess,rol_pagos.prestamo_quirografario,rol_pagos.prestamo_empresa,rol_pagos.extension_conyugue,rol_pagos.sobregiro,rol_pagos.anticipo_comisiones_mes_anterior,rol_pagos.seguro_movil,rol_pagos.copago_seguro,rol_pagos.total_egresos,rol_pagos.neto_recibir,rol_pagos.provision_decimo_tercer_sueldo,rol_pagos.provision_decimo_cuarto_sueldo,rol_pagos.provision_fondos_reserva,rol_pagos.dias_vacaciones_tomados,rol_pagos.provision_vacaciones,rol_pagos.provision_aporte_iess_patronal,rol_pagos.ccc,rol_pagos.reverso_vacaciones_tomadas,rol_pagos.fecha_rol_pago FROM candidato,personal,contrato,cargo, rol_pagos WHERE personal.id_personal = rol_pagos.id_personal AND personal.cedula = candidato.cedula AND personal.id_contrato = contrato.id_contrato AND personal.id_cargo = cargo.id_cargo AND personal.cedula = (SELECT usuario.cedula FROM usuario WHERE usuario.usuario = '"+str(user)+"' AND usuario.password = '"+str(passw)+"') AND (SELECT YEAR(CAST(rol_pagos.fecha_rol_pago AS DATE))) = '"+str(anio)+"' AND (SELECT MONTH(CAST(rol_pagos.fecha_rol_pago AS DATE))) = '"+str(mes)+"';"
    return conn.execute(sql).first()


@user.get("/dataRolpagoAnioMes/{id}_{anio}_{mes}",tags=['Rol_pago'])
def get_dataRolpagoMesyAnio(id:str, anio:str, mes:str):
    print("anio:", anio, "mes:",mes)
    conn = engine.connect()
    sql="SELECT SUM(CASE WHEN YEAR(CAST(rol_pagos.fecha_rol_pago AS DATE)) = '"+str(anio)+"' AND MONTH(CAST(rol_pagos.fecha_rol_pago AS DATE)) = '"+str(mes)+"' THEN 1 ELSE 0 END) AS COMPROBACION_ROLPAGO FROM rol_pagos WHERE id_personal = '"+str(id)+"';"
    print(sql+"\n")
    return conn.execute(sql).first()

@user.post("/uploadExcel/",tags=['Rol_pago'])
async def upload_excel(file: UploadFile = File(...)):
    #lectura archivo
    file_extension = os.path.splitext(file.filename)[1]
    if file_extension != '.xlsx':
        return {"error": "El archivo debe ser un Excel (.xlsx)"}
    save_path = os.path.join("C:/Rol Pagos/", file.filename)
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Cargar los datos del archivo Excel en un DataFrame de Pandas
    df = pd.read_excel(save_path)
    conn = engine.connect()
    message = []
    for item in range (df.shape[0]):
        sql = "INSERT INTO `rol_pagos`(`id_personal`, `sueldo_nominal`, `tiempo_parcial`, `dias_trabajados`, `sueldo_base`, `sueldo_vacaciones`, `dias_paternidad`, `permiso_paternidad`, `dias_subsidio_maternidad`, `subsidio_maternidad`, `dias_enfermedad`, `subsidio_enfermedad`, `numero_horas_suplementarias`, `valor_horas_suplementarias`, `numero_horas_extraordinarias`, `valor_horas_extraordinarias`, `comisiones`, `comisiones_mes_anterior`, `incentivo_upsell`, `movilizacion`, `incentivo_dolarazo`, `incentivo_alta_gama`, `bono_pospago_ruc`, `bono_plan_celular`, `base_iess`, `alimentacion`, `decimo_tercero_mensual`, `decimo_cuarta_mensual`, `fondo_reserva_mensual`, `total_ingresos`, `aporte_iess`, `chargeback_aplicar`, `impuesto_renta`, `prestamo_hipotecario_iess`, `prestamo_quirografario`, `prestamo_empresa`, `extension_conyugue`, `sobregiro`, `anticipo_comisiones_mes_anterior`, `seguro_movil`, `copago_seguro`, `total_egresos`, `neto_recibir`, `provision_decimo_tercer_sueldo`, `provision_decimo_cuarto_sueldo`, `provision_fondos_reserva`, `dias_vacaciones_tomados`, `provision_vacaciones`, `provision_aporte_iess_patronal`, `ccc`, `reverso_vacaciones_tomadas`, `fecha_rol_pago`) VALUES"
        datos = (df.iloc[item,0],df.iloc[item,1],df.iloc[item,2],df.iloc[item,3],df.iloc[item,4],df.iloc[item,5],df.iloc[item,6],df.iloc[item,7],df.iloc[item,8],df.iloc[item,9],df.iloc[item,10],df.iloc[item,11],df.iloc[item,12],df.iloc[item,13],df.iloc[item,14],df.iloc[item,15],df.iloc[item,16],df.iloc[item,17],df.iloc[item,18],df.iloc[item,19],df.iloc[item,20],df.iloc[item,21],df.iloc[item,22],df.iloc[item,23],df.iloc[item,24],df.iloc[item,25],df.iloc[item,26],df.iloc[item,27],df.iloc[item,28],df.iloc[item,29],df.iloc[item,30],df.iloc[item,31],df.iloc[item,32],df.iloc[item,33],df.iloc[item,34],df.iloc[item,35],df.iloc[item,36],df.iloc[item,37],df.iloc[item,38],df.iloc[item,39],df.iloc[item,40],df.iloc[item,41],df.iloc[item,42],df.iloc[item,43],df.iloc[item,44],df.iloc[item,45],df.iloc[item,46],df.iloc[item,47],df.iloc[item,48],df.iloc[item,49],df.iloc[item,50],df.iloc[item,51])
        # Convertir la fecha de rol de pagos a una cadena de texto
        fecha_rol_pago_str = str(df.iloc[item, 51])
        # Convertir la cadena de texto a un objeto datetime
        fecha_rol_pago = datetime.strptime(fecha_rol_pago_str, '%Y-%m-%d')
        # Obtener el año y el mes de la fecha de rol de pagos
        anio = fecha_rol_pago.strftime('%Y')
        print(anio)
        mes = fecha_rol_pago.strftime('%m')  
        print(mes)     
        sql = sql + str(datos) 
        print("id:",item)
        print(sql)
        bandera = get_dataRolpagoMesyAnio(str(df.iloc[item,0]), anio, mes)
        print("bandera:",bandera[0])
        if(bandera[0] == 0 or bandera[0] == None):
            conn.execute(sql)
            messageAux = {
                "id": str(df.iloc[item,0]),
                "message": "Todo OK"
            }
            message.append(messageAux)
        else:
            messageAux = {
                "id": str(df.iloc[item,0]),
                "message": "Fallo"
            }
            message.append(messageAux)
    # Convertir la lista en una cadena JSON
    mensaje_json = json.dumps(message)
    return {"succes": message}      
            
    #respuesta

@user.get("/motivosByParam/{param}", tags=["motivos"])
def get_motivosByParam(param: str):
    conn = engine.connect()
    return conn.execute("SELECT motivo.nombre FROM motivo WHERE motivo.tipo = '"+str(param)+"';").fetchall()