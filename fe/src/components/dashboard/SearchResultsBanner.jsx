import { Search, X } from "lucide-react";

export default function SearchResultsBanner({
  search,
  sections,
  onClear,
}) {
  if (!search) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl border border-indigo-200 bg-indigo-50 px-6 py-4">
      <div className="flex items-center gap-3">
        <Search className="text-indigo-600" size={20} />

        <div>
          <h3 className="font-semibold text-slate-900">
            Showing results for "{search}"
          </h3>

          <p className="text-sm text-slate-500">
            {sections} section{sections !== 1 ? "s" : ""} matched
          </p>
        </div>
      </div>

      <button
        onClick={onClear}
        className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 transition hover:bg-slate-100"
      >
        <X size={18} />

        Clear
      </button>
    </div>
  );
}
