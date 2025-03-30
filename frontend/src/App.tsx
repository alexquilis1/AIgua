import { useState } from "react";
import { Link } from "react-router-dom";
import ParameterInput from "./components/ParameterInput";
import UsageInput from "./components/UsageInput";
import AnalyzeButton from "./components/AnalyzeButton";
import { saveAnalysisToFirestore } from "./firebaseUtils";
import type { SharedAnalysisData } from "./types/SharedAnalysisData";
import { Timestamp } from "firebase/firestore";
import Footer from "./components/Footer";
import AnalysisResult from "./components/AnalysisResult.tsx"; // 👈 Importamos el Footer

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
            const response = await fetch("https://aigua.up.railway.app/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...parameters, usage }),
            });

            const data = await response.json();
            const { analysis, internal_results } = data;

            setResult(analysis);

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
                            timestamp: Timestamp.now(),
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
        <div className="min-h-screen bg-blue-50 flex flex-col justify-between">
            <main className="py-10 px-4 flex-grow">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h1 className="text-4xl font-bold text-center text-blue-900 drop-shadow-sm">
                        AIgua 💧
                    </h1>
                    <p className="text-center text-slate-600 text-base max-w-md mx-auto mt-2">
                        Understand your water in seconds — AI-powered analysis, health risks & treatment tips for every drop.
                    </p>

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
                                aria-checked={share}
                                aria-label="Share this analysis anonymously"
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
                        <>
                            <h2 className="text-xl font-semibold text-blue-900 mb-2 text-center">
                                💡 AIgua's Analysis
                            </h2>
                            <AnalysisResult analysis={result} />
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
