# rules.py

from typing import Dict

# Rules for evaluating each water parameter
parameter_rules = {
    "pH": {
        "ideal_range": (6.5, 8.5),
        "acceptable_range": (6.0, 9.0),
        "risk": "pH out of ideal range may indicate acidic or alkaline contamination, potentially causing corrosion or taste issues.",
        "treatment": "Adjust pH using appropriate chemicals (lime to raise or acidifiers to lower)."
    },
    "TDS": {
        "ideal_range": (0, 500),
        "acceptable_range": (0, 1000),
        "risk": "High TDS may indicate contamination from salts or metals, affecting taste and long-term health.",
        "treatment": "Use reverse osmosis or deionization filters to lower TDS."
    },
    "turbidity": {
        "ideal_range": (0, 1),
        "acceptable_range": (0, 5),
        "risk": "Elevated turbidity can shield pathogens from disinfection and indicate particulate contamination.",
        "treatment": "Implement sedimentation and advanced filtration."
    },
    "free_chlorine": {
        "ideal_range": (0.2, 1.0),
        "acceptable_range": (0.1, 2.0),
        "risk": "Insufficient chlorine may not disinfect properly, while too much can be harmful and affect taste.",
        "treatment": "Adjust chlorine dosing or use activated carbon filters to remove excess chlorine."
    }
}

# Internal knowledge base for educational explanations and complementary advice
knowledge_base = {
    "pH": {
        "explanation": (
            "pH indicates the balance between acidity and alkalinity in water. Even within the acceptable range, "
            "slight deviations can affect taste and long-term water quality. Continuous monitoring is recommended."
        ),
        "risks": [
            "Taste alterations",
            "Possible long-term health implications if levels remain borderline"
        ],
        "treatment": "Consider adjusting pH using appropriate chemicals if it consistently hovers near the limits."
    },
    "TDS": {
        "explanation": (
            "Total Dissolved Solids (TDS) measure the concentration of dissolved substances in water. "
            "While a moderate level is normal, values near the high end of the acceptable range may affect taste "
            "and indicate potential contamination."
        ),
        "risks": [
            "Altered taste",
            "Potential for contaminants if levels remain high"
        ],
        "treatment": "Use filtration methods such as reverse osmosis if TDS levels are consistently high."
    },
    "turbidity": {
        "explanation": (
            "Turbidity measures the clarity of water. Clear water is ideal, but higher turbidity, even if acceptable, "
            "can hinder disinfection and may indicate particulate matter presence."
        ),
        "risks": [
            "Reduced effectiveness of disinfection processes",
            "Potential microbial growth if turbidity increases further"
        ],
        "treatment": "Regular cleaning and maintenance of the water system can help reduce turbidity."
    },
    "free_chlorine": {
        "explanation": (
            "Free chlorine is crucial for disinfecting water. Maintaining optimal levels ensures effective disinfection; "
            "levels that are too high or too low, even if acceptable, can cause taste issues or reduced disinfection."
        ),
        "risks": [
            "Adverse taste if chlorine is too high",
            "Insufficient disinfection if chlorine is too low"
        ],
        "treatment": "Monitor chlorine levels regularly and adjust dosing to maintain them within the optimal range."
    }
}

def evaluate_parameter(name: str, value: float) -> Dict[str, str]:
    """
    Evaluates a single water parameter based on predefined rules.

    Args:
        name (str): The name of the water parameter (e.g., "pH", "TDS").
        value (float): The numeric value of the parameter.

    Returns:
        dict: A dictionary with 'status' (ideal / acceptable / risky / unknown) and a 'message' explaining the result.
    """
    rule = parameter_rules.get(name)
    if not rule:
        return {"status": "unknown", "message": "No rules defined."}
    
    min_ideal, max_ideal = rule["ideal_range"]
    min_acc, max_acc = rule["acceptable_range"]

    if min_ideal <= value <= max_ideal:
        return {"status": "ideal", "message": "Within ideal range."}
    elif min_acc <= value <= max_acc:
        return {"status": "acceptable", "message": rule["risk"]}
    else:
        return {"status": "risky", "message": rule["risk"]}

def internal_rule_evaluation(parameters: Dict[str, float]) -> Dict[str, Dict[str, str]]:
    """
    Applies rule-based evaluation to all provided water parameters.

    Args:
        parameters (dict): A dictionary of parameter names and their values.

    Returns:
        dict: A dictionary mapping each parameter to its evaluation result (status and message).
    """
    results = {}
    for param, value in parameters.items():
        if param in parameter_rules:
            results[param] = evaluate_parameter(param, value)
        else:
            results[param] = {"status": "unknown", "message": "No rule defined."}
    return results

def needs_external_info(evaluation_results: Dict[str, Dict[str, str]]) -> bool:
    """
    Determines if additional information should be retrieved (e.g., from RAG or a knowledge base),
    based on whether any parameters are borderline or risky.

    Args:
        evaluation_results (dict): The output from internal_rule_evaluation.

    Returns:
        bool: True if external information is needed; False otherwise.
    """
    for result in evaluation_results.values():
        if result["status"] in ("acceptable", "risky"):
            return True
    return False

def query_internal_kb(parameter: str) -> dict:
    """
    Retrieves detailed information from the internal knowledge base for a given parameter.

    Args:
        parameter (str): The name of the water parameter.

    Returns:
        dict: A dictionary containing an explanation, risks, and treatment advice.
    """
    return knowledge_base.get(parameter, {
        "explanation": "No detailed information available.",
        "risks": [],
        "treatment": "No treatment recommendation available."
    })
