export default function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div className="flex gap-4">
        {Icon && (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-indigo-100
              text-indigo-600
            "
          >
            <Icon size={22} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

          {subtitle && <p className="mt-1 text-slate-500">{subtitle}</p>}
        </div>
      </div>

      {action}
    </div>
  );
}
