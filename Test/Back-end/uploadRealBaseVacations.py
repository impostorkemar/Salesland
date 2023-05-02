#Carga csv centro costos
from asyncio.windows_events import NULL
from cmath import nan
from numpy import NAN, equal
import pandas as pd
import numpy as np
import mysql.connector
import io
import os
from datetime import datetime
from dateutil.relativedelta import relativedelta
import re

def ejecutarSQL(SQL):
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="salesland", 
                                    passwd="rootsalesland", 
                                    database="salesland")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    conexion1.commit()   
    conexion1.close()
    return True;

def consultarSQL(SQL):
    auxString = ""
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="salesland", 
                                    passwd="rootsalesland", 
                                    database="salesland")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    for fila in cursor1:
        auxString += str(fila) +"\n"
        #print(fila)
    conexion1.close()
    return auxString;

def consultarSQL_Lista(SQL):
    auxString = []
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="salesland", 
                                    passwd="rootsalesland", 
                                    database="salesland")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    for fila in cursor1:
        auxString.append(fila)
        #print(fila)
    conexion1.close()
    return auxString;

def isNaN(num):
    return num != num

def clearTables():
  #Dropeo tabla personal
  ejecutarSQL("DELETE FROM personal;")
  #Dropeo table usuario
  ejecutarSQL("DELETE FROM supervisor;") 
  #Dropeo table usuario
  ejecutarSQL("DELETE FROM usuario;")
  #Dropeo tabla comprobante
  ejecutarSQL("DELETE FROM comprobante;")
  #Dropeo tabla viaje
  ejecutarSQL("DELETE FROM viaje;")  
  #Dropeo table experiencia_laboral
  ejecutarSQL("DELETE FROM experiencia_laboral;")
  #Dropeo tabla candidato
  ejecutarSQL("DELETE FROM candidato;")  
  #Dropeo tabla cargo
  ejecutarSQL("DELETE FROM cargo;")  
  #Dropeo table usuario
  ejecutarSQL("DELETE FROM vacaciones;")
  #Dropeo tabla centro_base 
  ejecutarSQL("DELETE FROM centro_costo;")
  #Dropeo table contrato
  ejecutarSQL("DELETE FROM contrato;")
  #Dropeo tabla rol_pagos
  ejecutarSQL("DELETE FROM rol_pagos;")

def readExcelXLS(path: str):
  return pd.read_excel(path,sheet_name=None)
  
def readCSV(path: str):
  import csv
  return pd.read_csv(path)  

def cargarCentroCosto():
   #Insercion en tabla desde dataframe
  for i in range(df2.shape[0]):
      list = []
      sql="INSERT INTO centro_costo(id_centro_costo, nombre_centro, tienda, cuenta) VALUES ";
      for j in range(df2.iloc[0,:].size):
          list.append(df2.iloc[i,:][j])
      #print(list)
      datos = (int(list[0]),list[1],list[2],list[3])
      sql = sql + str(datos) 
      #print("sql:",sql)
      ejecutarSQL(sql)

def cargarCargos(numCargos):
  jCargos=1;
  iCargos=2;
  lCargos=numCargos;
  listCargos = [];
  for i in range(iCargos,lCargos):
    listCargos.append(df5['cargos'].iloc[i,0])
    sql = "INSERT INTO `cargo`(`id_cargo`, `nombre_cargo`) VALUES"
    datos = (jCargos,df5['cargos'].iloc[i,0])
    sql = sql + str(datos) 
    print(sql)
    ejecutarSQL(sql) 
    jCargos=jCargos+1
  

def existeRegistroCandidato(id):
    aux = consultarSQL("SELECT * FROM `candidato` WHERE `cedula` = '"+str(id)+"'")
    print("Consulta:",id,'-->',aux)
    return aux

