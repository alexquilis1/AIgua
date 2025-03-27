import React, { useState, useEffect } from "react";

type Props = {
    onChange: (values: Record<string, number>) => void;
};

const parameters = [
    {
        key: "pH",
        label: "pH (Acidity / Alkalinity)",
        description: "Ideal range: 6.5 - 8.5",
        min: 0,
        max: 14
    },
    {
        key: "TDS",
        label: "Total Dissolved Solids (mg/L)",
        description: "Ideal: below 500 mg/L",
        min: 0,
        max: 2000
    },
    {
        key: "turbidity",
        label: "Turbidity (NTU)",
        description: "Ideal: below 5 NTU",
        min: 0,
        max: 100
    },
    {
        key: "free_chlorine",
        label: "Free Chlorine (mg/L)",
        description: "Safe range: 0.2 - 1.0 mg/L",
        min: 0,
        max: 5
    }
];

const ParameterInput: React.FC<Props> = ({ onChange }) => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const parsed = Object.fromEntries(
            parameters.map((p) => [p.key, parseFloat(values[p.key])])
        );
        onChange(parsed);
    }, [values, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const param = parameters.find((p) => p.key === name);
        const num = parseFloat(value);

        let error = "";
        if (value === "") {
            error = "Required";
        } else if (isNaN(num)) {
            error = "Must be a number";
        } else if (param && (num < param.min || num > param.max)) {
            error = `Must be between ${param.min} and ${param.max}`;
        }

        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-blue-100 space-y-6 transition-all duration-200">
            <h2 className="text-2xl font-bold text-blue-900">Water Parameters</h2>
            {parameters.map((param) => (
                <div key={param.key} className="space-y-1">
                    <label htmlFor={param.key} className="block font-medium text-blue-900">
                        {param.label}
                    </label>
                    <p className="text-sm text-slate-600">{param.description}</p>
                    <input
                        type="number"
                        step="any"
                        name={param.key}
                        id={param.key}
                        value={values[param.key] || ""}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-md border text-sm bg-white transition-all duration-200 focus:outline-none focus:ring-2 ring-offset-1 ${
                            errors[param.key]
                                ? "border-red-400 focus:ring-red-300"
                                : "border-slate-300 focus:ring-sky-200 ring-sky-100"
                        }`}
                    />
                    {errors[param.key] && (
                        <p className="text-sm text-red-600">{errors[param.key]}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ParameterInput;
