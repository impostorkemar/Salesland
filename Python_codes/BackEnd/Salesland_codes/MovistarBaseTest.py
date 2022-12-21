#Carga csv centro costos
from asyncio.windows_events import NULL
from cmath import nan
from numpy import NAN, equal
import numpy
import pandas as pd
import numpy as np
import mysql.connector
import csv
import io
import os
import math
import os.path
from datetime import datetime
from dateutil.relativedelta import relativedelta

def ejecutarSQL(SQL):
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="movistarBase", 
                                    passwd="rootMovistar", 
                                    database="movistarBase")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    conexion1.commit()   
    conexion1.close()
    return True;
    
def consultarSQL(SQL):
    auxString = ""
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="movistarBase", 
                                    passwd="rootMovistar", 
                                    database="movistarBase")
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
                                    user="movistarBase", 
                                    passwd="rootMovistar", 
                                    database="movistarBase")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    for fila in cursor1:
        auxString.append(fila)
        #print(fila)
    conexion1.close()
    return auxString;
def isNaN(num):
    return num != num
def delete_Tables(df2):
    sql=""
    for column in df2:       
        sql = "DROP TABLE "+ str(column) +";"
        print(sql)
        ejecutarSQL(sql)


#READING ENTIDADES.CSV
df2 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/EntidadesOriginales.csv",sep=";", dtype=object)
print(df2) 
#print(df2.shape); print(df2.size); print(df2.columns); print(df2.dtypes) print(df2.iloc[0,:]); print("len",df2.iloc[0,:].size);

#TABLE DELETES
delete_Tables(df2)

#TABLE CREATIONS
sql=""
cab = []
#print(df2.shape[1])
col = df2.shape[1]; fil = df2.shape[0]; i=0; sql =""; list = []
for column in df2:
    list.append(str(column).lower())
    sql = "CREATE TABLE " + str(column).lower() + " (\n"
    #print("\t",sql)    
    array =  np.array(df2.iloc[:,i])  
    array = array[np.logical_not(isNaN(array))]
    j=0; aux=""
    for item in range(len(array)):  
        #print(j,"--",len(array))
        #print(j,"--",len(array), "ARRAY:",array[j])
        if (not(isNaN(array[j]))):
            aux=str(array[j]).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').upper().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            sql += "\t"+aux+" varchar(20) NOT NULL" 
            if(j < len(array)-1):
                sql += ",\n"
            else:
                sql += "\n"       
        j = j+1 
    i = i+1        
    sql += ");"
    print(sql)   
    ejecutarSQL(sql)


#READING 11 Tablero TM Noviembre.xlsx

df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/11 Tablero TM Noviembre.xlsx", sheet_name=None)

#Pospago=df3.get('Pospago')
#Cambio_de_Plan=df3.get('Cambio de Plan')
#Paq_Llamad_Ilim=df3.get('Paq. Llamad. Ilim.')
#Seguros=df3.get('Seguros')
#Mplay=df3.get('MPlay')
#CDF_FOX_HBO=df3.get('CDF-FOX-HBO')
#Prepago=df3.get('Prepago')
#NPS=df3.get('NPS')
#print("Pospago:\n",Pospago)
#print("Cambio_de_Plan:\n",Cambio_de_Plan)
#print("Paq_Llamad_Ilim:\n",Paq_Llamad_Ilim)
#print("Seguros:\n",Seguros)
#print("Mplay:\n",Mplay)
#print("CDF_FOX_HBO:\n",CDF_FOX_HBO)
#print("Prepago:\n",Prepago)
#print("NPS:\n",NPS)

#COMPARATION NAMES AND SHEET_NAMES/DATA CURATION
list = [name.lower() for name in list]
print("LIST:",list)
list2 = []; keysA=[];
for i in df3.keys(): 
    keysA.append(i)  
    aux=(((str(i).replace('. ','_')).replace('-','_')).replace(' ','_')).replace('.','')
    list2.append(aux)
list2 = [name.lower() for name in list2]
print("LIST2:",list2)

#CHARGING SHEET_NAMES to LIST
list3= []; valores = []; 
i=0
for try1 in list:
    if (try1 in list2):
        #print(list2.index(try1),"=>",keysA[list2.index(try1)])
        list3.append(keysA[list2.index(try1)])
        valores.append(df3.get(keysA[list2.index(try1)]))
        i += 1
print("KEYS:",list3)
#valores= numpy.array([numpy.empty([])]*n,dtype=str)

#LIMPIEZA DE TABLAS
for item in list:
    ejecutarSQL("DELETE FROM "+str(item)+";")

"""
#CREACION DE INSERTS
i=0; 
for item in list:
    sql2 = ""
    cont = 0
    array =  np.array(df2.iloc[:,i])  
    array = array[np.logical_not(isNaN(array))]
    #print(array)
    j=0;
    for item in range(len(array)):  
        #print(j,"--",len(array))
        #print(j,"--",len(array), "ARRAY:",array[j])     
        cont = len(array)
        if (not(isNaN(array[j]))):
            sql2 += str(array[j])
            if(j < len(array)-1):                
                sql2 += ", "
            else:               
                sql2 += " "
        j = j+1
    print("\n\tCONTADOR INSERTS:",cont)
    for k in range(valores[i].shape[0]):
        insertA=""
        for l in range(cont):
            if (not(isNaN(valores[i].iloc[k,l]))):
                insertA += "'"+(str(valores[i].iloc[k,l])).replace("\n","")+"'"
            else:
                insertA +="''"
            if (l < cont-1):
                insertA += ","
            else:
                insertA += ""
        #print("\n",insertA)
        sql = "INSERT INTO " + list[i]+" ("+ str(sql2) +") VALUES (" +str(insertA) +")"
        #print("\nSQL:\n",sql)         
        #ejecutarSQL(sql)
    i+=1
"""  




