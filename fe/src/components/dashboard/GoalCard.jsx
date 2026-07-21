import { Target } from "lucide-react";

export default function GoalCard() {
  return (
    <div className="pt-4">
      <section
        className="
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-8
    shadow-sm
    h-full
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
  "
      >
        <div className="flex items-center gap-3">
          <Target className="text-indigo-600" size={22} />

          <span className="font-semibold text-slate-600">Goal</span>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">
          Build an AI Startup in 30 Days
        </h2>
      </section>
    </div>
  );
}
