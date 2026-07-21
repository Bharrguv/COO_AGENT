export default function DashboardLayout({ children }) {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-50
      via-white
      to-indigo-50/40
    "
    >
      <main className="mx-auto max-w-7xl px-8 py-12">{children}</main>
    </div>
  );
}
