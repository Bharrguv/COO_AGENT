import api from "./api";

export async function chatWithCOO(plan, question, history = []) {
  const context = `
GOAL:
${plan.goal}

PROJECTS:
${plan.projects
  ?.map(
    (p) => `
Project: ${p.title}

Description:
${p.description}

Tasks:
${p.tasks?.map((t) => `- ${t.title}: ${t.description}`).join("\n")}
`,
  )
  .join("\n")}

ASSIGNMENTS:
${plan.assignments?.map((a) => `${a.owner} -> ${a.task}`).join("\n")}

RISKS:
${plan.risks
  ?.map(
    (r) => `
${r.title}

${r.description}

Mitigation:
${r.mitigation}
`,
  )
  .join("\n")}

KPIs:
${plan.kpis?.map((k) => `${k.metric}: ${k.target}`).join("\n")}

RECOMMENDATIONS:
${plan.insights?.recommendations?.join("\n")}
`;

  const response = await api.post("/chat", {
    context,
    question,
    history,
  });

  return response.data.answer;
}
