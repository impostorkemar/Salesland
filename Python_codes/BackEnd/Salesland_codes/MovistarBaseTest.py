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
old = time.time()
time_suspend = 5

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

    #READING ENTIDADES.CSV
df2 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/EntidadesOriginales.csv",sep=";", dtype=object)
#print(df2) 
#print(df2.shape); print(df2.size); print(df2.columns); print(df2.dtypes) print(df2.iloc[0,:]); print("len",df2.iloc[0,:].size);
    #READING 11 Tablero TM Noviembre.xlsx
df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/11 Tablero TM Noviembre.xlsx", sheet_name=None)

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

def obtainColumnDf3(df3,consult,consult2):
    j=0; array = []; result=-1; 
    for row in df3:        
        i=0
        for col in df3[row]:
            auxT=str(row).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').lower().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            auxC=str(col).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').upper().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            #print(auxC,consult)
            if (auxT == consult2 and auxC == consult):
                print(auxT, ":\t",consult2, "---\t",auxC, ":\t",consult)
                result=i
            i+=1
        j+=1        
    return result,i,j

aux, fil, col = (obtainColumnDf3(df3,"NAE","personal_ppto_vs_real"))
print(aux,fil,col)

#print("\n",str(valores[1].iloc[2,0]))

"""
#CREACION DE INSERTS
i=0; aux = -2; fil=-1; col=-1;
for item in list:
    sql2 = ""; cont = 0;
    array =  np.array(df2.iloc[:,i])  
    array = array[np.logical_not(isNaN(array))]
    #print(array)
    j=0;
    for item2 in range(len(array)):  
        #print(j,"--",len(array))
        #print(j,"--",len(array), "ARRAY:",array[j])     
        cont = len(array)
        if (not(isNaN(array[j]))):
            sql2 += str(array[j]).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').upper().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            if(j < len(array)-1):                
                sql2 += ", "
            else:               
                sql2 += " "
        j = j+1      
      
    #print("\nItem: ",i,":",j,":\t",str(sql2))
    #print("\n\t",item,"\tCONTADOR INSERTS:",cont)
    #print("VAL: \n",valores[i].iloc[1,:][1])    
    #print(valores)
    kAux=1;
    for k in range(valores[i].shape[0]):        
        insertA=""; fil=-1; aux=-1; col=-1
        for l in range(cont):                               
            aux, fil, col = (obtainColumnDf3(df2,df2.iloc[:,i][l],str(list[i]).replace(" ","_")))
            #print(str(list3[i]).replace(" ","_"),":\t",aux,fil,col,"\tInsert:", valores[i].iloc[fil,aux],"\tConsult:",df2.iloc[:,i][l])
            if (i == 0):
                insertA += "'"+(str(valores[i].iloc[kAux,aux])).replace("\n","")+"'"
            else:                      
                insertA += "'"+(str(valores[i].iloc[k,aux])).replace("\n","")+"'"     
            #print(obtainColumn(df2,valores[i].iloc[k,l],item))                
            #print(insertA)
            #print(i," [",k,aux,"]\n")
            if (l < cont-1):
                insertA += ","
            else:
                insertA += ""        
        #print(str(list3[i]).replace(" ","_"),'\n',str(sql2),'\n\t',insertA,"\n") 
        sql = "INSERT INTO " + list[i]+" ("+ str(sql2) +") VALUES (" +str(insertA) +")"
        #print(i," [",k,aux,"]","\nSQL:\n",sql)  
        print("\nSQL:\n",sql)
        ejecutarSQL(sql)
    k+=1
    i+=1
"""





