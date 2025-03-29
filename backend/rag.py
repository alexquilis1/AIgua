# rag.py

from langchain_community.vectorstores import FAISS
from langchain_ibm import WatsonxEmbeddings
from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes
from credentials import credentials, project_id

# Initialize Watsonx Embeddings using the SLATE model
embeddings = WatsonxEmbeddings(
    model_id=EmbeddingTypes.IBM_SLATE_30M_ENG.value,
    url=credentials["url"],
    apikey=credentials["apikey"],
    project_id=project_id,
)

# Load FAISS vector store from local disk
# NOTE: allow_dangerous_deserialization=True is required for FAISS; only use if you trust the source
vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

def query_rag(query: str, k: int = 3):
    """
    Perform a similarity search using FAISS and return the top-k most relevant documents.

    Args:
        query (str): The user's natural language query.
        k (int): The number of top documents to retrieve. Default is 3.

    Returns:
        list[str]: A list of document contents (page_content) matching the query.
    """
    results = vectorstore.similarity_search(query, k=k)
    return [doc.page_content for doc in results]
