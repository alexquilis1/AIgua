import { Link } from "react-router-dom";

export default function PrivacyPage() {
    return (
        <div className="bg-blue-50 min-h-screen px-6 py-12">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md shadow-blue-100">
                <Link
                    to="/"
                    className="inline-block mb-6 text-blue-700 hover:text-blue-900 text-sm font-medium"
                >
                    ⬅ Back to Home
                </Link>

                <h1 className="text-3xl font-bold text-blue-900 mb-6">Privacy Policy</h1>

                <p className="mb-4 text-slate-700">
                    AIgua respects your privacy. This platform does not collect or store any personal information.
                </p>

                <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
                    <li>No login or registration is required.</li>
                    <li>Shared water data is completely anonymous.</li>
                    <li>We store only test parameters, usage, and approximate location for the community map.</li>
                    <li>No cookies, analytics, or third-party tracking tools are used.</li>
                </ul>

                <p className="text-sm text-gray-500">
                    If you have any concerns, feel free to reach out to the team.
                </p>
            </div>
        </div>
    );
}
