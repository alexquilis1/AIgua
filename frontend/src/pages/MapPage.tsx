import CommunityMap from "../components/CommunityMap";
import { Link } from "react-router-dom";

const MapPage = () => {
    return (
        <div className="min-h-screen bg-blue-50 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                <Link
                    to="/"
                    className="text-blue-700 underline hover:text-blue-900 text-sm"
                >
                    ← Back to Water Analysis
                </Link>

                <h1 className="text-3xl font-bold text-center text-blue-900">
                    Community Contributions 🌍
                </h1>

                <CommunityMap />
            </div>
        </div>
    );
};

export default MapPage;
