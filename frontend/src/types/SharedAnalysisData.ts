import { Timestamp } from "firebase/firestore";

export type SharedAnalysisData = {
    location: {
        lat: number;
        lng: number;
    };
    usage: string;
    parameters: Record<string, number>;
    internal_results: Record<
        string,
        {
            status: string;
            message: string;
        }
    >;
    timestamp: Timestamp;
};

export type SharedAnalysisWithId = SharedAnalysisData & {
    id: string;
};
