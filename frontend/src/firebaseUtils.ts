import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { SharedAnalysisData } from "./types/SharedAnalysisData";

export const saveAnalysisToFirestore = async (data: SharedAnalysisData) => {
    try {
        await addDoc(collection(db, "shared_analyses"), {
            ...data,
            timestamp: serverTimestamp(), // <-- timestamp tipo Firestore
        });
        console.log("📁 Saved to Firestore!");
    } catch (err) {
        console.error("❌ Error saving to Firestore:", err);
    }
};
