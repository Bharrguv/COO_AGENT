import DashboardLayout from "../components/layout/DashboardLayout";
import TopNavbar from "../components/layout/TopNavbar";
import HeroBanner from "../components/hero/HeroBanner";
import MetricsGrid from "../components/overview/MetricsGrid";

import { usePlan } from "../contexts/PlanContext";
import { Navigate } from "react-router-dom";

export default function DashboardV2() {
  const { plan } = usePlan();

  if (!plan) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout>
      <TopNavbar />

      <div className="space-y-8">
        <HeroBanner plan={plan} />

        <MetricsGrid plan={plan} />
      </div>
    </DashboardLayout>
  );
}
