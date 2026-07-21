export default function LandingLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">

      {/* Background Gradient */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-60" />

        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-orange-100 blur-3xl opacity-50" />

        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-sky-100 blur-3xl opacity-40" />

      </div>

      {/* Content */}

      <div className="relative z-10">

        <div className="mx-auto max-w-7xl px-6 lg:px-12">

          {children}

        </div>

      </div>

    </div>
  );
}