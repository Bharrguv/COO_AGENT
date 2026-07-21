import { useEffect } from "react";

import ProjectBoard from "./ProjectBoard";
import AssignmentTable from "./AssignmentTable";
import KPIGrid from "./KPIGrid";
import RiskBoard from "./RiskBoard";
import HealthCard from "./HealthCard";
import FounderActionPanel from "./FounderActionPanel";
import ExecutionTimeline from "./ExecutionTimeline";
import COOChat from "./COOChat";
import FounderScore from "./FounderScore";

export default function DashboardGrid({
  plan,
  search = "",
  setMatchedSections,
  chatRef,
}) {
  const keyword = search.trim().toLowerCase();

  const filteredProjects = plan.projects.filter((project) => {
    if (!keyword) return true;

    return (
      project.title?.toLowerCase().includes(keyword) ||
      project.description?.toLowerCase().includes(keyword) ||
      project.tasks?.some(
        (task) =>
          task.title?.toLowerCase().includes(keyword) ||
          task.description?.toLowerCase().includes(keyword),
      )
    );
  });

  const filteredAssignments = plan.assignments.filter((assignment) => {
    if (!keyword) return true;

    return (
      assignment.owner?.toLowerCase().includes(keyword) ||
      assignment.task?.toLowerCase().includes(keyword) ||
      assignment.reason?.toLowerCase().includes(keyword)
    );
  });

  const filteredKPIs = plan.kpis.filter((kpi) => {
    if (!keyword) return true;

    return (
      kpi.metric?.toLowerCase().includes(keyword) ||
      String(kpi.target).toLowerCase().includes(keyword)
    );
  });

  const filteredRisks = plan.risks.filter((risk) => {
    if (!keyword) return true;

    return (
      risk.title?.toLowerCase().includes(keyword) ||
      risk.description?.toLowerCase().includes(keyword) ||
      risk.mitigation?.toLowerCase().includes(keyword)
    );
  });

  const matchedSections = [
    filteredProjects.length,
    filteredAssignments.length,
    filteredKPIs.length,
    filteredRisks.length,
  ].filter((count) => count > 0).length;

  useEffect(() => {
    setMatchedSections?.(matchedSections);
  }, [matchedSections, setMatchedSections]);

  const searching = keyword.length > 0;

  return (
    <div className="grid grid-cols-12 gap-6 pt-5">
      {!searching && (
        <div className="col-span-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <FounderScore plan={plan} />
            <HealthCard health={plan.health} />
            <FounderActionPanel plan={plan} />
          </div>
        </div>
      )}

      <div className="col-span-12 xl:col-span-7 flex">
        <ProjectBoard projects={filteredProjects} className="flex-1 h-full" />
      </div>

      <div className="col-span-12 xl:col-span-5 flex">
        <COOChat plan={plan} chatRef={chatRef} className="flex-1 h-full" />
      </div>

      {!searching && (
        <>
          <div className="col-span-12">
            <ExecutionTimeline projects={plan.projects} />
          </div>

          <div className="col-span-12">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <RiskBoard risks={filteredRisks} />

              <AssignmentTable assignments={filteredAssignments} />
            </div>
          </div>

          <div className="col-span-12">
            <KPIGrid kpis={filteredKPIs} />
          </div>
        </>
      )}
    </div>
  );
}
