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


def borrarTables():
    ejecutarSQL("DELETE FROM usuario;")
    ejecutarSQL("DELETE FROM linea;")
    ejecutarSQL("DELETE FROM punto_venta;")
    ejecutarSQL("DELETE FROM supervisor;")

def cargarPuntoVenta(): 
        #READING 10. Cuota SO Noviembre 2022 (final).xlsx
    df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/SaleslandMabe/BackEnd/Salesland_codes/01. Cuota Enero SO 2023 Ajustada.xlsx", sheet_name=None)
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
    ejecutarSQL("ALTER TABLE punto_venta AUTO_INCREMENT=1")
    i=0; aux = -2; fil=-1; col=-1;
    for item in list2:
        sql2 = ""; cont = 0; 
        if (item == 'cuota_x_pdv'):
            print(i,"->",item,":",valores[i].shape[0],"-",valores[i].shape[1])
            aires = 0; cocinas = 0; empotre = 0; globales = 0; lavado = 0; refrigeracion = 0;
            for k in range(valores[i].shape[0]):  
                insertA=""; flag = 0;
                #clave = ejecutarSQL("SELECT clave FROM usuario WHERE nombre_usuario = 'Mayra Liliana Mendia';")
                sql3 = "SELECT nombre_pdv FROM punto_venta WHERE nombre_pdv = '"+str(valores[i].iloc[k,7])+"' LIMIT 1;"
                clave3 = consultarSQL(sql3) 
                aux = str(valores[i].iloc[k,7])
                #print(aux)            
                if (isNaN(aux) or aux == NAN or aux == nan or aux == 'nan' ):
                    #print("Entre is nan")  
                    aux6 = ""              
                else:      
                    print("\tPUNTO_VENTA:",str(valores[i].iloc[k,7]))
                    if (aux != 'TIENDA HMPV'):  
                        print("\tLINEA:",str(valores[i].iloc[k,9]))  
                        print("\tCUOTA:",str(valores[i].iloc[k,26])) 
                        auxCuota = float(valores[i].iloc[k,26])                   
                        if str() == "AIRES":
                            aires += float(auxCuota)
                        elif str(valores[i].iloc[k,9]) == "COCINAS":
                            cocinas += float(auxCuota)
                        elif str(valores[i].iloc[k,9]) == "EMPOTRE":
                            empotre += float(auxCuota)
                        elif str(valores[i].iloc[k,9]) == "GLOBALES":
                            globales += float(auxCuota)
                        elif str(valores[i].iloc[k,9]) == "LAVADO":
                            lavado += float(auxCuota)
                        elif str(valores[i].iloc[k,9]) == "REFRIGERACIÓN":
                            refrigeracion += float(auxCuota)
                        print("CUOTA:",aires , cocinas, empotre, globales, lavado, refrigeracion,"\n")
                        if (clave3 == "" ):                        
                            insertA = "'"+str(valores[i].iloc[k,7])+"','"+str(valores[i].iloc[k,8])+"','"+str(valores[i].iloc[k,15])+"','"+str(valores[i].iloc[k,5])+"'"             
                            sql4 = "INSERT INTO punto_venta (nombre_pdv,retail_mapping,cobertura,nombre_cliente_hijo) VALUES (" +str(insertA) +");"
                            print("SQL:\t",sql4)
                            ejecutarSQL(sql4)     
        i+=1

def cargarSupervisor():
    df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/SaleslandMabe/BackEnd/Salesland_codes/01. Cuota Enero SO 2023 Ajustada.xlsx", sheet_name=None)
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
    #INSERCION PROMOTORES
    ejecutarSQL("ALTER TABLE supervisor AUTO_INCREMENT=1")
    i=0; aux = -2; fil=-1; col=-1;
    for item in list2:
        sql2 = ""; cont = 0; 
        if (item == 'cuota_x_pdv'):
            print(i,"->",item,":",valores[i].shape[0],"-",valores[i].shape[1])
            for k in range(valores[i].shape[0]):  
                insertA=""; flag = 0;            
                clave = consultarSQL("SELECT id_supervisor FROM supervisor WHERE nombre_supervisor = '"+str(valores[i].iloc[k,13])+"' LIMIT 1;")                      
                if (clave == "" ):              
                    print("\tPUNTO_VENTA:",str(valores[i].iloc[k,7]), "SUPERVISOR:",str(valores[i].iloc[k,13]))    
                    if (str(valores[i].iloc[k,13]) != nan and str(valores[i].iloc[k,13]) != NAN):        
                        insertA = "'"+str(valores[i].iloc[k,13])+"'" 
                        sql4 = "INSERT INTO supervisor (nombre_supervisor) VALUES (" +str(insertA) +");"
                        print("SQL:\t",sql4)
                        ejecutarSQL(sql4)     
        i+=1
 
