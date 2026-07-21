import { motion } from "framer-motion";

export default function DashboardCard({
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`
        h-full
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white/90
        backdrop-blur-md
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-xl
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="border-b border-slate-100 px-8 py-6">
          {title && (
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
          )}
        </div>
      )}

      <div className="h-full overflow-y-auto p-8">{children}</div>
    </motion.section>
  );
}
