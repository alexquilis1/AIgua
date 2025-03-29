type Props = {
    onClick: () => void;
};

const AnalyzeButton: React.FC<Props> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            role="button"
            aria-label="Analyze water quality"
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md shadow-blue-100 transition-all duration-200"
        >
            Analyze Water 💧
        </button>
    );
};

export default AnalyzeButton;
