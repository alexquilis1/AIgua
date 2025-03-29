import { Link } from "react-router-dom";

export default function TermsPage() {
    return (
        <div className="bg-blue-50 min-h-screen px-6 py-12">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md shadow-blue-100">
                <Link
                    to="/"
                    className="inline-block mb-6 text-blue-700 hover:text-blue-900 text-sm font-medium"
                >
                    ⬅ Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-blue-900 mb-6">Terms of Use</h1>

                <p className="mb-4 text-slate-700">
                    This website is part of the AI Agent Hackathon with IBM watsonx.ai (March 2025) and is provided for educational and demonstration purposes only.
                </p>

                <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                    <li>All content is © 2025 Alex Quilis Vila and Junjie Wu. All rights reserved.</li>
                    <li>You may use this service for personal, non-commercial, and educational purposes only.</li>
                    <li>Proper attribution is required if you reference or showcase the project.</li>
                    <li>Commercial use or modification of this project is strictly prohibited.</li>
                    <li>Use of this platform implies acceptance of these terms and the official hackathon rules.</li>
                </ul>

                <p className="text-sm text-gray-500">
                    For questions or permissions, please contact the authors.
                </p>

                <p className="mt-6 text-xs text-gray-500 italic">
                    This website and its contents have been created for the AI Agent Hackathon with IBM watsonx.ai. All usage remains subject to the contest's Official Rules and Terms.
                </p>
            </div>
        </div>
    );
}
