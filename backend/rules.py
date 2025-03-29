from typing import Dict

parameter_rules = {
    "pH": {
        "ideal_range": (6.5, 8.5),
        "acceptable_range": (6.0, 9.0),
        "labels": {
            "ideal": "Ideal",
            "acceptable": "Acceptable but not ideal",
            "unsafe": "Unsafe"
        }
    },
    "TDS": {
        "ideal_range": (0, 500),
        "acceptable_range": (0, 1000),
        "labels": {
            "ideal": "Ideal",
            "acceptable": "Moderate but acceptable",
            "unsafe": "Too high – may indicate contamination"
        }
    },
    "turbidity": {
        "ideal_range": (0, 1),
        "acceptable_range": (0, 5),
        "labels": {
            "ideal": "Crystal clear",
            "acceptable": "Slightly cloudy, still acceptable",
            "unsafe": "Too cloudy – risk of pathogen protection"
        }
    },
    "free_chlorine": {
        "ideal_range": (0.2, 1.0),
        "acceptable_range": (0.1, 2.0),
        "labels": {
            "ideal": "Effective disinfection",
            "acceptable": "Watch closely",
            "unsafe": "Too low/high – possible risk"
        }
    }
}

knowledge_base = {
    "pH": {
        "explanation": (
            "pH indicates how acidic or alkaline the water is. Ideal drinking water is close to neutral. "
            "Deviations may affect taste, plumbing, and health over time."
        ),
        "risks": [
            "Corrosion of pipes or equipment",
            "Taste alterations",
            "Skin or eye irritation (if used for washing)"
        ],
        "treatment": {
            "raise": "Use lime or sodium carbonate to increase pH.",
            "lower": "Use acidifiers like citric acid or CO₂ injection to decrease pH."
        }
    },
    "TDS": {
        "explanation": (
            "TDS (Total Dissolved Solids) measures minerals, salts, and metals in water. Higher levels can affect taste "
            "and may signal contamination, especially in untreated water."
        ),
        "risks": [
            "Bitter or metallic taste",
            "Possible presence of harmful salts or heavy metals",
            "Build-up in appliances"
        ],
        "treatment": {
            "general": "Use reverse osmosis, deionization, or distillation to reduce TDS."
        }
    },
    "turbidity": {
        "explanation": (
            "Turbidity reflects the cloudiness of water due to suspended particles. It can reduce disinfection effectiveness "
            "and be a sign of microbial or sediment contamination."
        ),
        "risks": [
            "Microorganisms hidden in particles may survive treatment",
            "Potential infection risk if used without further filtration"
        ],
        "treatment": {
            "general": "Use sedimentation followed by fine filtration (e.g., ceramic or membrane filters)."
        }
    },
    "free_chlorine": {
        "explanation": (
            "Free chlorine keeps water disinfected and safe from microbes. Low levels mean disinfection may be insufficient, "
            "while high levels may cause irritation or unpleasant taste."
        ),
        "risks": [
            "Insufficient protection from bacteria if too low",
            "Skin or eye irritation if too high",
            "Bad taste or odor"
        ],
        "treatment": {
            "increase": "Increase dosing using chlorine tablets or liquid bleach (in correct proportions).",
            "decrease": "Use activated carbon filters or let water sit to allow chlorine to dissipate."
        }
    }
}

def evaluate_parameter(name: str, value: float) -> Dict[str, str]:
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
    results = {}
    for param, value in parameters.items():
        if param in parameter_rules:
            results[param] = evaluate_parameter(param, value)
        else:
            results[param] = {"status": "unknown", "message": "No rule defined."}
    return results

def needs_external_info(evaluation_results: Dict[str, Dict[str, str]]) -> bool:
    # If any parameter is borderline ("acceptable" or "risky"), we need external info.
    for result in evaluation_results.values():
        if result["status"] in ("acceptable", "risky"):
            return True
    return False

def query_internal_kb(parameter: str) -> dict:
    return knowledge_base.get(parameter, {
        "explanation": "No detailed information available.",
        "risks": [],
        "treatment": "No treatment recommendation available."
    })
