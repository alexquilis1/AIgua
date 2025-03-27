from pydantic import BaseModel, Field

class WaterSample(BaseModel):
    pH: float = Field(..., description="Acidity/alkalinity level of the water (typically 6.5 - 8.5 is ideal)")
    TDS: float = Field(..., description="Total Dissolved Solids in ppm (ideal is < 500)")
    turbidity: float = Field(..., description="Water clarity in NTU (ideal is < 1)")
    free_chlorine: float = Field(..., description="Free chlorine in mg/L (ideal range: 0.2 - 1.0)")
    usage: str = Field(..., description="Intended use of the water (e.g. 'drinking', 'bathing')")
