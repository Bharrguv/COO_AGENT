import {
  LayoutDashboard,
  FolderKanban,
  History,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Projects",
    icon: FolderKanban,
  },
  {
    title: "History",
    icon: History,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
      <div className="h-24 border-b flex items-center px-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow">
          <Sparkles className="text-white" size={22} />
        </div>

        <div className="ml-4">
          <h1 className="font-bold text-2xl text-slate-900">COO Agent</h1>

          <p className="text-sm text-slate-500">AI Executive OS</p>
        </div>
      </div>

      <nav className="flex-1 p-5 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition

              ${
                item.active
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-100 text-slate-600"
              }
              `}
            >
              <Icon size={20} />

              {item.title}
            </button>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="font-semibold">AI COO</p>

          <p className="text-sm text-slate-500 mt-2">
            Plan your startup faster with AI.
          </p>
        </div>
      </div>
    </aside>
  );
}
