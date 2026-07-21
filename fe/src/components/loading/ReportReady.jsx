import { CheckCircle2, Sparkles } from "lucide-react";

export default function ReportReady({ plan }) {
  if (!plan) return null;

  const totalProjects = plan.projects.length;

  const totalTasks = plan.projects.reduce(
    (acc, project) => acc + project.tasks.length,
    0,
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-xl">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-5">
            <CheckCircle2 size={70} className="text-green-600" />
          </div>
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold">
          Executive Report Ready
        </h1>

        <p className="mt-3 text-center text-slate-500">
          Your AI COO successfully prepared an execution strategy.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-100 p-5 text-center">
            <p className="text-3xl font-bold">{totalProjects}</p>

            <p className="mt-2 text-sm text-slate-500">Projects</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 text-center">
            <p className="text-3xl font-bold">{totalTasks}</p>

            <p className="mt-2 text-sm text-slate-500">Tasks</p>
          </div>

          <div className="rounded-2xl bg-slate-100 p-5 text-center">
            <p className="text-3xl font-bold">{plan.kpis.length}</p>

            <p className="mt-2 text-sm text-slate-500">KPIs</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-indigo-600">
          <Sparkles className="animate-pulse" />

          <span className="font-semibold">Launching dashboard...</span>
        </div>
      </div>
    </div>
  );
}
