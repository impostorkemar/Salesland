from fastapi import FastAPI
from routes.user import user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
#adding cors uris
origins =[
    "http://localhost:8000",
    "http://localhost:8001",
    "https://127.0.0.1:8000",
    "https://127.0.0.1:8001",
    "http://localhost:4200",
    "https://localhost:4200",
    "http://192.168.1.11:4200",
    "https://192.168.1.11:4200",
    "http://192.168.1.35:8000",
    "https://192.168.1.35:8000",
    "http://192.168.1.35:4200",
    "https://192.168.1.35:4200",
    "http://192.168.56.1:4200",
    "https://192.168.56.1:4200",
    "http://192.168.56.1:8000",
    "https://192.168.56.1:8000",
    "http://localhost:4200",
    "https://localhost:4200",
    "http://localhost:8000",
    "https://localhost:8000",
    "http://192.168.1.37:8000",
    "https://192.168.1.37:8000",
    "http://192.168.1.37:4200",
    "https://192.168.1.37:4200",

    
]
#adding middleware uris
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user)



