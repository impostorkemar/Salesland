#Carga csv centro costos
from asyncio.windows_events import NULL
from cmath import nan
from numpy import NAN, equal
import pandas as pd
import numpy as np
import mysql.connector
import csv
import io
import os
from datetime import datetime
from dateutil.relativedelta import relativedelta

df2 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/centro_costos3.csv")
print(df2) 
#print(df2.shape); print(df2.size); print(df2.columns); print(df2.dtypes) print(df2.iloc[0,:]); print("len",df2.iloc[0,:].size);

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

def existeRegistroCandidato(id):
    aux = consultarSQL("SELECT * FROM `candidato` WHERE `cedula` = '"+str(id)+"'")
    print("Consulta:",id,'-->',aux)
    return aux

def consultarNumRegisTabla(nombreTabla):
    aux = consultarSQL("SELECT count(*) FROM "+nombreTabla)
    print("Consulta:",aux)
    return aux
    
def consultarCedulasCandidatos():
    aux = consultarSQL_Lista("SELECT cedula FROM candidato;")
    return aux

def consultarIdCentroXTienda(tienda):    
    aux = consultarSQL_Lista("SELECT `id_centro_costo` FROM `centro_costo` WHERE `tienda` = '"+str(tienda)+"'")
    return aux

def consultarIdContrato(tipo_contrato,fecha_inicio_contrato,salario,observaciones):
    auxString = -1
    aux = consultarSQL_Lista("SELECT `id_contrato` FROM `contrato` WHERE `tipo_contrato` = '"+tipo_contrato+"' and `fecha_inicio_contrato` = '"+
    fecha_inicio_contrato+"' and `salario` = '"+str(salario)+"' and `observaciones` = '"+str(observaciones)+"'")
    print(aux)
    for i in aux:        
        auxString = i[0]        
    print("\tSELECT `id_contrato` FROM `contrato` WHERE `tipo_contrato` = '"+tipo_contrato+"' and `fecha_inicio_contrato` = '"+
    fecha_inicio_contrato+"' and `salario` = '"+str(salario)+"' and `observaciones` = '"+str(observaciones)+"'")
    return auxString

#Dropeo table usuario
ejecutarSQL("DELETE FROM supervisor;")
#Dropeo tabla cargo
ejecutarSQL("DELETE FROM personal;")
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
#Dropeo tabla cargo
ejecutarSQL("DELETE FROM cargo;")


#Consulta tabla centro_costo base 
#consultarSQL("SELECT * FROM centro_costo;")



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

df3 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/archivo_madre.csv",sep = ';', dtype='object')
print(df3);

result = []; list = [];
for i in range (df3.shape[0]):
    list.append(df3.iloc[i,:][30])
#print("\n",list) 
[result.append(x) for x in list if x not in result] 
for item in result:
    sql = "INSERT INTO `supervisor`(`nombre_supervisor`, `email`) VALUES"
    sql = sql + "('"+str(item)+"','test@example.com')"
    print("\n",sql)

