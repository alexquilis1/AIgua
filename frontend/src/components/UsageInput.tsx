type Props = {
    onChange: (value: string) => void;
};

const UsageInput: React.FC<Props> = ({ onChange }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-blue-100 space-y-3 mt-8 transition-all duration-200">
            <label className="block text-blue-900 font-semibold text-lg">
                Intended Use
            </label>
            <p className="text-slate-600 text-sm">
                Describe how you plan to use this water (e.g. drinking, watering plants, hygiene…)
            </p>
            <textarea
                rows={3}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type here..."
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-sky-200 text-sm transition-all duration-200 bg-white"
            />
        </div>
    );
};

export default UsageInput;
