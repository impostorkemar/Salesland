from fastapi import APIRouter, Response
from config.db import conn
from models.user import users, usuarios, candidatos, personales, cargos, contratos, centro_costos, vacaciones, supervisores
from schemas.user import User,Usuario, Centro_costo, Cargo, Contrato, Candidato, Personal, Experiencia_laboral, Vacacion, Supervisor
from cryptography.fernet import Fernet
from starlette import status
from sqlalchemy.sql import select
import re

key = Fernet.generate_key()
f = Fernet(key)
user = APIRouter()

#CONSULTA USERS
@user.get("/users/",response_model=list[User], tags=["users"])#EJEMPLO
def get_users():
    return conn.execute(users.select()).fetchall()

@user.post("/users/",response_model=User, tags=["users"])#EJEMPLO
def create_user(user: User):
    new_user = {"name": user.name, "email": user.email}
    new_user["password"] = f.encrypt(user.password.encode("utf-8"))
    result = conn.execute(users.insert().values(new_user))    
    return conn.execute(users.select().where(users.c.id == result.lastrowid)).first()

@user.get("/users/{id}",response_model=User, tags=["users"])#EJEMPLO
def get_user(id: str):        
    return conn.execute(users.select().where(users.c.id == id)).first()

@user.delete("/users/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["users"])
def delete_user(id: str):   
    conn.execute(users.delete().where(users.c.id==id)) 
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/users/{id}", response_model=User, tags=["users"])
def update_user(id: str, user: User):    
    conn.execute(
        users.update().values(
            name=user.name, 
            email=user.email, 
            password=f.encrypt(user.password.encode("utf-8"))).where(users.c.id == id)) 
    return get_user(id)

#CONSULTA USUARIOS
@user.get("/usuarios/",response_model=list[Usuario], tags=["usuarios"])
def get_usuarios():
    return conn.execute(usuarios.select()).fetchall()

@user.get("/usuarios/{user}-{pass}", tags=["usuarios"])
def comprobar_usuario(user: str, passw: str):   
    #print("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'")
    return conn.execute("SELECT tipo FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.post('/usuarios/', response_model=Usuario,tags=["usuarios"])
def create_usuario(user: Usuario):
    nuevo_usuario = {"cedula":user.cedula, "usuario":user.usuario, "password":user.password, "tipo": user.tipo}
    result = conn.execute(usuarios.insert().values(nuevo_usuario))    
    print(result)
    return conn.execute( usuarios.select().where(usuarios.c.id_usuario == result.lastrowid)).first()

@user.get("/usuarios/{id}",response_model=Usuario, tags=["usuarios"])
def get_usuario(id: str):    
    #return conn.execute("SELECT * FROM `usuario` WHERE  id_usuario = "+str(id)).first()
    return  conn.execute(usuarios.select().where(usuarios.c.id_usuario == id)).first()

@user.delete("/usuarios/{id}", status_code=status.HTTP_204_NO_CONTENT,tags=["usuarios"])
def delete_usuario(id: str):    
    conn.execute(usuarios.delete().where(usuarios.c.id_usuario == id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/usuarios/{id}",response_model=Usuario,tags=["usuarios"])
def update_usuario(id: str,user: Usuario): 
    sql="UPDATE `usuario` SET `id_usuario`='"+str(user.id_usuario)+"',`cedula`='"+str(user.cedula)+"',`usuario`='"+str(user.usuario)+"',`password`='"+str(user.password)+"',`tipo`='"+str(user.tipo)+"' WHERE `id_usuario` = '"+str(id)+"'"  
    conn.execute(sql)
    return get_usuario(user.id_usuario)

#CONSULTA CENTRO_COSTO
@user.get("/centro_costos/", tags=["centro_costos"])
def get_centro_costos():
    return conn.execute("SELECT * FROM centro_costo;").fetchall()

@user.post("/centro_costos/", tags=["centro_costos"])
def create_centro_costo(centro_costo: Centro_costo):    
    sql="INSERT INTO centro_costo(id_centro_costo, nombre_centro, tienda, cuenta) VALUES "
    datos = (centro_costo.id_centro_costo,centro_costo.nombre_centro,
    centro_costo.tienda,centro_costo.cuenta)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `centro_costo` WHERE `id_centro_costo` = "+str(centro_costo.id_centro_costo)).first()

@user.get("/centro_costos/{id}", tags=["centro_costos"])
def get_centro_costo(id: str):    
    return conn.execute("SELECT * FROM `centro_costo` WHERE `id_centro_costo` = "+str(id)).first()

@user.delete("/centro_costos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["centro_costos"])
def delete_centro_costo(id: str):    
    conn.execute("DELETE FROM `centro_costo` WHERE  id_centro_costo = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT) 

@user.put("/centro_costos/{id}", response_model=Centro_costo, tags=["centro_costos"])
def update_centro_costo(id: str, centro_costo: Centro_costo):    
    sql="UPDATE `centro_costo` SET `id_centro_costo`='"+str(centro_costo.id_centro_costo)+"',`nombre_centro`='"+str(centro_costo.nombre_centro)+"',`tienda`='"+str(centro_costo.tienda)+"',`cuenta`='"+str(centro_costo.cuenta)+"' WHERE  id_centro_costo = '"+str(id)+"'"
    conn.execute(sql)
    return get_centro_costo(centro_costo.id_centro_costo)

#CONSULTA CONTRATOS
@user.get("/contratos/", tags=["contratos"])
def get_contratos():
    return conn.execute("SELECT * FROM contrato;").fetchall()

@user.post("/contratos/", tags=["contratos"])
def create_contrato(contrato: Contrato):    
    sql = "INSERT INTO `contrato`(`tipo_contrato`, `fecha_inicio_contrato`, `salario`, `observaciones`) VALUES "
    datos = (contrato.tipo_contrato, contrato.fecha_inicio_contrato, contrato.salario, contrato.observaciones)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `contrato` WHERE `id_contrato` = "+str(result.lastrowid)).first()

@user.get("/contratos/{id}", tags=["contratos"])
def get_contrato(id: str):  
    return conn.execute("SELECT * FROM `contrato` WHERE `id_contrato` = "+str(id)).first()

@user.delete("/contratos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["contratos"])
def delete_contrato(id: str):  
    conn.execute("DELETE FROM `contrato` WHERE `id_contrato` = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/contratos/{id}",response_model=Contrato, tags=["contratos"])
def update_contrato(id: str, contrato: Contrato):  
    sql="UPDATE `contrato` SET `id_contrato`='"+str(contrato.id_contrato)+"',`tipo_contrato`='"+str(contrato.tipo_contrato)+"',`fecha_inicio_contrato`='"+str(contrato.fecha_inicio_contrato)+"',`salario`='"+str(contrato.salario)+"',`observaciones`='"+str(contrato.observaciones)+"' WHERE `id_contrato` = '"+str(id)+"'"
    conn.execute(sql)
    return get_contrato(contrato.id_contrato)


#CONSULTA EXPERIENCIA_LABORAL
@user.get("/experiencia_laborales/", tags=["experiencia_laborales"])
def get_experiencia_laborales():
    return conn.execute("SELECT * FROM experiencia_laboral;").fetchall()

@user.post("/experiencia_laborales/", tags=["experiencia_laborales"])
def create_experiencia_laboral(experiencia_laboral: Experiencia_laboral):    
    sql = "INSERT INTO `experiencia_laboral`( `cedula`,`nombre_experiencia`, `tiempo_experiencia`, `estudios_universitarios`) VALUES"
    datos = (experiencia_laboral.cedula,experiencia_laboral.nombre_experiencia,experiencia_laboral.tiempo_experiencia,
    experiencia_laboral.estudios_universitarios)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `experiencia_laboral` WHERE `id_experiencia_laboral` = "+str(result.lastrowid)).first()

@user.get("/experiencia_laborales/{id}", tags=["experiencia_laborales"])
def get_experiencia_laboral(id: str):    
    return conn.execute("SELECT * FROM `experiencia_laboral` WHERE `id_experiencia_laboral` = "+str(id)).first()

@user.delete("/experiencia_laborales/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["experiencia_laborales"])
def delete_experiencia_laboral(id: str):    
    conn.execute("DELETE FROM `experiencia_laboral` WHERE `id_experiencia_laboral` = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/experiencia_laborales/{id}",response_model=Experiencia_laboral, tags=["experiencia_laborales"] )
def update_experiencia_laboral(id: str,experiencia_laboral: Experiencia_laboral):    
    sql="UPDATE `experiencia_laboral` SET `id_experiencia_laboral`='"+str(experiencia_laboral.id_experiencia_laboral)+"',`cedula`='"+str(experiencia_laboral.cedula)+"',`nombre_experiencia`='"+str(experiencia_laboral.nombre_experiencia)+"',`tiempo_experiencia`='"+str(experiencia_laboral.tiempo_experiencia)+"',`estudios_universitarios`='"+str(experiencia_laboral.estudios_universitarios)+"' WHERE `id_experiencia_laboral` = '"+str(id)+"'"
    conn.execute(sql)
    return get_experiencia_laboral(experiencia_laboral.id_experiencia_laboral)

#CONSULTA PERSONAS
@user.get("/candidatos/", tags=["candidatos"])
def get_candidatos():
    return conn.execute("SELECT * FROM candidato;").fetchall()

@user.post("/candidatos/", tags=["candidatos"])
def create_candidatos(candidato: Candidato):    
    sql = "INSERT INTO `candidato`(`cedula`, `nombre`, `apellido`, `genero`, `direccion_domicilio`, `ciudad`, `provincia`, `estado_civil`, `telefono_celular`, `telefono_casa`, `direccion_correo`, `fecha_nacimiento`, `edad`, `nacionalidad`, `status`) VALUES"
    datos = (candidato.cedula,candidato.nombre,candidato.apellido,candidato.genero,candidato.direccion_domicilio,
    candidato.ciudad,candidato.provincia,candidato.estado_civil,candidato.telefono_celular,candidato.telefono_casa,
    candidato.direccion_correo,candidato.fecha_nacimiento,candidato.edad,candidato.nacionalidad,candidato.status)
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `candidato` WHERE `cedula` = '"+ str(candidato.cedula)+"'").first()

@user.get("/candidatos/{id}", tags=["candidatos"])
def get_candidato(id: str):
    return conn.execute("SELECT * FROM `candidato` WHERE `cedula` = '"+ str(id)+"'").first()

@user.delete("/candidatos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["candidatos"])
def delete_candidato(id: str):
    conn.execute("DELETE FROM `candidato` WHERE  cedula = '"+str(id)+"'")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/candidatos/{id}",response_model=Candidato, tags=["candidatos"])
async def update_candidato(id: str, candidato: Candidato):
    sql="UPDATE `candidato` SET `cedula`='"+str(candidato.cedula)+"',`nombre`='"+str(candidato.nombre)+"',`apellido`='"+str(candidato.apellido)+"',`genero`='"+str(candidato.genero)+"',`direccion_domicilio`='"+str(candidato.direccion_domicilio)+"',`ciudad`='"+str(candidato.ciudad)+"',`provincia`='"+str(candidato.provincia)+"',`estado_civil`='"+str(candidato.estado_civil)+"',`telefono_celular`='"+str(candidato.telefono_celular)+"',`telefono_casa`='"+str(candidato.telefono_casa)+"',`direccion_correo`='"+str(candidato.direccion_correo)+"',`fecha_nacimiento`='"+str(candidato.fecha_nacimiento)+"',`edad`='"+str(candidato.edad)+"',`nacionalidad`='"+str(candidato.nacionalidad)+"',`status`='"+str(candidato.status)+"' WHERE `cedula` ='"+str(id)+"'"
    conn.execute(sql)
    return get_candidato(candidato.cedula)

#CONSULTA PERSONALES
@user.get("/personales/", tags=["personales"])
def get_personales():
    return conn.execute("SELECT * FROM personal;").fetchall()

@user.post("/personales/", tags=["personales"])
def create_personal(personal: Personal):
    #password = f.encrypt(usuario.password.encode("utf-8"))
    sql="INSERT INTO `personal`( `id_centro_costo`, `cedula`, `status`, `adendum_contrato`, `id_contrato`, `id_cargo`) VALUES ";
    datos = (personal.id_centro_costo,personal.cedula,personal.status,personal.adendum_contrato,
    personal.id_contrato,personal.id_cargo) 
    sql = sql + str(datos)    
    result = conn.execute(sql)    
    return conn.execute("SELECT * FROM `personal` WHERE  id_personal = "+str(result.lastrowid)).first()

@user.get("/personales/{id}-{id_centro_costo}-{cedula}", tags=["personales"])
def get_personal(id: str, id_centro_costo: str, cedula: str):   
    #print("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'")
    return conn.execute("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'").first()

@user.delete("/personales/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["personales"])
def delete_personal(id: str):   
    conn.execute("DELETE FROM `personal` WHERE  id_personal = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/personales/{id}-{id_centro_costo}-{cedula}",response_model=Personal, tags=["personales"])
def update_personal(id: str, id_centro_costo: str, cedula: str,personal: Personal):  
    sql="UPDATE `personal` SET `id_personal`='"+str(personal.id_personal)+"',`id_centro_costo`='"+str(personal.id_centro_costo)+"',`cedula`='"+str(personal.cedula)+"',`status`='"+str(personal.status)+"',`adendum_contrato`='"+str(personal.adendum_contrato)+"',`id_contrato`='"+str(personal.id_contrato)+"',`id_cargo`='"+str(personal.id_cargo)+"' WHERE `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'" 
    conn.execute(sql)
    return get_personal(personal.id_personal,personal.id_centro_costo,personal.cedula)

#CONSULTA CARGOS
@user.get("/cargos/", tags=["cargos"])
def get_cargos():
    return conn.execute("SELECT * FROM cargo;").fetchall()

@user.post("/cargos/", tags=["cargos"])
def create_cargo(cargo: Cargo):
    #password = f.encrypt(usuario.password.encode("utf-8"))
    sql = "INSERT INTO `cargo`(`id_cargo`, `nombre_cargo`) VALUES"
    datos = (cargo.id_cargo,cargo.nombre_cargo) 
    sql = sql + str(datos)
    result = conn.execute(sql)
    return conn.execute("SELECT * FROM `cargo` WHERE  id_cargo = "+str(cargo.id_cargo)).first()

@user.get("/cargos/{id}", tags=["cargos"])
def get_cargo(id: str):    
    return conn.execute("SELECT * FROM `cargo` WHERE  id_cargo = "+str(id)).first()

@user.delete("/cargos/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["cargos"])
def delete_cargo(id: str):    
    conn.execute("DELETE FROM `cargo` WHERE  id_cargo = "+str(id))
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.put("/cargos/{id}",response_model=Cargo, tags=["cargos"])
def update_cargo(id: str, cargo: Cargo):   
    sql="UPDATE `cargo` SET `id_cargo`='"+str(cargo.id_cargo)+"',`nombre_cargo`='"+str(cargo.nombre_cargo)+"' WHERE `id_cargo` = '"+str(id)+"'" 
    conn.execute(sql)
    return get_cargo(cargo.id_cargo)

@user.get("/personalesDeTiendas/", tags=["consulta"])
async def get_personalesDeTiendas():
    return conn.execute("SELECT personal.id_personal, centro_costo.id_centro_costo, centro_costo.nombre_centro, centro_costo.cuenta, candidato.cedula, candidato.nombre, candidato.apellido, candidato.status, candidato.ciudad FROM candidato, centro_costo, personal WHERE personal.cedula = candidato.cedula AND personal.id_centro_costo = centro_costo.id_centro_costo;").fetchall()

@user.get("/personalesDeTiendasByParameter/{id}", tags=["consulta"])
async def get_personalesDeTiendas(id:str):
    return conn.execute(select([personales.c.id_personal,centro_costos.c.id_centro_costo,centro_costos.c.nombre_centro,
        centro_costos.c.cuenta,
          candidatos.c.cedula,candidatos.c.nombre,candidatos.c.apellido, candidatos.c.status,
            candidatos.c.ciudad]).where(personales.c.cedula==candidatos.c.cedula,
            centro_costos.c.id_centro_costo==personales.c.id_centro_costo).order_by(str(id))).fetchall()

@user.get("/nombresTablas/", tags=["consulta"])
async def get_Tablas():
    return conn.execute("SHOW TABLES FROM salesland;").fetchall()

@user.get("/consultaDinamica/{varConsul}-{varOrd}", tags=["consulta"])
async def get_Tablas(varConsul : str, varOrd : str ):
    sql="SELECT * FROM "+varConsul
    sql2=" WHERE "
    print(sql)    
    return conn.execute(sql+";").fetchall()  
    #return None  

@user.get("/nombreUsuarioByUser_Pass/{user}-{pass}", tags=["usuarios"])
async def get_NombresPuntosVentas(user: str, passw: str):
    return conn.execute("SELECT usuario FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()

@user.get("/fechaInicioContratoByCedula/{ced}", tags=["contratos"])
async def get_fechaInicioContratoByCedula(ced: str):
    return conn.execute("SELECT contrato.fecha_inicio_contrato FROM contrato, personal, usuario WHERE personal.id_contrato = contrato.id_contrato and usuario.cedula = personal.cedula and usuario.cedula = '"+str(ced)+"' LIMIT 1;").first()

@user.get("/cedByPassAndUSer/{user}-{pass}", tags=["usuarios"])
async def get_cedByPassAndUSer(user: str, passw: str):
    return conn.execute("SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"' LIMIT 1;").first()

@user.get("/idpersonalByPassAndUSer/{user}-{pass}", tags=["personales"])
async def get_idpersonalByPassAndUSer(user: str, passw: str):
    return conn.execute("SELECT id_personal from personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"') LIMIT 1;").first()

@user.get("/totalVacacionesTomadas/{user}-{pass}", tags=["vacaciones"])
async def get_totalVacacionesTomadas(user: str, passw: str):
    return conn.execute("SELECT SUM(vacaciones.dias_lab_solicitados) AS VACA_PREV FROM vacaciones WHERE id_personal = (select id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"')) LIMIT 1;").first()

@user.post("/vacation2/", tags=["vacaciones"])
async def create_vacation2(vacacion : Vacacion ):    
    sql = "INSERT INTO `vacaciones`(`id_personal`, `fecha_solicitud`, `fecha_inicio_vacaciones`, `fecha_fin_vacaciones`, `dias_lab_solicitados`, `dias_disponibles_acum`, `status`, `observaciones`) VALUES"
    datos = (vacacion.id_personal,vacacion.fecha_solicitud,vacacion.fecha_inicio_vacaciones,vacacion.fecha_fin_vacaciones,
             vacacion.dias_lab_solicitados,vacacion.dias_disponibles_acum,vacacion.status, vacacion.observaciones) 
    sql = sql + str(datos) 
    print(sql);
    result = conn.execute(sql)
    return conn.execute(vacaciones.select().where(vacaciones.c.id_vacaciones == result.lastrowid)).first() 


@user.get("/vacacionesPersonal/", tags=["vacaciones"])
async def get_vacacionesPersonal():
    return conn.execute("SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.observaciones FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND Usuario.cedula = candidato.cedula;").fetchall()

@user.get("/vacacionesByUserAndPass/{user}-{pass}", tags=["vacaciones"])
async def get_vacacionesByUserAndPass(user: str, passw: str):
    return conn.execute("SELECT vacaciones.id_vacaciones, candidato.nombre, candidato.apellido, vacaciones.fecha_solicitud, vacaciones.fecha_inicio_vacaciones, vacaciones.fecha_fin_vacaciones, vacaciones.dias_lab_solicitados, vacaciones.dias_disponibles_acum, vacaciones.status, vacaciones.observaciones FROM candidato, vacaciones, personal, usuario WHERE vacaciones.id_personal = personal.id_personal AND personal.cedula = candidato.cedula AND usuario.cedula = candidato.cedula and usuario.usuario = '"+str(user)+"' and usuario.password = '"+str(passw)+"';").fetchall()

@user.delete("/vacaciones/{id}", status_code=status.HTTP_204_NO_CONTENT, tags=["candidatos"])
def delete_candidato(id: str):
    conn.execute("DELETE FROM `vacaciones` WHERE  id_vacaciones = '"+str(id)+"'")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@user.get("/comprobarVacacionesRegistradasByUserPassword/{user}_{pass}_{fecha}", tags=["vacaciones"])
async def get_vacacionesregistradasByUserPassword(user: str, passw: str, fecha: str):
    print("SELECT SUM(CASE WHEN fecha_inicio_vacaciones < '"+str(fecha)+"' AND fecha_fin_vacaciones > '"+str(fecha)+"' THEN '1' WHEN fecha_inicio_vacaciones = '"+str(fecha)+"' THEN '1' WHEN fecha_fin_vacaciones = '"+str(fecha)+"' THEN '1' ELSE '0' END) AS FECHAS_CAL FROM `vacaciones` WHERE id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"'));)")
    return conn.execute("SELECT SUM(CASE WHEN fecha_inicio_vacaciones < '"+str(fecha)+"' AND fecha_fin_vacaciones > '"+str(fecha)+"' THEN '1' WHEN fecha_inicio_vacaciones = '"+str(fecha)+"' THEN '1' WHEN fecha_fin_vacaciones = '"+str(fecha)+"' THEN '1' ELSE '0' END) AS FECHAS_CAL FROM `vacaciones` WHERE id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"'));").first()

@user.get('/vacacionesAReasignarByUserPassword/{user}_{pass}_{fecha}',tags=["vacaciones"])
async def get_vacacionesAReasignarByUserPassword(user: str, passw: str, fecha: str):
    print("SELECT id_vacaciones, (CASE WHEN fecha_inicio_vacaciones < '"+str(fecha)+"' AND fecha_fin_vacaciones > '"+str(fecha)+"' THEN '1' WHEN fecha_inicio_vacaciones = '"+str(fecha)+"' THEN '1' WHEN fecha_fin_vacaciones = '"+str(fecha)+"' THEN '1' ELSE '0' END) AS 'FECHAS_CAL' FROM `vacaciones` WHERE 1 IN (CASE WHEN fecha_inicio_vacaciones < '"+str(fecha)+"' AND fecha_fin_vacaciones > '"+str(fecha)+"' THEN '1' WHEN fecha_inicio_vacaciones = '"+str(fecha)+"' THEN '1' WHEN fecha_fin_vacaciones = '"+str(fecha)+"' THEN '1' ELSE '0' END) AND id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"'));)")
    return conn.execute("SELECT id_vacaciones FROM `vacaciones` WHERE 1 IN (CASE WHEN fecha_inicio_vacaciones < '"+str(fecha)+"' AND fecha_fin_vacaciones > '"+str(fecha)+"' THEN '1' WHEN fecha_inicio_vacaciones = '"+str(fecha)+"' THEN '1' WHEN fecha_fin_vacaciones = '"+str(fecha)+"' THEN '1' ELSE '0' END) AND id_personal = (SELECT id_personal FROM personal WHERE cedula = (SELECT cedula FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"'));").fetchall()

@user.get('/vacacionesFechaInicioAndFin/{idVacacion}',tags=["vacaciones"])
async def get_vacacionesFechaInicioAndFin(idVacacion: str):
    return conn.execute("SELECT fecha_inicio_vacaciones, fecha_fin_vacaciones FROM vacaciones WHERE id_vacaciones = '"+str(idVacacion)+"';").first()


