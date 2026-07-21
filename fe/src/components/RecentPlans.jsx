import { Clock3, ArrowRight } from "lucide-react";

const plans = [
  {
    title: "AI Startup",
    date: "2 hours ago",
  },
  {
    title: "CRM Platform",
    date: "Yesterday",
  },
  {
    title: "Travel App",
    date: "3 days ago",
  },
];

export default function RecentPlans() {
  return (
    <section className="mt-20">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Plans</h2>

        <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700">
          View All
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold">{plan.title}</h3>

            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <Clock3 size={16} />

              {plan.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
