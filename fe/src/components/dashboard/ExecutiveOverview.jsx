import {
  Target,
  FolderKanban,
  CheckSquare,
  AlertTriangle,
  BarChart3,
  HeartPulse,
} from "lucide-react";

export default function ExecutiveOverview({ plan }) {
  const totalProjects = plan.projects.length;

  const totalTasks = plan.projects.reduce(
    (sum, project) => sum + project.tasks.length,
    0,
  );

  const totalRisks = plan.risks.length;

  const totalKPIs = plan.kpis.length;

  const stats = [
    {
      icon: HeartPulse,
      label: "Health",
      value: `${plan.health.overall_score}`,
      color: "text-emerald-600",
    },
    {
      icon: FolderKanban,
      label: "Projects",
      value: totalProjects,
      color: "text-indigo-600",
    },
    {
      icon: CheckSquare,
      label: "Tasks",
      value: totalTasks,
      color: "text-blue-600",
    },
    {
      icon: AlertTriangle,
      label: "Risks",
      value: totalRisks,
      color: "text-red-600",
    },
    {
      icon: BarChart3,
      label: "KPIs",
      value: totalKPIs,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <Target className="text-indigo-600" size={28} />

        <div>
          <h1 className="text-3xl font-bold">{plan.goal}</h1>

          <p className="mt-2 text-slate-500">
            AI-generated executive execution overview
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-5">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <Icon className={item.color} />

              <p className="mt-4 text-3xl font-bold">{item.value}</p>

              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <InfoCard title="Founder Focus" value={plan.insights.founder_focus} />

        <InfoCard title="Biggest Risk" value={plan.insights.biggest_risk} />

        <InfoCard
          title="Highest Priority"
          value={plan.insights.highest_priority}
        />
      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-indigo-50 p-6">
      <p className="text-sm font-medium text-indigo-600">{title}</p>

      <h3 className="mt-3 text-xl font-bold">{value}</h3>
    </div>
  );
}
