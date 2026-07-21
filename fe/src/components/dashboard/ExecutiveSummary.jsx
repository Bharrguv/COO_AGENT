import { FileText } from "lucide-react";

export default function ExecutiveSummary() {
  return (
    <div className="pt-12 pb-5">
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
          <FileText className="text-indigo-600" size={22} />

          <h2 className="font-semibold text-slate-700">Executive Summary</h2>
        </div>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Your AI startup execution plan focuses on rapid MVP development,
          assembling the right team, identifying execution risks, and tracking
          KPIs required to launch successfully within 30 days.
        </p>
      </section>
    </div>
  );
}
