import GlassCard from "./GlassCard";

export default function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  color = "text-indigo-600",
}) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-3 text-4xl font-bold">{value}</h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div
            className={`
              rounded-2xl
              bg-slate-100
              p-4
              ${color}
            `}
          >
            <Icon size={26} />
          </div>
        )}
      </div>
    </GlassCard>
  );
}