def cargarCandidato(numUsuarios):
  j=0;
  i=6;
  #l=10;
  l=numUsuarios
  listPersonal = [];
  for i in range(i,l):
    listPersonal.append(df5['VACACIONES PERSONAL SALESLAND'].iloc[i,1:18])
    #print(df2['VACACIONES PERSONAL SALESLAND'].iloc[i,1:17])
  #print(listPersonal)
  for item  in range(len(listPersonal)):
    status = (listPersonal[item][0])
    cedula = (listPersonal[item][2]) 
    centro_costo = (listPersonal[item][3]) 
    tienda = (listPersonal[item][4]) 
    cargo = (listPersonal[item][5]) 
    apellido = (listPersonal[item][12]) 
    nombre = (listPersonal[item][11]) 
    correo = (listPersonal[item][15])
    fecha_inicio_contrato = (listPersonal[item][16])
    if(status == 'Activo'):
      if isNaN(fecha_inicio_contrato):
        edadAux = 0  
        fecha = ""
      else:
        #print("Entre lista:",list[9])         
        fecha_inicio_contrato = str(fecha_inicio_contrato).replace("//","/") 
        fechaAux = str(fecha_inicio_contrato).split("/")        
        edad = datetime.now()
        #print('fecha:',fechaAux[0],fechaAux[1],fechaAux[2])
        if int(fechaAux[0]) > 12 :
            fecha_nacimiento = datetime.strptime(str(fecha_inicio_contrato), "%d/%m/%Y")
            edad = relativedelta(datetime.now(), fecha_nacimiento)
            edadAux = edad.years
            auxFecha = fechaAux[2]+"-"+fechaAux[1]+"-"+fechaAux[0]
        elif int(fechaAux[0]) <= 12 :
            fecha_nacimiento = datetime.strptime(str(fecha_inicio_contrato), "%m/%d/%Y")        
            edad = relativedelta(datetime.now(), fecha_nacimiento)
            edadAux = edad.years    
            auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]
          
        #print(status,"-",cedula,"-",centro_costo,"-",tienda,"-",cargo,"-",apellido,"-",nombre,"-",correo,"-",fecha_inicio_contrato)
        sql = "INSERT INTO `candidato`(`cedula`, `nombre`, `apellido`, `genero`, `direccion_domicilio`, `ciudad`,`provincia`, `estado_civil`, `telefono_celular`, `telefono_casa`, `direccion_correo`, `fecha_nacimiento`, `edad`, `nacionalidad`,`status` ) VALUES"
        datos = (str(cedula),str(nombre),str(apellido),'','','','','','','',str(correo),'',edadAux,'',str(status))
        sql = sql + str(datos)
        print(sql)
        ejecutarSQL(sql)
        """
        if existeRegistroCandidato(str(list[0])) == "":
            ejecutarSQL(sql)        
            print("No existe:",list[0])
        else:
            print('Candidato duplicada:',list[0])
        """

def cargarSupervisores():
  ejecutarSQL("ALTER TABLE supervisor AUTO_INCREMENT=0")
  jCargos=1;
  iCargos=1;
  lCargos=6;
  listCargos = [];
  for i in range(iCargos,lCargos):
    listCargos.append(df5['supervisores'].iloc[i,0])
    sql = "INSERT INTO `supervisor`(`cedula`,`nombre_supervisor`, `email`) VALUES"
    datos = (df5['supervisores'].iloc[i,0],df5['supervisores'].iloc[i,1],df5['supervisores'].iloc[i,2])
    sql = sql + str(datos) 
    print(sql)
    ejecutarSQL(sql) 
    jCargos=jCargos+1

def consultarCedulasCandidatos():
  aux = consultarSQL_Lista("SELECT cedula FROM candidato;")
  return aux

def cargarusuarios():
  #Insertar tabla usuarios
  ejecutarSQL("ALTER TABLE usuario AUTO_INCREMENT=0")
  list = consultarCedulasCandidatos()
  for i in range(len(list)):
      sql = "INSERT INTO `usuario`(`cedula`, `usuario`,`password`, `tipo`) VALUES"   
      datos = (list[i][0],list[i][0],list[i][0],"promotor")
      sql = sql + str(datos)
      ejecutarSQL(sql)
      print(sql)
      
