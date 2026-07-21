import { Target, CalendarDays } from "lucide-react";

export default function KPICard({ metric, target, timeline }) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-indigo-100 p-3">
          <Target size={22} className="text-indigo-600" />
        </div>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          KPI
        </span>
      </div>

      <p className="mt-6 text-sm text-slate-500">Metric</p>

      <h3 className="mt-1 text-xl font-bold">{metric}</h3>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500">Target</p>

          <p className="font-semibold text-slate-800">{target}</p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <CalendarDays size={16} />
          {timeline}
        </div>
      </div>
    </div>
  );
}
