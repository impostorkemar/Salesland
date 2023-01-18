from fastapi import APIRouter, Response
from config.db import conn
from models.user import usuarios
from schemas.user import Usuario
from cryptography.fernet import Fernet
from starlette import status
from sqlalchemy.sql import select

key = Fernet.generate_key()
f = Fernet(key)
user = APIRouter()

#CONSULTA USERS
@user.get("/usuarios/",response_model=list[Usuario], tags=["usuarios"])#EJEMPLO
def get_users():
    return conn.execute(usuarios.select()).fetchall()

@user.get("/usuarios/{user}-{pass}", tags=["usuarios"])
def comprobar_usuario(user: str, passw: str):   
    #print("SELECT * FROM `personal` WHERE  `id_personal` ='"+str(id)+"' AND `id_centro_costo` ='"+str(id_centro_costo)+"' AND `cedula` ='"+str(cedula)+"'")
    return conn.execute("SELECT tipo FROM usuario WHERE usuario = '"+str(user)+"' AND password = '"+str(passw)+"';").first()


