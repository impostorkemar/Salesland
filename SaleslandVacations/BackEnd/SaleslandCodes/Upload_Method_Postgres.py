from hashlib import new
import psycopg2
import pandas as pd
import csv
import io
import os
import pathlib

class conectionsParameters:
    inHost = ""; 
    inDatabase = ""; 
    inUser = ""; 
    inPassword = ""; 
    inPort = 0;
projectPath = str(pathlib.Path().absolute()).replace("\\","/") + "/"
filePath = str(os.path.dirname(os.path.abspath(__file__))).replace("\\","/") + "/"

def crear_parametrosBase(aux_host,aux_database,aux_user,aux_password,aux_port):
    conectionsParameters.inHost = aux_host
    conectionsParameters.inDatabase = aux_database
    conectionsParameters.inUser = aux_user
    conectionsParameters.inPassword = aux_password
    conectionsParameters.inPort = aux_port    
    return True

def ejecutarSQL(SQL):
    try:        
        conn = psycopg2.connect(user=conectionsParameters.inUser,
                                password=conectionsParameters.inPassword,
                                host=conectionsParameters.inHost,
                                port=conectionsParameters.inPort,
                                database=conectionsParameters.inDatabase)
        cursor = conn.cursor()
        cursor.execute(SQL)
        conn.commit()   
        conn.close()
        print("Ejecución SQL exitosa:\t", SQL)        
    except OSError as err:
        print("OS Error:", err)        
    except ValueError as err:
        print("Value Error", err)        
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")        
        raise

def consultarSQL(SQL):
    try:
        #crear conexion
        conn = psycopg2.connect(user=conectionsParameters.inUser,
                                    password=conectionsParameters.inPassword,
                                    host=conectionsParameters.inHost,
                                    port=conectionsParameters.inPort,
                                    database=conectionsParameters.inDatabase)
        #crear cursor
        cursor = conn.cursor()
        cursor.execute(SQL)
        for fila in cursor:
            print(fila)    
        #Cerrar conexion
        conn.close()
        print("Ejecución SQL exitosa:\t", SQL)        
    except OSError as err:
        print("OS Error:", err)        
    except ValueError as err:
        print("Value Error", err)        
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")        
        raise

def CSV_TODATAFRAME(nombreArchivo):
    #Carga de excel a dataframe
    df2 = pd.read_csv(projectPath + "Salesland_codes/" + nombreArchivo)     
    return df2

def insertarDataCentroCosto(df2):
    #Insercion en tabla desde dataframe    
    for i in range(df2.shape[0]):
        list = []
        sql="INSERT INTO centro_costo(id_centro_costo, nombre_centro, tienda, cuenta) VALUES";
        for j in range(df2.iloc[0,:].size):
            list.append(df2.iloc[i,:][j])
        #print(list)
        datos = (int(list[0]),list[1],list[2],list[3])
        sql = sql + str(datos) 
        #print("sql:",sql)
        ejecutarSQL(sql)

crear_parametrosBase("localhost","salesland","salesland","rootsalesland",5432)
df2 = CSV_TODATAFRAME("centro_costos3.csv")
df3 = CSV_TODATAFRAME("archivo_madre.csv")
#print(df2); print(df3);
ejecutarSQL("DELETE FROM centro_costo")
insertarDataCentroCosto(df2)