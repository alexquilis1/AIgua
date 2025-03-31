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
                    This website is part of the AI Agent Hackathon with IBM watsonx.ai (March 2025) and is provided for educational and demonstration purposes.
                </p>

                <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                    <li>All content is © 2025 Alex Quilis Vila and Junjie Wu.</li>
                    <li>This project is licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0" className="text-blue-700 hover:underline" target="_blank" rel="noopener noreferrer">Apache License 2.0</a>.</li>
                    <li>You may use, modify, and distribute this software for personal, educational, or commercial purposes, provided that proper attribution is maintained.</li>
                    <li>Use of trademarks, logos, or branding elements without permission is not allowed.</li>
                    <li>By using this platform, you accept the terms of the Apache License and the rules of the AI Agent Hackathon.</li>
                </ul>

                <p className="text-sm text-gray-500">
                    For questions, please refer to the LICENSE file or contact the authors.
                </p>

                <p className="mt-6 text-xs text-gray-500 italic">
                    This website and its contents have been created for the AI Agent Hackathon with IBM watsonx.ai. The software is open source and distributed under the Apache License 2.0.
                </p>
            </div>
        </div>
    );
}
