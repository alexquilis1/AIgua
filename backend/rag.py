from langchain.vectorstores import FAISS
from langchain_ibm import WatsonxEmbeddings
from ibm_watsonx_ai.foundation_models.utils.enums import EmbeddingTypes
from credentials import credentials, project_id

# Inicializa embeddings
embeddings = WatsonxEmbeddings(
    model_id=EmbeddingTypes.IBM_SLATE_30M_ENG.value,
    url=credentials["url"],
    apikey=credentials["apikey"],
    project_id=project_id,
)

# Cargar FAISS desde disco
vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)

def query_rag(query: str, k: int = 3):
    results = vectorstore.similarity_search(query, k=k)
    return [doc.page_content for doc in results]
