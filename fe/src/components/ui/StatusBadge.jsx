export default function StatusBadge({ text, color = "indigo" }) {
  const styles = {
    emerald: "bg-emerald-100 text-emerald-700",

    amber: "bg-amber-100 text-amber-700",

    red: "bg-red-100 text-red-700",

    indigo: "bg-indigo-100 text-indigo-700",

    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`
        rounded-full
        px-4
        py-2
        text-sm
        font-semibold
        ${styles[color]}
      `}
    >
      {text}
    </span>
  );
}
