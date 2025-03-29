# waterbuddy.py

# Imports específicos desde otros módulos
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

# Configuración del modelo IBM WatsonX LLM
watsonx_llm = WatsonxLLM(
    model_id="ibm/granite-3-8b-instruct",
    url=credentials['url'],
    apikey=credentials['apikey'],
    project_id=project_id,
    params={"temperature": 0.2, "max_new_tokens": 1024}
)

# Creación del prompt con LangChain
prompt = PromptTemplate(
    input_variables=["pH", "TDS", "turbidity", "free_chlorine", "usage"],
    template=prompt_template
)

# Chain del modelo LLM para generar respuestas
waterbuddy_chain = LLMChain(llm=watsonx_llm, prompt=prompt, verbose=True)

# Lógica principal: análisis dual interno y externo (RAG)
def analyze_water_dual(parameters: dict, usage: str):
    internal_results = internal_rule_evaluation(parameters)
    external_needed = needs_external_info(internal_results)

    external_info = {}
    rag_info = {}

    if external_needed:
        for param, value in parameters.items():
            if param in parameter_rules and internal_results[param]["status"] in ("acceptable", "risky"):
                # Información interna adicional
                external_info[param] = query_internal_kb(param)

                # Consultar información externa (RAG)
                query_text = (
                    f"Explain the health risks and recommended treatments "
                    f"related to {param} in water."
                )
                rag_info[param] = query_rag(query_text, k=2)

    # Construcción del reporte final integrando toda la información obtenida
    final_report = waterbuddy_chain.run({
        "pH": parameters.get("pH"),
        "TDS": parameters.get("TDS"),
        "turbidity": parameters.get("turbidity"),
        "free_chlorine": parameters.get("free_chlorine"),
        "usage": usage
    })

    # Devuelve el reporte completo generado por el modelo LLM,
    # complementado si lo deseas con info interna y externa (opcional).
    return {
        "analysis": final_report,
        "internal_results": internal_results,
        "external_info": external_info,
        "rag_info": rag_info
    }
