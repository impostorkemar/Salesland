from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Date, Numeric, Float
from config.db import meta, engine

usuarios = Table("usuario", meta, 
    Column("clave", String(255), primary_key=True),
    Column("cedula", String(255)),
    Column("tipo", String(255)),
    Column("nombre_usuario", String(255)),
    Column("usuario", String(255)),
    Column("password", String(255))
)

ventas = Table("venta", meta, 
    Column("id_centro_costo", String(255), primary_key=True),
    Column("id_linea", String(255), primary_key=True),
    Column("codigo_pdv", String(255), primary_key=True),
    Column("ventas_mabe", String(255)),
    Column("ventas_indurama", Integer, primary_key=True),
    Column("ventas_whirlpool", String(255)),
    Column("ventas_lg", String(255)),
    Column("ventas_samsung", String(255)),
    Column("ventas_electrolux", String(255)),
    Column("mastertech", String(255), primary_key=True),
    Column("hove", String(255)),
    Column("teka", String(255)),
    Column("smc", String(255)),
    Column("otros", String(255)),
    Column("validacion", String(255))
)

lineas = Table("linea", meta, 
    Column("id_linea", String(255), primary_key=True),
    Column("codigo_pdv", String(255),primary_key=True),
    Column("cuota", String(255)),
    Column("nombre_linea", String(255))    
)

puntos_ventas = Table("punto_venta", meta, 
    Column("codigo_pdv", String(255), primary_key=True),
    Column("clave", String(255),primary_key=True),
    Column("nombre_pdv", String(255)),
    Column("retail_mapping", String(255)),
    Column("cobertura", String(255)),
    Column("nombre_cliente_hijo", String(255))    
)


meta.create_all(engine)