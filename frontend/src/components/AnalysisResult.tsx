import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
    analysis: string;
};

const AnalysisResult: React.FC<Props> = ({ analysis }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md shadow-blue-100 transition-all duration-200 prose prose-slate max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
    );
};

export default AnalysisResult;
