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

    #READING ENTIDADES.CSV
df2 = pd.read_csv("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/EntidadesOriginales.csv",sep=";", dtype=object)
#print(df2) 
#print(df2.shape); print(df2.size); print(df2.columns); print(df2.dtypes) print(df2.iloc[0,:]); print("len",df2.iloc[0,:].size);
    #READING 11 Tablero TM Noviembre.xlsx
df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/Python_codes/BackEnd/Salesland_codes/11 Tablero TM Noviembre.xlsx", sheet_name=None)

"""
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
            sql += "\t"+aux+" varchar(50) NOT NULL" 
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

def obtainColumnDf3(valores,consult,consult2):
    i=0; array = []; resultCol=-1; resultSheet=-1; 
    for sheet in valores:        
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

#LIMPIEZA DE TABLAS
for item in list:
    ejecutarSQL("DELETE FROM "+str(item)+";")

fil, col = (obtainColumnDf3(valores,"tipo","bdd_cnet"))
print(fil,col,"\n")
#i=1; l=1;
#print("\n",df2.iloc[:,i][l],str(list[i]).replace(" ","_"))
#fil, col = (obtainColumnDf3(valores,str(df2.iloc[:,i][l]).lower(),str(list[i]).replace(" ","_")))
#print(fil,col)
#print("\n",str(valores))
#print("\n",str(valores[1].iloc[0,0]))

#print(str(valores[1].iloc[658,0]))

#CREACION DE INSERTS
i=0; aux = -2; fil=-1; col=-1;
for item in list:
    sql2 = ""; cont = 0;
    array =  np.array(df2.iloc[:,i])  
    array = array[np.logical_not(isNaN(array))]
    #print(array)
    j=0;
    for item2 in range(len(array)):
        cont = len(array)
        if (not(isNaN(array[j]))):
            sql2 += str(array[j]).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').upper().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            if(j < len(array)-1):                
                sql2 += ", "
            else:               
                sql2 += " "
        j = j+1              
    kAux=1;
    for k in range(valores[i].shape[0]):        
        insertA=""; fil=-1; aux=-1; col=-1
        for l in range(cont):                               
            aux=str(df2.iloc[:,i][l]).replace(',','_').replace('. ','_').replace("'","_").replace('º','').replace('-','_').replace(' ','_').replace('.','').replace('+','').replace('/','_').replace('___','_').replace('__','_').replace('%','').lower().replace('Ó','O').replace('É','E').replace('Ú','U').replace('Í','Í').replace('Á','A')
            aux2=str(list[i]).replace(" ","_")
            col,fil = (obtainColumnDf3(valores,aux,aux2))
            #print("\n\ti:",i,"k:",k,"fil:",fil,aux,aux2,"\n\t")
            if (isNaN((valores[i].iloc[k,col]))):
                insertA += "''"
            else:
                insertA += "'"+(str(valores[i].iloc[k,col])).replace("\n","").upper()+"'"
            if (l < cont-1):
                insertA += ","
            else:
                insertA += "" 
        sql = "INSERT INTO " + list[i]+" ("+ str(sql2) +") VALUES (" +str(insertA) +")"
        print("\nSQL:\n",sql)
        ejecutarSQL(sql)
    k+=1
    i+=1


KEYS2 = ['Producto','ALTAS DOMICILIADO','TRANSFERENCIAS DOMICILIADO','ALTAS PAGO EN CAJA','TRANSFERENCIAS PAGO EN CAJA',
'Diferido Altas Dom','Diferido Transfer. Dom.','Diferido Altas Pago en Caja','Diferido Transfer. Pago en Caja',
'Bono Actividad Comercial','escalera']
df3['Comisiones'].columns = df3['Comisiones'].iloc[0]
df3['Comisiones'] = df3['Comisiones'].iloc[1:].reset_index(drop=True)
df3['Comisiones'].drop(df3['Comisiones'].columns[[0]], axis=1, inplace=True)
#print(df3['Comisiones'])

ejecutarSQL("DELETE FROM comisiones;")
ejecutarSQL("DROP TABLE IF EXISTS comisiones;")


sql = "CREATE TABLE comisiones (\n"; k=0; auxArr=""
for item in KEYS2:
    sql += item.lower().replace(" ","_").replace(".","") +" varchar(50) NOT NULL"
    auxArr += item.lower().replace(" ","_").replace(".","")
    if(k < len(KEYS2)-1):
        sql += ",\n"
        auxArr += ","
    else:
        sql += "\n"        
    k +=1
sql += ")"
ejecutarSQL(sql)

i=0; 
for item in range(df3['Comisiones'].shape[0]-14):   
    sql=""; auxROw="";
    #print(item,"\n")     
    j=0
    for rowF in range(len(KEYS2)):        
        #print(i,"\t",j,"\t",auxROw) 
        if (j < len(KEYS2)-1):
            if (isNaN(df3['Comisiones'].iloc[i,j])):
                auxROw += "''"            
            elif(is_number(df3['Comisiones'].iloc[i,j])):
                auxROw += str(round(float(df3['Comisiones'].iloc[i,j]),2))         
            else:
                auxROw += str(df3['Comisiones'].iloc[i,j])
        else:
            auxROw += str(calculateLadder((df3['Comisiones'].iloc[i,0])))
        if (j < len(KEYS2)-1):
            auxROw += ","            
        j+=1
    sql += "INSERT INTO " + 'comisiones'+" ("+ str(auxArr) +") VALUES (" +str(auxROw) +")"    
    print("\nSQL:\n",sql)
    ejecutarSQL(sql)
    i+=1
"""
KEYS3 = ['PRONOPRO','CATEGORY_3','ESTADO','CATEGORY_2']
#print(df3['Cruces'].columns)

ejecutarSQL('DELETE FROM cruceRetenciones;')
ejecutarSQL('DROP TABLE IF EXISTS cruceRetenciones;')

sql = "CREATE TABLE cruceRetenciones (\n"; k=0; auxArr=""
for item in KEYS3:
    sql += item.lower().replace(" ","_").replace(".","") +" varchar(50) NOT NULL"
    auxArr += item.lower().replace(" ","_").replace(".","")
    if(k < len(KEYS3)-1):
        sql += ",\n"
        auxArr += ","
    else:
        sql += "\n"        
    k +=1
sql += ")"
ejecutarSQL(sql)

def obtainColIndex(list,consult):
    i=0
    for item in list:
        if (item == consult):
            return i
        i+=1

index=0; array = df3['Cruces'].columns.tolist(); 
#print(array,"\n") 

for row in range(df3['Cruces'].shape[0]-1):
    insert = "";l=0;flag=0; sql=""
    for consul in KEYS3:        
        if (consul in df3['Cruces'].columns):        
            #print("\tConsult:",consul,"\nPos:",obtainColIndex(array,consul))
            if (not isNaN(df3['Cruces'].iloc[index,obtainColIndex(array,consul)])):
                insert +="'"+str(df3['Cruces'].iloc[index,obtainColIndex(array,consul)]).upper()+"'"
                flag += 0
            else:
                insert +=("''")
                flag += 1
            if (l < len(KEYS3)-1):
                insert += ","
            else:
                insert += "" 
        else:            
            flag += 1 
        l+=1
    if (flag == 4):
        row = df3['Cruces'].shape[0] 
        break;
    #print(flag, row) 
    sql += "INSERT INTO " + 'cruceRetenciones'+" ("+ str(auxArr).lower() +") VALUES (" +str(insert) +")"
    print("\n",sql)  
    ejecutarSQL(sql)          
    index+=1



