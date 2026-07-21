import { ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";
import DashboardCard from "../common/DashboardCard";
import { usePlan } from "../../contexts/PlanContext";

export default function HealthCard({ health }) {
  const { completedActions } = usePlan();

  if (!health) return null;

  const totalActions = 4;

  const score = Math.round(40 + (completedActions.length / totalActions) * 60);

  let status = "Needs Attention";
  let statusColor = "text-red-600";
  let progressColor = "bg-red-500";

  if (score >= 80) {
    status = "Healthy";
    statusColor = "text-emerald-600";
    progressColor = "bg-emerald-500";
  } else if (score >= 60) {
    status = "Moderate";
    statusColor = "text-amber-600";
    progressColor = "bg-amber-500";
  }

  return (
    <DashboardCard
      title="Executive Health"
      subtitle="Operational readiness"
      className="h-[240px]"
    >
      <div className="flex h-full flex-col justify-between">
        {/* Top */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-bold text-slate-900">{score}</p>

            <p className={`mt-2 font-semibold ${statusColor}`}>{status}</p>
          </div>

          <div className="rounded-2xl bg-indigo-100 p-4">
            <ShieldCheck size={28} className="text-indigo-600" />
          </div>
        </div>

        {/* Progress */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">Health Score</span>

            <span className="text-sm font-semibold">{score}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{
                width: `${score}%`,
              }}
            />
          </div>
        </div>

        {/* Summary */}

        <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-500" />

            <span className="text-sm text-slate-600">
              {health.strengths?.length || 0} Strengths
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />

            <span className="text-sm text-slate-600">
              {health.warnings?.length || 0} Warnings
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
