from langchain_community.document_loaders import (
    PyPDFLoader,
    TextLoader,
    Docx2txtLoader
)
def load_documents(file):
    if file.endswith(".pdf"):
        loader = PyPDFLoader(file)
    elif file.endswith(".txt"):
        loader = TextLoader(file)

    elif file.endswith(".docx"):
        loader = Docx2txtLoader(file)
    else:
        raise ValueError(
            "Unsupported file type"
        )
    docs = loader.load()
    return docs