def cargarContratos(numUsuarios):
  ejecutarSQL("ALTER TABLE contrato AUTO_INCREMENT=0")
  j=0;
  i=6;
  #l=10;
  l=numUsuarios
  listPersonal = [];  
  for i in range(i,l):
    listPersonal.append(df5['VACACIONES PERSONAL SALESLAND'].iloc[i,1:18])
    #print(df2['VACACIONES PERSONAL SALESLAND'].iloc[i,1:17])
  #print(listPersonal)
  for item  in range(len(listPersonal)):
    status = (listPersonal[item][0])
    fecha_inicio_contrato = (listPersonal[item][16])
    if(status == 'Activo'): 
      fechaAux = str(fecha_inicio_contrato).split("/")
      print("\nfechaAux:",fechaAux)
      if int(fechaAux[0]) > 12 :
        fecha_nacimiento = datetime.strptime(str(fecha_inicio_contrato), "%d/%m/%Y")
        edad = relativedelta(datetime.now(), fecha_nacimiento)
        edadAux = edad.years
        auxFecha = fechaAux[2]+"-"+fechaAux[1]+"-"+fechaAux[0]
      elif int(fechaAux[0]) <= 12 :
        fecha_nacimiento = datetime.strptime(str(fecha_inicio_contrato), "%m/%d/%Y")        
        edad = relativedelta(datetime.now(), fecha_nacimiento)
        edadAux = edad.years    
        auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]
      else:  
        auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]
      sql = "INSERT INTO `contrato`(`tipo_contrato`, `fecha_inicio_contrato`, `fecha_fin_contrato`, `salario`, `observaciones`) VALUES"
      datos = ("NUEVO",auxFecha,"","0","FIRMO CONTRATO")
      sql = sql + str(datos)       
      print(sql)
      ejecutarSQL(sql)

def cargarExpeLaboral():
  #Insertar tabla usuarios
  ejecutarSQL("ALTER TABLE experiencia_laboral AUTO_INCREMENT=0")
  list = consultarCedulasCandidatos()
  for i in range(len(list)):
    sql = "INSERT INTO `experiencia_laboral`( `cedula`,`nombre_experiencia`, `tiempo_experiencia`, `estudios_universitarios`) VALUES"
    datos = (str(list[i][0]),'Experiencia profesional','0','0')
    sql = sql + str(datos)
    print(sql)
    ejecutarSQL(sql)

def consultarSupervisor(cedulaSupervisor: str):
  sql= "SELECT `id_supervisor` FROM `supervisor` WHERE `cedula` =  '"+str(cedulaSupervisor)+"' LIMIT 1;"
  print("id_contrato:",sql)
  id_supervisor = consultarSQL_Lista(sql);
  return id_supervisor

def consultarCargo(nombreCargo:str):
  sql= "SELECT id_cargo FROM cargo WHERE cargo.nombre_cargo = '"+str(nombreCargo)+"' LIMIT 1;"
  #print(sql)
  id_cargo = consultarSQL_Lista(sql);
  return id_cargo

def consultarContrato(fechaInicioContrato:str, id:int):
  sql= "SELECT id_contrato FROM contrato WHERE contrato.fecha_inicio_contrato = '"+str(fechaInicioContrato)+"' AND contrato.id_contrato = '"+str(id)+"' LIMIT 1;"
  print(sql)
  id_contrato = consultarSQL_Lista(sql);
  return id_contrato
      
