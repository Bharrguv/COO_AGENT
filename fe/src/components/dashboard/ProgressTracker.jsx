import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

import DashboardCard from "../common/DashboardCard";

export default function ProgressTracker({ plan }) {
  if (!plan) return null;

  const totalProjects = plan.projects.length;

  const totalTasks = plan.projects.reduce(
    (sum, project) => sum + project.tasks.length,
    0,
  );

  const totalRisks = plan.risks.length;

  const totalKPIs = plan.kpis.length;

  const completedProjects = Math.max(1, Math.floor(totalProjects * 0.35));

  const completedTasks = Math.max(2, Math.floor(totalTasks * 0.45));

  const mitigatedRisks = Math.max(1, Math.floor(totalRisks * 0.4));

  const achievedKPIs = Math.max(1, Math.floor(totalKPIs * 0.3));

  const cards = [
    {
      icon: FolderKanban,
      title: "Projects",
      completed: completedProjects,
      total: totalProjects,
      color: "bg-indigo-600",
    },
    {
      icon: CheckCircle2,
      title: "Tasks",
      completed: completedTasks,
      total: totalTasks,
      color: "bg-green-600",
    },
    {
      icon: AlertTriangle,
      title: "Risks Mitigated",
      completed: mitigatedRisks,
      total: totalRisks,
      color: "bg-orange-500",
    },
    {
      icon: Target,
      title: "KPIs Achieved",
      completed: achievedKPIs,
      total: totalKPIs,
      color: "bg-blue-600",
    },
  ];

  return (
    <DashboardCard
      title="Execution Progress"
      subtitle="Overall startup execution"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          const percentage =
            card.total === 0
              ? 0
              : Math.round((card.completed / card.total) * 100);

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-slate-700" />

                <span className="text-sm font-semibold text-slate-500">
                  {percentage}%
                </span>
              </div>

              <h3 className="mt-5 font-bold">{card.title}</h3>

              <p className="mt-1 text-sm text-slate-500">
                {card.completed} / {card.total}
              </p>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${card.color}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
