from typing import Optional
from pydantic   import BaseModel

class Usuario(BaseModel):
    clave: str
    cedula: str
    tipo: str
    nombre_usuario: str
    usuario: str       
    password: str

class Venta(BaseModel):
    id_centro_costo: int
    id_linea: int
    codigo_pdv: str
    ventas_mabe: str    
    ventas_indurama: str
    ventas_whirlpool: str
    ventas_lg: str
    ventas_samsung: str
    ventas_electrolux: str
    mastertech: str
    hove: str
    teka: str
    smc: str
    otros: str
    validacion: str

class Linea(BaseModel):
    id_linea: str
    codigo_pdv: str
    cuota: str
    nombre_linea: str

class Punto_venta(BaseModel):
    codigo_pdv: str
    clave: str
    nombre_pdv: str
    retail_mapping: str
    cobertura: str
    nombre_cliente_hijo: str

