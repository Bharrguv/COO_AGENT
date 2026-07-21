import {
  Clock3,
  CheckCircle2,
  Circle,
  CalendarDays,
  Loader2,
} from "lucide-react";

import { useTasks } from "../../contexts/TaskContext";

const priorityColor = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const statusStyle = {
  Todo: "bg-slate-100 text-slate-700",
  "In Progress": "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

export default function TaskCard({ task, taskId }) {
  const { taskStatus, updateTask } = useTasks();

  const status = taskStatus[taskId] || "Todo";

  function toggleStatus() {
    let next = "Todo";

    if (status === "Todo") next = "In Progress";
    else if (status === "In Progress") next = "Completed";
    else next = "Todo";

    updateTask(taskId, next);
  }

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5
        transition-all
        duration-300
        hover:border-indigo-300
        hover:shadow-md
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <button
          onClick={toggleStatus}
          className="mt-1 transition hover:scale-110"
        >
          {status === "Completed" ? (
            <CheckCircle2 size={21} className="text-emerald-500" />
          ) : status === "In Progress" ? (
            <Loader2 size={20} className="animate-spin text-amber-500" />
          ) : (
            <Circle size={19} className="text-slate-400" />
          )}
        </button>

        <div className="flex-1">
          <h4 className="font-semibold text-slate-900">{task.title}</h4>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {task.description}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityColor[task.priority]
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Footer */}

      <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Clock3 size={15} />
          {task.estimated_days} days
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={15} />
          ETA
        </div>

        <span
          className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
            statusStyle[status]
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
