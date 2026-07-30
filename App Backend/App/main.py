from fastapi import FastAPI
from App.rag_routes.rag_routes import router
from fastapi.middleware.cors import CORSMiddleware 
app=FastAPI(title='Rag Pdf Chatbot',
    version='1.0')
app.include_router(router=router)
@app.get('/')
def home():
    return {'message':"Welcome to our rag app."}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",    
  
],
    allow_credentials=True,           # Allows cookies / auth headers
    allow_methods=["*"],              # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],   
)