def cargarPersonal(numUsuarios):
  #Setear incremental en 0
  ejecutarSQL("ALTER TABLE personal AUTO_INCREMENT=0")
  ejecutarSQL("ALTER TABLE contrato AUTO_INCREMENT=0")
  j=0;
  i=6;
  #l=10;
  l=numUsuarios
  k=0
  listPersonal = [];
  for i in range(i,l):
    listPersonal.append(df5['VACACIONES PERSONAL SALESLAND'].iloc[i,1:20])
    #print(df2['VACACIONES PERSONAL SALESLAND'].iloc[i,1:17])
  #print(listPersonal)
  idContrato = 1
  for item  in range(len(listPersonal)):
    status = (listPersonal[item][0])
    cedula = (listPersonal[item][2]) 
    centro_costo = (listPersonal[item][3]) 
    tienda = (listPersonal[item][4]) 
    cargo = (listPersonal[item][6]) 
    apellido = (listPersonal[item][12]) 
    nombre = (listPersonal[item][11]) 
    correo = (listPersonal[item][15])
    fecha_inicio_contrato = (listPersonal[item][16])
    cedulaSupervisor = (listPersonal[item][17])
    nombreSupervisor = (listPersonal[item][18])    
    if(status == 'Activo'):       
      listIdSup  = consultarSupervisor(str(cedulaSupervisor))      
      listIdCargo = consultarCargo(str(cargo))
      fechaAux = str(fecha_inicio_contrato).split("/")
      print("\nfechaAux:",fechaAux)
      if int(fechaAux[0]) > 12 :
        fecha_nacimiento = datetime.strptime(str(fecha_inicio_contrato), "%d/%m/%Y")
        edad = relativedelta(datetime.now(), fecha_nacimiento)
        edadAux = edad.years
        auxFecha = fechaAux[2]+"-"+fechaAux[1]+"-"+fechaAux[0]
      elif int(fechaAux[0]) <= 12 :
        fecha_nacimiento = datetime.strptime(str(fecha_inicio_contrato), "%m/%d/%Y")        
        edad = relativedelta(datetime.now(), fecha_nacimiento)
        edadAux = edad.years    
        auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]
      else:  
        auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]

      sql = "INSERT INTO `contrato`(`tipo_contrato`, `fecha_inicio_contrato`, `fecha_fin_contrato`, `salario`, `observaciones`) VALUES"
      datos = ("NUEVO",auxFecha,"","0","FIRMO CONTRATO")
      sql = sql + str(datos)       
      print(sql)
      ejecutarSQL(sql)

      """listIdContrato = consultarContrato(str(auxFecha),str(item+1))
      idContrato = "";
      for i in range(len(listIdContrato)):
        idContrato = listIdContrato[0][0]"""

      idSUper= ""; idCargo = ""; 
      for i in range(len(listIdSup)):
        idSUper= listIdSup[0][0]
      for i in range(len(listIdCargo)):
        idCargo = listIdCargo[0][0]      
     
      
      if (idCargo == ""):
         idCargo = '46' 
      print("idSUper:",idSUper,"\nidCargo:",idCargo)
      sql2="INSERT INTO `personal`( `id_centro_costo`, `cedula`,`id_supervisor`, `status`, `adendum_contrato`, `id_contrato`, `id_cargo`) VALUES ";
      datos2 = (str(centro_costo),str(cedula),str(idSUper), str(status), "",str(idContrato),str(idCargo))
      sql2 += str(datos2)
      print(sql2)
      ejecutarSQL(sql2)

      idContrato = idContrato +1

def cambiarRolesAdmins():
  sql1 = "UPDATE `usuario` SET `tipo`='admin' WHERE  `cedula` = '1724124084';"
  ejecutarSQL(sql1)
  sql2 = "UPDATE `usuario` SET `tipo`='admin' WHERE  `cedula` = '0606156461';"
  ejecutarSQL(sql2)
  sql3 = "UPDATE `usuario` SET `tipo`='admin' WHERE  `cedula` = '1721858551';"
  ejecutarSQL(sql3)
   
   
def cambiarRolesSupervisores():
  sql2 = "UPDATE `usuario` SET `tipo`='supervisor' WHERE  `cedula` = '1713085593';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `usuario` SET `tipo`='supervisor' WHERE  `cedula` = '0956659049';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `usuario` SET `tipo`='supervisor' WHERE  `cedula` = '6105797275';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `usuario` SET `tipo`='supervisor' WHERE  `cedula` = '1710213966';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `usuario` SET `tipo`='supervisor' WHERE  `cedula` = '1314587427';"
  ejecutarSQL(sql2)

def cambiarJefedeSupervisores():
  sql2 = "UPDATE `personal` SET `id_supervisor`='1' WHERE `cedula` = '0956659049';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `personal` SET `id_supervisor`='1' WHERE `cedula` = '6105797275';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `personal` SET `id_supervisor`='1' WHERE `cedula` = '1710213966';"
  ejecutarSQL(sql2)
  sql2 = "UPDATE `personal` SET `id_supervisor`='1' WHERE `cedula` = '1314587427';"
  ejecutarSQL(sql2)

df5 = readExcelXLS("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/Vacaciones Salesland 2021-2022 (corte 31 jul22).xlsx")
#print(df5) 

df2 = readCSV("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/centro_costos3.csv")
#print(df2) 

numCargos = 48
numUsuarios = 559

clearTables()
cargarCentroCosto()
cargarCargos(numCargos)
cargarCandidato(numUsuarios)
cargarSupervisores()
cargarusuarios()
#cargarContratos(numUsuarios)
cargarExpeLaboral()
cargarPersonal(numUsuarios)
cambiarRolesAdmins()
cambiarRolesSupervisores()
cambiarJefedeSupervisores()