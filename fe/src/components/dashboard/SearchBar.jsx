import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full  ">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, tasks, risks, KPIs..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          py-4
          pl-12
          pr-5
          text-slate-700
          outline-none
          transition
          focus:border-indigo-400
          focus:ring-2
          focus:ring-indigo-100
        "
      />
    </div>
  );
}
