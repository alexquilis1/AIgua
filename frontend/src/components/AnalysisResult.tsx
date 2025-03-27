import { AnalysisResultData } from "../types/AnalysisResultData";

const AnalysisResult: React.FC<AnalysisResultData> = ({
                                             diagnosis,
                                             risks,
                                             treatment,
                                             explanation,
                                         }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md shadow-blue-100 space-y-6 transition-all duration-200">
            <section>
                <h2 className="text-xl font-semibold text-blue-900 mb-2">✅ Diagnosis</h2>
                <p className="text-slate-700">{diagnosis}</p>
            </section>

            {risks.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-yellow-700 mb-2">⚠️ Potential Risks</h2>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                        {risks.map((risk, index) => (
                            <li key={index}>{risk}</li>
                        ))}
                    </ul>
                </section>
            )}

            {treatment.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-green-700 mb-2">🛠 Suggested Treatment</h2>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                        {treatment.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </section>
            )}

            <section>
                <h2 className="text-xl font-semibold text-blue-800 mb-2">📚 Educational Explanation</h2>
                <p className="text-slate-700">{explanation}</p>
            </section>
        </div>
    );
};

export default AnalysisResult;
