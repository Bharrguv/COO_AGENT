import DashboardCard from "../common/DashboardCard";
import { User, CheckCircle2, Briefcase, ArrowRight } from "lucide-react";

export default function AssignmentTable({ assignments = [], search = "" }) {
  const keyword = search.toLowerCase();

  const filteredAssignments = assignments.filter((assignment) => {
    if (!keyword) return true;

    return (
      assignment.owner.toLowerCase().includes(keyword) ||
      assignment.task.toLowerCase().includes(keyword) ||
      assignment.reason.toLowerCase().includes(keyword)
    );
  });

  return (
    <DashboardCard
      title="Team Assignments"
      subtitle="AI generated ownership plan"
      className="h-[520px]"
    >
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No matching assignments found.
          </div>
        ) : (
          filteredAssignments.map((assignment, index) => (
            <div
              key={index}
              className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-indigo-300
                hover:shadow-lg
              "
            >
              {/* Header */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-indigo-100 p-3">
                    <User size={20} className="text-indigo-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {assignment.owner}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {assignment.reason}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Assigned
                </span>
              </div>

              {/* Task */}

              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
                  <Briefcase size={14} />
                  Assigned Task
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <h4 className="font-medium text-slate-800">
                    {assignment.task}
                  </h4>

                  <ArrowRight size={18} className="text-slate-400" />
                </div>
              </div>

              {/* Footer */}

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 size={16} className="text-emerald-500" />
                AI believes this owner is the best fit based on expertise.
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardCard>
  );
}
