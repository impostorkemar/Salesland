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
import time
import re
old = time.time()
time_suspend = 5

def ejecutarSQL(SQL):
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="mabeSys", 
                                    passwd="rootmabe", 
                                    database="mabesys")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    conexion1.commit()   
    conexion1.close()
    return True;
    
def consultarSQL(SQL):
    auxString = ""
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="mabeSys", 
                                    passwd="rootmabe", 
                                    database="mabesys")
    cursor1=conexion1.cursor()
    cursor1.execute(SQL)
    for fila in cursor1:
        auxString += str(fila) +"\n"
        #print(fila)
    conexion1.close()
    return auxString;

def consultarSQL2(SQL):
    auxString = ""
    conexion1=mysql.connector.connect(host="localhost", 
                                    user="mabeSys", 
                                    passwd="rootmabe", 
                                    database="mabesys")
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
                                    user="mabeSys", 
                                    passwd="rootmabe", 
                                    database="mabesys")
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

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def obtainColumn(df2,consult,consult2):
    j=0; array = []; result=-1;
    for row in df2:        
        array = np.array(df2.iloc[:,j])
        array = array[np.logical_not(isNaN(array))]        
        i=0;
        for col in array:         
            #consult = col  
            strAux=str(row).lower().replace(" ","_")
            #print("res: ",result,"\t[row:",strAux,"col:",col,"]\t\t\t[consult:",consult,"consult2:",consult2,"]", i ,j)
            #if (strAux==consult2): print("\tTRUE1-> [row==consult2]:[",strAux,"=",consult2,"]")
            #if (col==consult): print("\tTRUE2-> [col==consult]:[",col,"=",consult,"]")
            if (strAux==consult2 and col==consult):                               
                for cont in range(len(array)):
                    if array[cont] == consult:
                        result = cont
                #print("\tres: ",result, "ARRAY: ", array)
            i+=1
        j+=1
    return result,i,j

def calculateLadder(tarifa):    
    if (is_number(tarifa)):
        if (tarifa>=0 and tarifa<9.99):
            return 1
        elif (tarifa>=9.99 and tarifa<12.99):
            return 2
        elif (tarifa>=12.99 and tarifa<15):
            return 3
        elif (tarifa>=15 and tarifa<19.99):
            return 4
        elif (tarifa>=19.99 and tarifa<24.99):
            return 5
        elif (tarifa>=24.99 and tarifa<29.99):
            return 6
        elif (tarifa>=29.99 and tarifa<35):
            return 7
        elif (tarifa>=35):
            return 8
        else:
            return 0
    else:
        return -1
def obtainColumnDf3(df3,consult,consult2,list3):
    i=0; array = []; resultCol=-1; resultSheet=-1; 
    for sheet in df3:        
        j=0;                
        auxT=str(list3[i]).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').lower().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
        #print(auxT)
        for row in sheet:     
            auxC=str(row).replace(':','').replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').lower().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            #print("\t",auxC)
            #print(auxC,consult)           
            if (auxT == consult2 and auxC == consult): 
                #print( i , j, auxT, ":\t",consult2, "\t",auxC, ":\t",consult, "\t")               
                resultSheet=i;  resultCol=j;       
                break; 
            j+=1
        #print("\n================================")
        i+=1        
    return resultCol,resultSheet



    #READING Rutero.CSV
df4 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/Rutero Ene-23.xlsx", sheet_name=None)
#print(df4)

list2 = []; keysA=[];
for i in df4.keys(): 
    keysA.append(i)  
    aux=(((str(i).replace('. ','_')).replace('-','_')).replace(' ','_')).replace('.','')
    list2.append(aux)    
list2 = [name.lower() for name in list2]
print("LIST2:",list2)
print("keysA:",keysA)

list3= []; valores = []; 
i=0
for try1 in list2:    
    #print(list2.index(try1),"=>",keysA[list2.index(try1)])
    list3.append(keysA[list2.index(try1)])
    valores.append(df4.get(keysA[list2.index(try1)]))
    i += 1
print("KEYS:",list3)
#print("VALORES:",valores)
#print("VALORES:",valores[4].iloc[0,0])

