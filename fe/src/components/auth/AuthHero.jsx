import { Bot, BrainCircuit, ShieldCheck, BarChart3 } from "lucide-react";

export default function AuthHero() {
  return (
    <div className="hidden lg:flex flex-col justify-center h-full bg-gradient-to-br from-indigo-600 via-violet-600 to-slate-900 text-white p-16">
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
          <Bot size={18} />
          AI Executive Operating System
        </div>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight">
          COO Agent
        </h1>

        <p className="mt-6 text-xl text-indigo-100 leading-8">
          Build, prioritize and execute your startup with autonomous AI
          executives.
        </p>

        <div className="mt-12 space-y-5">
          <Feature
            icon={<BrainCircuit size={22} />}
            title="Multi-Agent Planning"
          />

          <Feature icon={<ShieldCheck size={22} />} title="Risk Analysis" />

          <Feature icon={<BarChart3 size={22} />} title="KPI Tracking" />
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-white/10 p-3">{icon}</div>

      <span className="text-lg">{title}</span>
    </div>
  );
}
