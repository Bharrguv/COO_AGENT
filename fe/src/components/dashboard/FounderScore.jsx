import { Trophy, TrendingUp } from "lucide-react";
import DashboardCard from "../common/DashboardCard";
import { useTasks } from "../../contexts/TaskContext";
import { usePlan } from "../../contexts/PlanContext";

export default function FounderScore({ plan }) {
  const { taskStatus } = useTasks();
  const { completedActions } = usePlan();

  const totalTasks = plan.projects.reduce(
    (sum, project) => sum + project.tasks.length,
    0,
  );

  const completedTasks = Object.values(taskStatus).filter(
    (status) => status === "Completed",
  ).length;

  const taskScore =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 70);

  const actionScore = completedActions.length * 10;

  const founderScore = Math.min(100, taskScore + actionScore);

  const level =
    founderScore >= 90
      ? "Outstanding"
      : founderScore >= 75
        ? "Excellent"
        : founderScore >= 60
          ? "Good"
          : founderScore >= 40
            ? "Getting Started"
            : "Needs Attention";

  return (
    <DashboardCard
      title="Founder Score"
      subtitle="Today's execution performance"
      className="h-[240px]"
    >
      <div className="flex h-full flex-col justify-between">
        {/* Score */}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-5xl font-bold text-slate-900">{founderScore}</p>

            <p className="mt-1 text-sm text-slate-500">out of 100</p>
          </div>

          <div className="rounded-2xl bg-indigo-100 p-4">
            <Trophy className="text-indigo-600" size={28} />
          </div>
        </div>

        {/* Progress */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-500">Overall Progress</span>

            <span className="text-sm font-semibold text-indigo-600">
              {founderScore}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${founderScore}%`,
              }}
            />
          </div>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Level
            </p>

            <p className="font-semibold text-slate-900">{level}</p>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1">
            <TrendingUp size={16} className="text-emerald-600" />

            <span className="text-sm font-medium text-emerald-700">
              +{actionScore}
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
