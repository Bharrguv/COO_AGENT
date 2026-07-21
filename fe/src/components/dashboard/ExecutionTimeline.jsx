import { CalendarDays, CheckCircle2, Circle } from "lucide-react";

import DashboardCard from "../common/DashboardCard";

export default function ExecutionTimeline({ projects }) {
  if (!projects) return null;

  const timeline = [];

  projects.forEach((project, pIndex) => {
    timeline.push({
      title: project.title,
      description: project.description,
      completed: pIndex === 0,
      type: "Project",
    });

    project.tasks?.forEach((task, tIndex) => {
      timeline.push({
        title: task.title,
        description: task.description,
        completed: pIndex === 0 && tIndex < 2,
        type: "Task",
      });
    });
  });

  return (
    <DashboardCard
      title="Execution Timeline"
      subtitle="Suggested order of execution"
    >
      <div className="max-h-[560px] overflow-y-auto pr-3">
        <div className="relative ml-4 mt-4 border-l-2 border-slate-200">
          {timeline.map((item, index) => (
            <div key={index} className="relative mb-6 ml-8">
              {/* Timeline Dot */}

              <div className="absolute -left-[42px] top-5">
                {item.completed ? (
                  <CheckCircle2 className="text-emerald-500" size={22} />
                ) : (
                  <Circle className="text-slate-300" size={20} />
                )}
              </div>

              {/* Card */}

              <div
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:border-indigo-300
                  hover:shadow-lg
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.completed
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {item.completed ? "Completed" : "Upcoming"}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <CalendarDays size={15} />

                  {item.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
