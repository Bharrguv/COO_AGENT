import DashboardCard from "../common/DashboardCard";
import { TrendingUp, Target, CalendarDays } from "lucide-react";

export default function KPIGrid({ kpis = [] }) {
  return (
    <DashboardCard
      title="Key Performance Indicators"
      subtitle="Metrics that define startup success"
    >
      <div className="space-y-4">
        {kpis.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            No KPIs available.
          </div>
        ) : (
          kpis.map((kpi, index) => (
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
              {/* Metric */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-100 p-2">
                    <TrendingUp className="text-indigo-600" size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      KPI
                    </p>

                    <h3 className="font-semibold text-slate-900">
                      {kpi.metric}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Target */}

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Target size={15} />
                    Target
                  </div>

                  <span className="font-semibold text-indigo-600">
                    {kpi.target}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-indigo-600"
                    style={{
                      width: "65%",
                    }}
                  />
                </div>
              </div>

              {/* Timeline */}

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={15} />
                  Timeline
                </div>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  {kpi.timeline}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardCard>
  );
}
