import { Sparkles } from "lucide-react";

export default function EmptyState({
  title,
  description,
  buttonText = "Generate Plan",
  onClick,
}) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-10 text-center">
      <div className="mb-6 rounded-full bg-indigo-100 p-5">
        <Sparkles size={36} className="text-indigo-600" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

      <p className="mt-4 max-w-md leading-7 text-slate-500">{description}</p>

      <button
        onClick={onClick}
        className="
          mt-8
          rounded-xl
          bg-indigo-600
          px-6
          py-3
          font-semibold
          text-white
          transition
          hover:bg-indigo-700
        "
      >
        {buttonText}
      </button>
    </div>
  );
}
