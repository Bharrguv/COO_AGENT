import PromptBox from "./PromptBox";
import PromptSuggestions from "./PromptSuggestions";

export default function Hero() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl text-center">
        <div
          className="
            inline-flex
            rounded-full
            border
            border-indigo-100
            bg-indigo-50
            px-5
            py-2
            text-sm
            font-semibold
            text-indigo-700
          "
        >
          ✨ AI Executive Operating System
        </div>

        <h1
          className="
          mt-10
          text-6xl
          font-extrabold
          leading-[1.1]
          tracking-tight
          text-slate-900
          lg:text-7xl
        "
        >
          Turn your startup idea
          <br />
          into an execution system
        </h1>

        <p
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-xl
            leading-9
            text-slate-500
          "
        >
          Generate projects, tasks, risks, KPIs, executive insights and founder
          recommendations powered by AI.
        </p>

        <PromptBox />

        <PromptSuggestions />
      </div>
    </section>
  );
}
