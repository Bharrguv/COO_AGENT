export default function SectionCard({ title, children }) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h3 className="mb-6 text-xl font-bold text-slate-800">{title}</h3>

      {children}
    </div>
  );
}
