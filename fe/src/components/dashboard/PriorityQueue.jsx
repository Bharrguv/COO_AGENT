import {
  ArrowUpCircle,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

import DashboardCard from "../common/DashboardCard";

function getPriority(project) {
  const urgent =
    project.tasks?.filter((t) => t.priority === "High").length || 0;

  const progress =
    project.tasks?.filter((t) => t.status === "Done").length || 0;

  return urgent * 3 - progress;
}

export default function PriorityQueue({ projects = [] }) {
  const ranked = [...projects]
    .map((project) => ({
      ...project,
      score: getPriority(project),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="pt-5">
    <DashboardCard
      title="Founder Priority Queue"
      subtitle="AI-ranked execution order"
    >
      <div className="space-y-4">
        {ranked.map((project, index) => (
          <div
            key={project.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              transition
              hover:border-indigo-300
              hover:shadow-lg
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-indigo-100
                      text-indigo-700
                      font-bold
                    "
                  >
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>

                <p className="mt-3 text-slate-500">{project.description}</p>
              </div>

              <ArrowUpCircle className="text-indigo-600" size={26} />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge
                icon={<Clock3 size={16} />}
                text={`${project.tasks.length} Tasks`}
              />

              <Badge
                icon={<AlertTriangle size={16} />}
                text={`Priority Score ${project.score}`}
              />

              <Badge
                icon={<CheckCircle2 size={16} />}
                text={`${
                  project.tasks.filter((t) => t.status === "Done").length
                } Completed`}
              />
            </div>

            <div className="mt-6 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{
                  width: `${
                    (project.tasks.filter((t) => t.status === "Done").length /
                      project.tasks.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
    </div>
  );
}

function Badge({ icon, text }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-full
        bg-slate-100
        px-4
        py-2
        text-sm
        text-slate-700
      "
    >
      {icon}
      {text}
    </div>
  );
}
