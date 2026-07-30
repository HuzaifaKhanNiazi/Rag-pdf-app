from langchain_classic.text_splitter import RecursiveCharacterTextSplitter
from App.Services.documentsloader import load_documents
def text_splitting(documents):
    txt_spliter=RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
       separators=["\n\n","\n"," ",""]
    )

    chunks=txt_spliter.split_documents(documents)
    return chunks