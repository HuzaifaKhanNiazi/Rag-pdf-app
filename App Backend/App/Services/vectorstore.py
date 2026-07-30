from langchain_classic.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
embedding = OllamaEmbeddings(model="nomic-embed-text")
def create_vector_db(chunks):
    db=Chroma.from_documents(
        documents=chunks,
        embedding=embedding,
        collection_name="Rag_collection",
        persist_directory="Chroma_db"
    )
    db.add_documents(chunks)
    return db
# def load_vector_db():
#     db=Chroma(
#         embedding_function=embedding,
#         persist_directory="Chroma_db",
#         collection_name="Rag_collection"
#     )
#     return db