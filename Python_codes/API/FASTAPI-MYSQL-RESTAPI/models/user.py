from sqlalchemy import Table, Column
from sqlalchemy.sql.sqltypes import Integer, String, Date, Numeric, Float
from config.db import meta, engine

users = Table("users", meta, 
    Column("id", Integer, primary_key=True),
    Column("name", String(255)),
    Column("email", String(255)),
    Column("password", String(255))
)

usuarios = Table("usuario", meta, 
    Column("id_usuario", Integer, primary_key=True),
    Column("cedula", String(10)),
    Column("nombre_usuario", String(20)),
    Column("password", String(10))
)

candidatos = Table("candidato", meta, 
    Column("cedula", String(10), primary_key=True),
    Column("nombre", String(80)),
    Column("apellido", String(80)),
    Column("genero", String(50)),
    Column("direccion_domicilio", String(20)),
    Column("ciudad", String(20)),
    Column("provincia", String(50)),
    Column("estado_civil", String(20)),
    Column("telefono_celular", String(10)),
    Column("telefono_casa", String(10)),
    Column("direccion_correo", String(50)),
    Column("telefono_celular", String(10)),
    Column("fecha_nacimiento", String(10)),
    Column("edad", Numeric),
    Column("nacionalidad", String(20)),
     Column("status", String(20))

)

experiencia_laborales = Table("experiencia_laboral", meta, 
    Column("id_experiencia_laboral", Integer, primary_key=True),
    Column("cedula", String(10)),
    Column("nombre_experiencia", String(50)),
    Column("tiempo_experiencia", Numeric),
    Column("estudios_universitarios", Numeric)
)

cargos = Table("cargo", meta, 
    Column("id_cargo", Numeric, primary_key=True),
    Column("nombre_Cargo", String(50))    
)

contratos = Table("contrato", meta, 
    Column("id_contrato", Integer, primary_key=True),
    Column("tipo_contrato", String(100)),
    Column("fecha_inicio_contrato", String(10)),   
    Column("salario", Float), 
    Column("observaciones", String(20))
)

centro_costos = Table("centro_costo", meta, 
    Column("id_centro_costo", Numeric(10), primary_key=True),
    Column("nombre_centro", String(50)),
    Column("tienda", String(20)),   
    Column("cuenta", String(20))
)

personales = Table("personal", meta, 
    Column("id_personal", Integer, primary_key=True),
    Column("id_centro_costo", Numeric(10), primary_key=True),
    Column("cedula", String(10), primary_key=True),
    Column("status", String(20)),   
    Column("adendum_contrato", String(20)),
    Column("id_contrato", Integer),
    Column("id_cargo", Numeric)
)

meta.create_all(engine)