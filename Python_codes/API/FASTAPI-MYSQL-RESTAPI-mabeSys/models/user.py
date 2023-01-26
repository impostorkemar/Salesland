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
    Column("id_venta", Integer, primary_key=True, autoincrement=True),
    Column("id_linea", Integer, primary_key=True),
    Column("codigo_pdv", Integer, primary_key=True),
    Column("ventas_mabe", Numeric(255)),
    Column("ventas_indurama",  Numeric(255)),
    Column("ventas_whirlpool", Numeric(255)),
    Column("ventas_lg", Numeric(255)),
    Column("ventas_samsung", Numeric(255)),
    Column("ventas_electrolux", Numeric(255)),
    Column("mastertech", Numeric(255)),
    Column("hove", Numeric(255)),
    Column("teka", Numeric(255)),
    Column("smc", Numeric(255)),
    Column("otros", Numeric(255)),
    Column("validacion", Numeric(255))
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