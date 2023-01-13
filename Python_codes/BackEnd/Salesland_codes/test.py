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

KEYS = ['Personal Ppto vs Real','BDD Cnet','Pospago', 'Cambio de Plan', 'Terminales', 'Paq. Llamad. Ilim.', 'Seguros', 'MPlay', 'CDF-FOX-HBO', 'Retenciones', 'Prepago', 'NPS']

#READING 11 Tablero TM Noviembre.xlsx
df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/11 Tablero TM Noviembre.xlsx", sheet_name=None)
"""
hojas = []; i=0; varCab= []; atri=[];
for item in KEYS:
    #print("\n",item)
    #print(df3.get(item))    
    hojas.append(df3.get(item))
    if (item == 'Personal Ppto vs Real'):
        hojas[i].rename(columns=hojas[i].iloc[0], inplace = True)
    j=0
    cab = []
    for col in hojas[i]:  
        #print("\tCOL\t",j,":",col)
        if (("Unnamed") not in str(col)):
            cab.append(str(col).replace('. ','_').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').upper().replace('Ó','O').replace('É','E').replace('Ú','U'))
            j+=1
    #print("\tCAB:\t",cab)
    varCab.append(cab)
    i+= 1
print(varCab)

#TABLE CREATIONS
df2 = np.array(varCab, dtype=object)
print("\n",df2[1])
"""
