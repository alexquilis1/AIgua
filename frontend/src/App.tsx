import { useState } from "react";
import { Link } from "react-router-dom";
import ParameterInput from "./components/ParameterInput";
import UsageInput from "./components/UsageInput";
import AnalyzeButton from "./components/AnalyzeButton";
import { saveAnalysisToFirestore } from "./firebaseUtils";
import type { SharedAnalysisData } from "./types/SharedAnalysisData";
import { Timestamp } from "firebase/firestore";

function App() {
    const [parameters, setParameters] = useState<Record<string, number>>({});
    const [usage, setUsage] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [share, setShare] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!usage || Object.keys(parameters).length === 0) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:52345/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...parameters, usage }),
            });

            const data = await response.json();
            const { analysis, internal_results } = data;

            setResult(analysis); // Lo muestras en el frontend principal

            if (share && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        const dataToShare: SharedAnalysisData = {
                            parameters,
                            usage,
                            location: {
                                lat: latitude,
                                lng: longitude,
                            },
                            internal_results,
                            timestamp: Timestamp.now(), // 🔥 aquí se añade
                        };


                        await saveAnalysisToFirestore(dataToShare);
                    },
                    (error) => {
                        console.error("Geolocation error:", error);
                    }
                );
            }
        } catch (error) {
            console.error("Error analyzing water:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 py-10 px-4">
            <div className="max-w-2xl mx-auto space-y-8">
                <h1 className="text-4xl font-bold text-center text-blue-900 drop-shadow-sm">
                    AIgua 💧
                </h1>

                <ParameterInput onChange={setParameters} />
                <UsageInput onChange={setUsage} />

                <div className="text-center">
                    <AnalyzeButton onClick={handleAnalyze} />
                </div>

                <div className="text-center">
                    <label className="inline-flex items-center space-x-2 mt-4 text-sm text-slate-700">
                        <input
                            type="checkbox"
                            checked={share}
                            onChange={() => setShare(!share)}
                            className="accent-blue-600"
                        />
                        <span>Share this analysis anonymously to help others</span>
                    </label>
                </div>

                <div className="text-center">
                    <Link
                        to="/map"
                        className="text-blue-700 underline hover:text-blue-900 text-sm"
                    >
                        🌍 View Community Map →
                    </Link>
                </div>

                {loading && (
                    <div className="flex justify-center items-center space-x-3 text-blue-800 font-medium mt-6">
                        <svg
                            className="animate-spin h-6 w-6 text-sky-500"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                        <span>Analyzing water sample…</span>
                    </div>
                )}

                {result && (
                    <div className="bg-white p-6 rounded-xl shadow-md shadow-blue-100 transition-all duration-200">
                        <h2 className="text-xl font-semibold text-blue-900 mb-2">
                            💡 AIgua's Analysis
                        </h2>
                        <p className="text-slate-700 whitespace-pre-wrap">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
