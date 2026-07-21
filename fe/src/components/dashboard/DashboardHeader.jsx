import ExportButton from "./ExportButton";

export default function DashboardHeader({ plan }) {
  const totalProjects = plan.projects?.length || 0;

  const totalTasks =
    plan.projects?.reduce(
      (sum, project) => sum + (project.tasks?.length || 0),
      0,
    ) || 0;

  const totalRisks = plan.risks?.length || 0;

  const completedTasks =
    plan.projects?.reduce(
      (sum, project) =>
        sum +
        project.tasks.filter(
          (task) => task.status === "Completed" || task.completed || task.done,
        ).length,
      0,
    ) || 0;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="pb-5">
      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              🚀 Founder Operating System
            </div>

            <h1 className="text-4xl font-bold text-slate-900">{plan.goal}</h1>

            <p className="mt-3 max-w-3xl text-slate-500">
              AI generated execution roadmap for your startup.
            </p>
          </div>

          <ExportButton plan={plan} />
        </div>

        {/* Progress */}

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Overall Progress
            </span>

            <span className="font-semibold text-indigo-600">{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-3xl font-bold">{totalProjects}</p>
            <p className="mt-1 text-sm text-slate-500">Projects</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-3xl font-bold">{totalTasks}</p>
            <p className="mt-1 text-sm text-slate-500">Tasks</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-3xl font-bold">{totalRisks}</p>
            <p className="mt-1 text-sm text-slate-500">Risks</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-3xl font-bold">{plan.health?.score ?? "--"}</p>

            <p className="mt-1 text-sm text-slate-500">Health Score</p>
          </div>
        </div>
      </section>
    </div>
  );
}
