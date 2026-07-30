from langchain_classic.retrievers import BM25Retriever,EnsembleRetriever
def retrievers_chunks(db,docs):
    similartiy_search_chunks=db.as_retriever(search_type="similarity",search_kwargs={'k':5})

    keyword_search=BM25Retriever.from_documents(
        documents=docs,
        k=5
    )

    hybrid_search=EnsembleRetriever(
        retrievers=[similartiy_search_chunks,keyword_search],
        weights=[0.8,0.2]
    )

    return hybrid_search