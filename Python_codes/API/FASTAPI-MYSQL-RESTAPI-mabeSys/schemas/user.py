from typing import Optional
from pydantic   import BaseModel

class Usuario(BaseModel):
    clave: Optional[int]
    cedula: str
    codigo_pdv: int
    tipo: str
    nombre_usuario: str
    usuario: str       
    password: str

class Venta(BaseModel):
    id_venta: Optional[int]
    id_linea: int
    codigo_pdv: int
    ventas_mabe: float    
    ventas_indurama: float
    ventas_whirlpool: float
    ventas_lg: float
    ventas_samsung: float
    ventas_electrolux: float
    mastertech: float
    hove: float
    teka: float
    smc: float
    otros: float
    validacion: int
    semana: str

class Linea(BaseModel):
    id_linea: Optional[int]
    codigo_pdv: str
    cuota: str
    nombre_linea: str

class Punto_venta(BaseModel):
    codigo_pdv: Optional[int]    
    nombre_pdv: str
    retail_mapping: str
    cobertura: str
    nombre_cliente_hijo: str