def cargarLinea():
    df3 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/SaleslandMabe/BackEnd/Salesland_codes/01. Cuota Enero SO 2023 Ajustada.xlsx", sheet_name=None)
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
        #INSERT LINEA
    ejecutarSQL("ALTER TABLE linea AUTO_INCREMENT=1")
    ref = consultarSQL_Lista("SELECT codigo_pdv FROM punto_venta;")
    for item in range(len(ref)):
        #print("Item:",ref[item],"-->")
        x = re.search('\d+', str(ref[item]))    
        insert1 = "'"+str(x.group())+"','0','AIRES'"
        insert2 = "'"+str(x.group())+"','0','COCINAS'"
        insert3 = "'"+str(x.group())+"','0','EMPOTRE'"
        insert4 = "'"+str(x.group())+"','0','GLOBALES'"
        insert5 = "'"+str(x.group())+"','0','LAVADO'"
        insert6 = "'"+str(x.group())+"','0','REFRIGERACIÓN'"

        ejecutarSQL("INSERT INTO linea(codigo_pdv,cuota,nombre_linea) values("+str(insert1)+");")
        ejecutarSQL("INSERT INTO linea(codigo_pdv,cuota,nombre_linea) values("+str(insert2)+");")
        ejecutarSQL("INSERT INTO linea(codigo_pdv,cuota,nombre_linea) values("+str(insert3)+");")
        ejecutarSQL("INSERT INTO linea(codigo_pdv,cuota,nombre_linea) values("+str(insert4)+");")
        ejecutarSQL("INSERT INTO linea(codigo_pdv,cuota,nombre_linea) values("+str(insert5)+");")
        ejecutarSQL("INSERT INTO linea(codigo_pdv,cuota,nombre_linea) values("+str(insert6)+");")

        print("INSERT: "+str(x.group()))

def cargarUsuario():
    #READING Rutero.CSV
    df4 = pd.read_excel("C:/Users/user/Documents/GitHub/Salesland/SaleslandMabe/BackEnd/Salesland_codes/Rutero Ene-23.xlsx", sheet_name=None)
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

    for l  in range(1000):
        n=0

    #INSERCION USUARIOS
    ejecutarSQL("ALTER TABLE usuario AUTO_INCREMENT=1")
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
                        if (aux2 == ""):  
                            print("Entre")
                            clave4 = consultarSQL("SELECT codigo_pdv FROM punto_venta WHERE nombre_pdv = '"+str(valores[i].iloc[k,4])+"' LIMIT 1")
                            print("SELECT codigo_pdv FROM punto_venta WHERE nombre_pdv = '"+str(valores[i].iloc[k,4])+"' LIMIT 1")                       
                            x = re.search('\d+', clave4)
                            print("CLave4:",clave4, "x:",x)
                            if (not(clave4 == "")):                            
                                clave = consultarSQL("SELECT id_supervisor FROM supervisor WHERE nombre_supervisor = '"+str(valores[i].iloc[k,18])+"' LIMIT 1;")                  
                                x2 = re.search('\d+', clave)
                                print("CLave:",clave, "x:",x2)
                                if (not(clave == "")):
                                    insertA += "'"+str(valores[i].iloc[k,13])+"','"+str((x.group())+"','"+str(x2.group())+"','promotor','"+str(valores[i].iloc[k,14])+"','"+str(valores[i].iloc[k,13])+"','"+str(valores[i].iloc[k,13])).replace("\n","")+"','promotor_base'"
                                    print("INSERT:",insertA)
                                    sql = "INSERT INTO usuario (cedula,codigo_pdv,id_supervisor,tipo,nombre_usuario,usuario,password,cargo) VALUES (" +str(insertA) +")"
                                    print("SQL:",k,"\t --->",sql) 
                                    ejecutarSQL(sql)
                        else:
                            print("No registrar")                   
                    else: 
                        print("Entre is not number")
        i+=1

#borrarTables();
#cargarPuntoVenta();
#cargarSupervisor();
ejecutarSQL("DELETE FROM linea")
cargarLinea();
cargarUsuario();


