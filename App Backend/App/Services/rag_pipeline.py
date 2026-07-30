from langchain_classic.chains import RetrievalQA
from App.config import GROQ_API_KEY
from langchain_groq import ChatGroq
llm = ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0
)
from langchain_classic.prompts import PromptTemplate
from fastapi.responses import JSONResponse
def retrievel_chain(query:str,retriever):
    prompt=PromptTemplate(
        template="""
You are a document question-answering assistant.
Your only source of truth is the CONTEXT below.

You must follow these rules:
- Answer ONLY using information found in the CONTEXT.
- Never use outside knowledge.
- Never guess or assume.
- When responding, you MUST NOT reference the existence of the context, directly or indirectly.Instead, you MUST treat the context as if its contents are entirely part of your working memory.
- If only part of the answer is in the CONTEXT, answer only that part.
- Do not add extra facts from your own knowledge.

Context:{context}

Question:{question} """.strip(),

input_variables=["context","question"]
    )

    qa_chain=RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type='stuff',
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )
    try:
        response=qa_chain.invoke({'query':query})
        return response

    except Exception as e:
        return JSONResponse(status_code=404,content=str(e))

