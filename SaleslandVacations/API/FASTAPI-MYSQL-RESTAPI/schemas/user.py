from typing import Optional
from pydantic   import BaseModel

class User(BaseModel):
    id: Optional[str]
    name: str
    email:str    
    password: str

class Centro_costo(BaseModel):
    id_centro_costo: int
    nombre_centro: str
    tienda: str    
    cuenta: str

class Candidato(BaseModel):
    cedula: Optional[str]
    nombre: str
    apellido: str    
    genero: str
    direccion_domicilio: str
    ciudad: str
    provincia: str
    estado_civil: str
    telefono_celular: str
    telefono_casa: str
    direccion_correo: str
    fecha_nacimiento: str
    edad: int
    nacionalidad: str
    status: str

class Experiencia_laboral(BaseModel):
    id_experiencia_laboral: Optional[int]    
    cedula: str 
    nombre_experiencia: str
    tiempo_experiencia: int
    estudios_universitarios: int

class Contrato(BaseModel):
    id_contrato: Optional[int]
    tipo_contrato: str
    fecha_inicio_contrato: str 
    fecha_fin_contrato: str   
    salario: float
    observaciones: str

class Usuario(BaseModel):
    id_usuario: Optional[int]
    cedula: str
    usuario: str    
    password: str
    tipo: str

class Cargo(BaseModel):
    id_cargo: int    
    nombre_cargo: str    

class Personal(BaseModel):
    id_personal: Optional[int]
    id_centro_costo: int
    cedula: str    
    id_supervisor: int
    status: str
    adendum_contrato: str
    id_contrato: int
    id_cargo: int

class Supervisor(BaseModel):
    id_supervisor: int    
    nombre_supervisor: str   
    email: str

class Vacacion(BaseModel):
    id_vacaciones: Optional[int]
    id_personal: int
    fecha_solicitud: str    
    fecha_inicio_vacaciones: str
    fecha_fin_vacaciones: str
    fecha_respuesta: str
    dias_lab_solicitados: float
    dias_disponibles_acum: float
    saldo_dias_vacaciones: float
    status: str
    peticion: str
    observaciones: str
    motivo: str

class Rol_pagos(BaseModel):
    id_rol_pagos: Optional[int]
    id_personal: int
    id_calendario: int
    id_ingresos: int
    id_descuentos: int
    numero_horas_extraordinarias: float
    numero_recargo_nocturno: float
    dias_de_enfermedad: float
    numero_horas_complementarias: float

class Consult(BaseModel):
    user: str
    passw: str
    id: str    

class Consult2(BaseModel):    
    id: str  

class Viaje(BaseModel):
    id_viaje: Optional[int]
    id_personal: int
    lugar: str    
    fecha_reembolso: str
    fecha_viaje_inicio: str
    fecha_viaje_fin: str
    duracion: int
    punto_partida: str
    punto_destino: str
    fecha_gasto: str
    moneda: str
    cantidad_comprobantes: int
    importe: float
    status: str
    peticion: str    
    motivo: str
    fecha_respuesta: str


class Comprobante(BaseModel):
    id_comprobante: Optional[int]
    id_viaje: int
    ruta_zip: str    

class Detalle_Comprobante(BaseModel):
    id_detalle_comprobante: Optional[int]
    id_comprobante: int
    tipo: str
    ruc_cedula: str   
    razon_social: str   
    n_documento: str   
    fecha_emision: str   
    base_imponible: float   
    cero_base_imponible: float   
    iva: float   
    servicio10: float   
    importe_sin_facturas: float   





    
    