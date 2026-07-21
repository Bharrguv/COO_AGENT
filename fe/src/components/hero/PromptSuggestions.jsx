
import { usePlan } from "../../contexts/PlanContext";

const prompts = [
  "Build an AI Startup in 30 days",
  "Launch a SaaS CRM platform",
  "Create a Marketplace business",
  "Build a FinTech Product",
];

export default function PromptSuggestions() {
  const { setPrompt } = usePlan();

  return (
    <div className="mt-12 pt-3 pb-3">
      <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-slate-400">
        Try one of these
      </p>

      <div className="mt-10 flex flex-wrap pt-3 justify-center gap-3">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setPrompt(prompt)}
            className="
              rounded-full
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-indigo-300
              hover:bg-indigo-50
              hover:text-indigo-600
            "
          >
            🚀 {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

