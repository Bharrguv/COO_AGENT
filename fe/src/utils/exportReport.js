import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPlanPDF(plan) {
  const doc = new jsPDF();

  let y = 18;

  doc.setFontSize(22);
  doc.text("AI COO Executive Report", 14, y);

  y += 12;

  doc.setFontSize(12);

  doc.text(`Goal: ${plan.goal}`, 14, y);

  y += 10;

  doc.text(
    `Health Score: ${plan.health.overall_score}%`,
    14,
    y
  );

  y += 12;

  doc.setFontSize(16);
  doc.text("Executive Summary", 14, y);

  y += 8;

  doc.setFontSize(11);

  doc.text(
    doc.splitTextToSize(
      plan.insights.executive_summary,
      180
    ),
    14,
    y
  );

  y += 35;

  autoTable(doc, {
    startY: y,
    head: [["Projects", "Description"]],
    body: plan.projects.map((p) => [
      p.title,
      p.description,
    ]),
  });

  y = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: y,
    head: [["Assignments", "Task"]],
    body: plan.assignments.map((a) => [
      a.owner,
      a.task,
    ]),
  });

  y = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: y,
    head: [["Risk", "Mitigation"]],
    body: plan.risks.map((r) => [
      r.title,
      r.mitigation,
    ]),
  });

  y = doc.lastAutoTable.finalY + 10;

  autoTable(doc, {
    startY: y,
    head: [["KPI", "Target"]],
    body: plan.kpis.map((k) => [
      k.metric,
      k.target,
    ]),
  });

  y = doc.lastAutoTable.finalY + 12;

  doc.setFontSize(15);

  doc.text("Founder Recommendations", 14, y);

  y += 8;

  doc.setFontSize(11);

  plan.insights.recommendations.forEach((rec) => {
    doc.text(`• ${rec}`, 18, y);

    y += 7;
  });

  doc.save("COO-Executive-Report.pdf");
}
