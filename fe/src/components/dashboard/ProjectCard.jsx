import { useMemo, useState } from "react";
import {
  FolderKanban,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
} from "lucide-react";

import TaskCard from "./TaskCard";
import { useTasks } from "../../contexts/TaskContext";

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(true);

  const { taskStatus } = useTasks();

  const completedTasks = useMemo(() => {
    return project.tasks.filter((task, index) => {
      const id = `${project.title}-${index}`;
      return taskStatus[id] === "Completed";
    }).length;
  }, [project.tasks, project.title, taskStatus]);

  const progress = Math.round(
    (completedTasks / Math.max(project.tasks.length, 1)) * 100,
  );

  const projectStatus = useMemo(() => {
    if (progress === 0) {
      return {
        label: "Not Started",
        color: "bg-slate-100 text-slate-700",
      };
    }

    if (progress < 50) {
      return {
        label: "In Progress",
        color: "bg-amber-100 text-amber-700",
      };
    }

    if (progress < 100) {
      return {
        label: "Near Completion",
        color: "bg-blue-100 text-blue-700",
      };
    }

    return {
      label: "Completed 🎉",
      color: "bg-emerald-100 text-emerald-700",
    };
  }, [progress]);

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-300
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-indigo-100 p-3">
            <FolderKanban className="text-indigo-600" size={22} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {project.title}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              {project.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-4 py-2 text-xs font-semibold ${projectStatus.color}`}
          >
            {projectStatus.label}
          </span>

          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Progress */}

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">Progress</span>

          <span className="text-sm font-semibold text-indigo-600">
            {progress}%
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

      {/* Completion Banner */}

      {progress === 100 && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-700">
            🎉 Congratulations! This project is complete.
          </p>

          <p className="mt-1 text-sm text-emerald-600">
            Time to move on to the next strategic initiative.
          </p>
        </div>
      )}

      {/* Stats */}

      <div className="mt-5 flex items-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-500" />
          {completedTasks} completed
        </div>

        <div className="flex items-center gap-2">
          <Circle size={14} className="text-slate-400" />
          {project.tasks.length} total tasks
        </div>
      </div>

      {/* Tasks */}

      {expanded && (
        <>
          <div className="mt-6 space-y-3">
            {project.tasks
              .sort((a, b) => {
                const order = {
                  High: 0,
                  Medium: 1,
                  Low: 2,
                };

                return order[a.priority] - order[b.priority];
              })
              .slice(0, 3)
              .map((task, index) => (
                <TaskCard
                  key={`${project.title}-${index}`}
                  task={task}
                  taskId={`${project.title}-${index}`}
                />
              ))}
          </div>

          {project.tasks.length > 3 && (
            <button
              className="
          mt-4
          w-full
          rounded-xl
          border
          border-slate-200
          py-3
          text-sm
          font-medium
          text-indigo-600
          transition
          hover:bg-indigo-50
        "
            >
              View {project.tasks.length - 3} More Tasks
            </button>
          )}
        </>
      )}
    </div>
  );
}