"""
#INSERCION A CANDIDATOS

for i in range (df3.shape[0]):
    list = []; auxFecha = ""; edadAux=0;
    sql = "INSERT INTO `candidato`(`cedula`, `nombre`, `apellido`, `genero`, `direccion_domicilio`, `ciudad`, `provincia`, `estado_civil`, `telefono_celular`, `telefono_casa`, `direccion_correo`, `fecha_nacimiento`, `edad`, `nacionalidad`,`status` ) VALUES"
    for j in range (df3.iloc[0,:].size):
        list.append(df3.iloc[i,:][j])
    #print(list)     
    fecha = list[9]
    if isNaN(list[9]):
        edadAux = 0  
        fecha = ""
    else:
        #print("Entre lista:",list[9])
        list[9] = str(list[9]).replace("//","/")    
        fechaAux = str(list[9]).split("/")        
        edad = datetime.now()
        print('fecha:',fechaAux[0],fechaAux[1],fechaAux[2])
        if int(fechaAux[0]) > 12 :
            fecha_nacimiento = datetime.strptime(str(list[9]), "%d/%m/%Y")
            edad = relativedelta(datetime.now(), fecha_nacimiento)
            edadAux = edad.years
            auxFecha = fechaAux[2]+"-"+fechaAux[1]+"-"+fechaAux[0]
        elif int(fechaAux[0]) <= 12 :
            fecha_nacimiento = datetime.strptime(str(list[9]), "%m/%d/%Y")        
            edad = relativedelta(datetime.now(), fecha_nacimiento)
            edadAux = edad.years    
            auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]    
    print("auxFecha:",auxFecha)  
    datos = (list[0],list[2],list[1],'',list[5],list[6],list[7],list[8],list[4],'',list[3],auxFecha,edadAux,list[10],"postulante")
    sql = sql + str(datos) 
    print(sql)
    #ejecutarSQL(sql)
    if existeRegistroCandidato(str(list[0])) == "":
        ejecutarSQL(sql)        
        print("No existe:",list[0])
    else:
        print('Candidato duplicada:',list[0])

#Setear incremental en 0
ejecutarSQL("ALTER TABLE experiencia_laboral AUTO_INCREMENT=0")

#Insertar tabla experiencia_laboral
for i in range (df3.shape[0]):
    list = []
    sql = "INSERT INTO `experiencia_laboral`( `cedula`,`nombre_experiencia`, `tiempo_experiencia`, `estudios_universitarios`) VALUES"
    for j in range (df3.iloc[0,:].size):
        list.append(df3.iloc[i,:][j])
    #print(list)          
    list[21] = str(list[21]).replace("%","")
    list[20] = str(list[20]).replace("%","")
    datos = (list[0],'Experiencia profesional',list[21],list[20])
    sql = sql + str(datos) 
    print(sql)
    ejecutarSQL(sql)

#Setear incremental en 0
ejecutarSQL("ALTER TABLE contrato AUTO_INCREMENT=0")

# Insert tabla contrato
for i in range (df3.shape[0]):
    list = []
    sql = "INSERT INTO `contrato`(`tipo_contrato`, `fecha_inicio_contrato`, `salario`, `observaciones`) VALUES"
    for j in range (df3.iloc[0,:].size):
        list.append(df3.iloc[i,:][j])
    #print(list)
    if isNaN(list[29]):
        auxObs = ""
    else:
        auxObs = list[29]
    if isNaN(list[26]):
        auxFecha = ""
    else:        
        fechaAux = str(list[26]).split("/")
        auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]
    #print(list[27])
    datos = (list[13],auxFecha,str(list[27]).replace("$",""),auxObs)
    sql = sql + str(datos) 
    print(sql)
    ejecutarSQL(sql)

#Insertar tabla usuarios
list = consultarCedulasCandidatos()
for i in range(len(list)):
    sql = "INSERT INTO `usuario`(`cedula`, `nombre_usuario`, `password`, `tipo`) VALUES"
    datos = (list[i][0],list[i][0],list[i][0],"test")
    sql = sql + str(datos)
    ejecutarSQL(sql)
    print(sql)

#Insertar cargos
df4 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/cargos.csv", dtype='object')
#print(df4);

for i in range (df4.shape[0]):
    list = []
    sql = "INSERT INTO `cargo`(`id_cargo`, `nombre_cargo`) VALUES"
    for j in range (df4.iloc[0,:].size):
        list.append(df4.iloc[i,:][j])
    datos = (list[0],list[1])
    sql = sql + str(datos) 
    print(sql)
    ejecutarSQL(sql)

df5 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/SaleslandVacations/BackEnd/SaleslandCodes/archivo_madre.csv", dtype='object')
print(df5);

#Setear incremental en 0
ejecutarSQL("ALTER TABLE personal AUTO_INCREMENT=0")

for i in range(df5.shape[0]): 
    list = consultarIdCentroXTienda(df5.iloc[i,:][25])
    #print("\n\t",df5.iloc[i,:][25])
    for j in range(len(list)):
        sql="INSERT INTO `personal`( `id_centro_costo`, `cedula`, `status`, `adendum_contrato`, `id_contrato`, `id_cargo`) VALUES ";
        if isNaN(df5.iloc[i,:][29]):
            auxObs = ""
        else:
            auxObs = df5.iloc[i,:][29]
        if isNaN(df5.iloc[i,:][26]):
            auxFecha = ""
        else:        
            fechaAux = str(df5.iloc[i,:][26]).split("/")        
            auxFecha = fechaAux[2]+"-"+fechaAux[0]+"-"+fechaAux[1]
        #print("fechaAUx:",fechaAux,"auxFecha:",auxFecha)
        #print(list[j][0],df5.iloc[i,:][0], df5.iloc[i,:][23], "",consultarIdContrato(df5.iloc[i,:][13],str(auxFecha),str(df5.iloc[i,:][27]).replace("$",""),auxObs),"")
        datos = str(list[j][0]),df5.iloc[i,:][0], df5.iloc[i,:][23], "",str(i+1),"1"
        sql += str(datos)
        print(sql)
        ejecutarSQL(sql)
"""

