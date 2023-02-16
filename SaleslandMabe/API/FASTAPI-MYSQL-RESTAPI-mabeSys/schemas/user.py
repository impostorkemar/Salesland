from typing import Optional
from pydantic   import BaseModel

class Supervisor(BaseModel):
    id_supervisor: Optional[int]
    nombre_supervisor: str    

class Usuario(BaseModel):
    clave: Optional[int]
    cedula: str       
    id_supervisor: int  
    codigo_pdv: int   
    tipo: str
    nombre_usuario: str
    usuario: str       
    password: str
    cargo: str

class Linea(BaseModel):
    id_linea: Optional[int]
    codigo_pdv: int
    cuota: str
    nombre_linea: str

class Punto_venta(BaseModel):
    codigo_pdv: Optional[int]    
    nombre_pdv: str
    retail_mapping: str
    cobertura: str
    nombre_cliente_hijo: str

class Venta(BaseModel):
    id_venta: Optional[int]    
    clave: int
    cedula: int
    id_supervisor: int
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
    total_semanal: float
    semana: str
