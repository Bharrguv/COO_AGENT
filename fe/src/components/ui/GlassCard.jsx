export default function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/60
        bg-white/80
        backdrop-blur-xl
        shadow-lg
        shadow-slate-200/60
        transition-all
        duration-300
        ${
          hover
            ? "hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
