import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white h-24 border-b border-slate-200 px-10 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Welcome back 👋</h1>

        <p className="text-slate-500 mt-1">Ready to build your next startup?</p>
      </div>

      <div className="flex items-center gap-5">
        <button className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <Search size={20} />
        </button>

        <button className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <Bell size={20} />
        </button>

        <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
          B
        </div>
      </div>
    </header>
  );
}