"""
ejecutarSQL("DELETE FROM usuario")

#INSERCION USUARIOS
i=0; aux = -2; fil=-1; col=-1;
for item in list2:
    sql2 = ""; cont = 0; 
    if (item == 'ruta_promotor'):
        print(i,"->",item,":",valores[i].shape[0],"-",valores[i].shape[1])
        for k in range(valores[i].shape[0]):  
            insertA=""; flag = 0;
            aux = str(valores[i].iloc[k,13])     
            #print("\nAUX:",aux)     
            #print("CONSULT2:",aux3,str(x2.group()))
            print("\nAUX:",aux)
            if (isNaN(aux) or aux == NAN or aux == nan or aux == 'nan' ):
                print("Entre is nan")                
            else: 
                print("Entre is not nan")
                #print("\nAUX:",aux)
                if (is_number(aux)):  
                    print("Entre is number")
                    sql = "SELECT usuario.cedula FROM usuario WHERE cedula = '"+aux+"' LIMIT 1;"
                    #print("SQL1:",sql)
                    aux2 = consultarSQL(sql)
                    x = re.search("(?<=').+(?=')", aux2)
                    print("AUX2:",aux2)                    
                    insertA += ("'"+(str(valores[i].iloc[k,13])+"','promotor','"+str(valores[i].iloc[k,14])+"','"
                    +str(valores[i].iloc[k,13])+"','"+str(valores[i].iloc[k,13])).replace("\n","")+"'")
                    print("INSERT:",insertA)
                    if (isNaN(str(aux2)) or str(aux2) == NAN or str(aux2) == nan or str(aux2)=='nan' or str(aux2)==""):                        
                        print("Registrar")                        
                        sql = "INSERT INTO usuario (cedula,tipo,nombre_usuario,usuario,password) VALUES (" +str(insertA) +")"
                        print("SQL:",k,"\t --->",sql,"\n") 
                        ejecutarSQL(sql)  
                        ejecutarSQL("COMMIT;")                        
                    else:
                         print("No registrar")                   
                else: 
                    print("Entre is not number")
    i+=1
"""

    #READING 10. Cuota SO Noviembre 2022 (final).xlsx
df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/01. Cuota Enero SO 2023 Ajustada.xlsx", sheet_name=None)
#print(df3)


list2 = []; keysA=[];
for i in df3.keys(): 
    keysA.append(i)  
    aux=(((str(i).replace('. ','_')).replace('-','_')).replace(' ','_')).replace('.','')
    list2.append(aux)    
list2 = [name.lower() for name in list2]
print("LIST2:",list2)
print("keysA:",keysA)

list3= []; valores = []; 
i=0
for try1 in list2:    
    #print(list2.index(try1),"=>",keysA[list2.index(try1)])
    list3.append(keysA[list2.index(try1)])
    valores.append(df3.get(keysA[list2.index(try1)]))
    i += 1
print("KEYS:",list3)
#print("VALORES:",valores)
#print("VALORES:",valores[4].iloc[0,0])

i=0; aux = -2; fil=-1; col=-1;
for item in list2:
    sql2 = ""; cont = 0; 
    if (item == 'cuota_x_pdv'):
        print(i,"->",item,":",valores[i].shape[0],"-",valores[i].shape[1])
        for k in range(5):  
            insertA=""; flag = 0;
            for l in range(valores[i].shape[1]):                 
                if (isNaN(str(valores[i].iloc[k,l])) or str(valores[i].iloc[k,l]) == NAN or  
                str(valores[i].iloc[k,l])==nan or str(valores[i].iloc[k,l])=='nan'):
                    insertA += "''"
                    flag +=1
                else:
                    insertA += "'"+(str(valores[i].iloc[k,l])).replace("\n","")+"'"
                if (l < (valores[i].shape[1])-1):
                    insertA += ","
                else:
                    insertA += ""  
            if (flag<(valores[i].shape[1])):
                print("\nFLAG:",flag,"INSERT:",insertA)  
            #for l in range(cont):                               
            #    
            #sql = "INSERT INTO " + list[i]+" ("+ str(sql2) +") VALUES (" +str(insertA) +")"
            #print("\nSQL:\n",sql)
            #ejecutarSQL(sql)  
    i+=1




