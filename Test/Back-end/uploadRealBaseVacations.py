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
  #Dropeo tabla cargo
  ejecutarSQL("DELETE FROM cargo;")  
  #Dropeo table usuario
  ejecutarSQL("DELETE FROM vacaciones;") 
  #Dropeo tabla cargo
  ejecutarSQL("DELETE FROM personal;")
  #Dropeo table usuario
  ejecutarSQL("DELETE FROM supervisor;") 
  #Dropeo tabla centro_base 
  ejecutarSQL("DELETE FROM centro_costo;")
  #Dropeo table usuario
  ejecutarSQL("DELETE FROM usuario;")
  #Dropeo table experiencia_laboral
  ejecutarSQL("DELETE FROM experiencia_laboral;")
  #Dropeo tabla candidato
  ejecutarSQL("DELETE FROM candidato;")
  #Dropeo table contrato
  ejecutarSQL("DELETE FROM contrato;")
  #Dropeo tabla calendario
  ejecutarSQL("DELETE FROM calendario;")
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

def cargarCargos():
  jCargos=1;
  iCargos=2;
  lCargos=48;
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

def cargarCandidato():
  j=0;
  i=6;
  #l=10;
  l=551
  listPersonal = [];
  for i in range(i,l):
    listPersonal.append(df5['VACACIONES PERSONAL SALESLAND'].iloc[i,1:17])
    #print(df2['VACACIONES PERSONAL SALESLAND'].iloc[i,1:17])
  #print(listPersonal)
  for item  in range(len(listPersonal)):
    status = (listPersonal[item][0])
    cedula = (listPersonal[item][2]) 
    centro_costo = (listPersonal[item][3]) 
    tienda = (listPersonal[item][4]) 
    cargo = (listPersonal[item][5]) 
    apellido = (listPersonal[item][10]) 
    nombre = (listPersonal[item][11]) 
    correo = (listPersonal[item][14])
    fecha_inicio_contrato = (listPersonal[item][15])

    if(status == 'Activo'):    
      #print(status,"-",cedula,"-",centro_costo,"-",tienda,"-",cargo,"-",apellido,"-",nombre,"-",correo,"-",fecha_inicio_contrato)
      sql = "INSERT INTO `candidato`(`cedula`, `nombre`, `apellido`, `genero`, `direccion_domicilio`, `ciudad`,`provincia`, `estado_civil`, `telefono_celular`, `telefono_casa`, `direccion_correo`, `fecha_nacimiento`, `edad`, `nacionalidad`,`status` ) VALUES"
      datos = (str(cedula),str(nombre),str(apellido),'','','','','','','',str(correo),'','','',"contratado")
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

df5 = readExcelXLS("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/Vacaciones Salesland 2021-2022 (corte 31 jul22).xlsx")
#print(df5) 

df2 = readCSV("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/centro_costos3.csv")
#print(df2) 

clearTables()
cargarCentroCosto()
cargarCargos()
cargarCandidato()


  
   
