# aigua.py

# Specific imports from other modules
from rules import (
    internal_rule_evaluation,
    needs_external_info,
    query_internal_kb,
    parameter_rules
)
from rag import query_rag
from langchain_ibm import WatsonxLLM
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from credentials import credentials, project_id
from prompt import prompt_template

# IBM WatsonX LLM configuration
watsonx_llm = WatsonxLLM(
    model_id="ibm/granite-3-8b-instruct",
    url=credentials['url'],
    apikey=credentials['apikey'],
    project_id=project_id,
    params={"temperature": 0.2, "max_new_tokens": 1024}
)

# Create the prompt using LangChain
prompt = PromptTemplate(
    input_variables=["pH", "TDS", "turbidity", "free_chlorine", "usage"],
    template=prompt_template
)

# Define the LLM chain to generate the analysis
aigua_chain = LLMChain(llm=watsonx_llm, prompt=prompt, verbose=True)

# Main logic: combines internal evaluation with external RAG enrichment
def analyze_water_dual(parameters: dict, usage: str):
    """
    Analyzes water quality by combining rule-based evaluation with generative AI.

    This function performs a two-layered analysis of water test results:
    1. It first applies internal, rule-based logic to evaluate each parameter
       (pH, TDS, turbidity, free chlorine) and assess potential risks.
    2. If additional insights are needed, it retrieves supporting information from
       an internal knowledge base and performs external RAG (Retrieval-Augmented Generation)
       queries to provide deeper context.

    It then uses a Large Language Model (LLM) to generate a final user-friendly analysis,
    tailored to the intended use of the water (e.g., drinking, irrigation, washing).

    Parameters:
        parameters (dict): Dictionary containing numeric water quality parameters.
        usage (str): The intended use of the water (e.g., "drinking", "irrigation").

    Returns:
        dict: A dictionary with:
            - "analysis": The full AI-generated analysis text.
            - "internal_results": Rule-based evaluation per parameter.
            - "external_info": Optional knowledge from internal sources (if needed).
            - "rag_info": Optional knowledge retrieved externally via RAG (if needed).
    """
    
    # Step 1: Internal evaluation using rules
    internal_results = internal_rule_evaluation(parameters)

    # Step 2: Determine whether external information is needed
    external_needed = needs_external_info(internal_results)

    external_info = {}
    rag_info = {}

    if external_needed:
        for param, value in parameters.items():
            if param in parameter_rules and internal_results[param]["status"] in ("acceptable", "risky"):
                # Retrieve additional info from internal knowledge base
                external_info[param] = query_internal_kb(param)

                # Query external knowledge via RAG
                query_text = (
                    f"Explain the health risks and recommended treatments "
                    f"related to {param} in water."
                )
                rag_info[param] = query_rag(query_text, k=2)

    # Step 3: Generate final analysis using the LLM
    final_report = aigua_chain.run({
        "pH": parameters.get("pH"),
        "TDS": parameters.get("TDS"),
        "turbidity": parameters.get("turbidity"),
        "free_chlorine": parameters.get("free_chlorine"),
        "usage": usage
    })

    # Return the complete response from the LLM,
    # along with optional internal and external supporting information
    return {
        "analysis": final_report,
        "internal_results": internal_results,
        "external_info": external_info,
        "rag_info": rag_info
    }
