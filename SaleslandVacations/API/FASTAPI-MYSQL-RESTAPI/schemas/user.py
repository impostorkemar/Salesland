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
    status: str
    peticion: str
    observaciones: str

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

class Ingresos(BaseModel):
    id_ingresos: Optional[int]
    valor_horas_extrardinarias: float
    valor_horas_complementarias: float
    subsidio_enfermedad: float
    movilizacion: float
    comisiones: float
    bono_plan_celular: float
    decimo_tercero: float
    decimo_cuarto: float
    fondo_reserva: float

class Descuentos(BaseModel):
    id_descuentos: Optional[int]
    aporte_iess: float
    anticipo_sueldo: float
    impuesto_renta: float
    prestamo_hipotecario: float
    prestamo_quirografario: float
    extension_conyugue: float
    extension_conyugue_mes_anterior: float
    sobregiro: float
    seguro_movil: float
    copago_seguro: float


class Consult(BaseModel):
    user: str
    passw: str
    id: str    

class Consult2(BaseModel):    
    id: str  


    
    