from fastapi import APIRouter
from fastapi.responses import JSONResponse
from App.model.pydantic_model import Userquery
from fastapi import UploadFile,File
from App.Services.documentsloader import load_documents
from App.Services.vectorstore import create_vector_db
from App.Services.text_spliter import text_splitting
from App.Services.retrievers import retrievers_chunks
from App.Services.rag_pipeline import retrievel_chain
import shutil
retriever=None
router=APIRouter()
@router.post('/upload')
async def upload_docs(file:UploadFile=File(...)):
    global retriever
    file_path= f'App/Uploads/{file.filename}'
    with open(file_path,'wb') as buffer:
        shutil.copyfileobj(   file.file,
                               buffer)

    documents=load_documents(file_path)
    chunks=text_splitting(documents)
    db=create_vector_db(chunks)
    retriever= retrievers_chunks(db,chunks)
    return {
       "filename":file.filename,
        "message":"File uploaded successfuslly"
    }

@router.post('/usermessage')
def userquery(userquery:Userquery):
    global retriever

    if retriever is None:
        return JSONResponse(
            status_code=400,
            content={
                "error": "Please upload a document first."
            }
        )
    try:
       response=retrievel_chain(userquery.query,retriever)
       return {
           "response":response["result"]
       }
    except Exception as e:
        return JSONResponse(status_code=500,content= str(e))