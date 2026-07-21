import DashboardCard from "../common/DashboardCard";
import { CheckCircle2, Circle, Target } from "lucide-react";

import { usePlan } from "../../contexts/PlanContext";

export default function FounderActionPanel({ plan }) {
  const { completedActions, toggleAction } = usePlan();

  if (!plan) return null;

  const actions = [
    `Review ${plan.projects?.[0]?.title || "Project"}`,
    `Meet ${plan.assignments?.[0]?.owner || "Team Member"}`,
    `Resolve ${plan.risks?.[0]?.title || "Top Risk"}`,
    `Track ${plan.kpis?.[0]?.metric || "Primary KPI"}`,
  ];

  const completed = completedActions.length;

  const progress = Math.round((completed / actions.length) * 100);

  return (
    <DashboardCard
      title="Today's Focus"
      subtitle="Top priorities for today"
      className="h-[240px]"
    >
      <div className="flex h-full flex-col justify-between">
        {/* Task List */}

        <div className="space-y-3">
          {actions.map((action) => {
            const done = completedActions.includes(action);

            return (
              <button
                key={action}
                onClick={() => toggleAction(action)}
                className="flex w-full items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50"
              >
                {done ? (
                  <CheckCircle2 size={18} className="text-emerald-500" />
                ) : (
                  <Circle size={18} className="text-slate-400" />
                )}

                <span
                  className={`flex-1 text-left text-sm ${
                    done ? "text-slate-400 line-through" : "text-slate-700"
                  }`}
                >
                  {action}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom */}

        <div className="border-t border-slate-200 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-indigo-600" />

              <span className="text-sm text-slate-500">Daily Progress</span>
            </div>

            <span className="font-semibold text-indigo-600">
              {completed}/{actions.length}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
