import { AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";

const priorityStyle = {
  High: {
    badge: "bg-red-100 text-red-700",
    border: "border-red-200",
    icon: "text-red-600",
    progress: "bg-red-500",
    impact: 90,
  },
  Medium: {
    badge: "bg-yellow-100 text-yellow-700",
    border: "border-yellow-200",
    icon: "text-yellow-600",
    progress: "bg-yellow-500",
    impact: 65,
  },
  Low: {
    badge: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    progress: "bg-emerald-500",
    impact: 35,
  },
};

export default function RiskCard({ risk }) {
  const style = priorityStyle[risk.priority] || priorityStyle.Medium;

  return (
    <div
      className={`
        rounded-2xl
        border
        ${style.border}
        bg-white
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`rounded-xl bg-slate-100 p-2 ${style.icon}`}>
            <AlertTriangle size={20} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {risk.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {risk.description}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
        >
          {risk.priority}
        </span>
      </div>

      {/* Impact */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <TrendingUp size={15} />
            Estimated Impact
          </div>

          <span className="text-sm font-semibold text-slate-600">
            {style.impact}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full ${style.progress}`}
            style={{
              width: `${style.impact}%`,
            }}
          />
        </div>
      </div>

      {/* Mitigation */}

      <div className="mt-6 rounded-xl bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <ShieldCheck size={18} className="text-emerald-600" />

          <span className="font-semibold text-slate-800">
            Mitigation Strategy
          </span>
        </div>

        <p className="text-sm leading-6 text-slate-600">{risk.mitigation}</p>
      </div>
    </div>
  );
}
