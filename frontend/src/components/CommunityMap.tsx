import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { SharedAnalysisWithId } from "../types/SharedAnalysisData";

// 🛠 Fix de icono en React Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultIconPrototype = L.Icon.Default.prototype as any;
delete DefaultIconPrototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const getStatusEmoji = (status: string) => {
    switch (status) {
        case "ideal":
            return "✅";
        case "acceptable":
            return "⚠️";
        case "risky":
            return "❌";
        default:
            return "❓";
    }
};

const CommunityMap = () => {
    const [analyses, setAnalyses] = useState<SharedAnalysisWithId[]>([]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const fallbackCenter: [number, number] = [40.0, -3.5]; // España por defecto

    useEffect(() => {
        (async () => {
            try {
                const snapshot = await getDocs(collection(db, "shared_analyses"));
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as SharedAnalysisWithId[];
                setAnalyses(data);
            } catch (err) {
                console.error("Error loading map data from Firestore:", err);
            }
        })();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.warn("Geolocation not available or denied:", error);
                    setUserLocation(fallbackCenter);
                }
            );
        } else {
            setUserLocation(fallbackCenter);
        }
    }, []);

    return (
        <div className="rounded-xl overflow-hidden shadow-lg shadow-blue-100">
            {userLocation && (
                <>
                    <p className="text-center text-slate-700 text-sm mb-4">
                        This map shows water test results shared anonymously by users around the world. 💡
                    </p>

                    <MapContainer
                        center={userLocation}
                        zoom={6}
                        scrollWheelZoom={true}
                        style={{ height: "500px", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {analyses.map((entry) => {
                            const date = (entry.timestamp as Timestamp).toDate();
                            const formattedDate = date.toLocaleString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                timeZoneName: "short",
                            });

                            return (
                                <Marker key={entry.id} position={entry.location}>
                                    <Popup>
                                        <p className="font-semibold text-blue-800 mb-1">
                                            💧 Use: {entry.usage.charAt(0).toUpperCase() + entry.usage.slice(1)}
                                        </p>
                                        <ul className="text-sm text-slate-700 list-disc list-inside space-y-1 mb-2">
                                            {Object.entries(entry.internal_results).map(([param, { status }]) => (
                                                <li key={param}>
                                                    <strong>
                                                        {param.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                                    </strong>
                                                    : {getStatusEmoji(status)}{" "}
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-xs text-slate-500">📅 {formattedDate}</p>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </>
            )}
        </div>
    );
};

export default CommunityMap;
