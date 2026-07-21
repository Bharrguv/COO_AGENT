import DashboardCard from "../common/DashboardCard";
import RiskCard from "./RiskCard";
import { ShieldCheck } from "lucide-react";

export default function RiskBoard({ risks = [], search = "" }) {
  const keyword = search.toLowerCase();

  const filteredRisks = risks.filter((risk) => {
    if (!search) return true;

    return (
      risk.title?.toLowerCase().includes(keyword) ||
      risk.description?.toLowerCase().includes(keyword) ||
      risk.mitigation?.toLowerCase().includes(keyword)
    );
  });

  return (
    <DashboardCard
      title="Risk Intelligence"
      subtitle="AI identified execution risks"
      className="h-[520px]"
    >
      <div className="space-y-4">
        {filteredRisks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <ShieldCheck className="mx-auto mb-3 text-emerald-500" size={30} />

            <h3 className="font-semibold text-slate-700">
              No execution risks found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your startup plan currently has no critical risks.
            </p>
          </div>
        ) : (
          filteredRisks.map((risk, index) => (
            <RiskCard key={index} risk={risk} />
          ))
        )}
      </div>
    </DashboardCard>
  );
}
