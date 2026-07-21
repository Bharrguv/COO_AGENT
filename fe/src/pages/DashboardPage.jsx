import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import GoalCard from "../components/dashboard/GoalCard";
import ExecutiveSummary from "../components/dashboard/ExecutiveSummary";
import DashboardGrid from "../components/dashboard/DashboardGrid";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import ExecutiveOverview from "../components/dashboard/ExecutiveOverview";
import SearchBar from "../components/dashboard/SearchBar";
import SearchResultsBanner from "../components/dashboard/SearchResultsBanner";

import { usePlan } from "../contexts/PlanContext";
import { googleService } from "../services/google.service";

export default function DashboardPage() {
  const loading = false;

  const { plan } = usePlan();
  const { getToken } = useAuth();

  const [search, setSearch] = useState("");
  const [matchedSections, setMatchedSections] = useState(0);
  const [syncing, setSyncing] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [plan]);

  if (!plan) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  const handleGoogleSync = async () => {
    //  console.log(plan);
    //  console.log(plan.id);
    try {
      setSyncing(true);

      const token = await getToken();

      // TODO:
      
      const userId = "demo-user";

      const response = await googleService.syncCalendar(plan.id, userId, token);

      alert(
        `✅ Successfully synced ${
          response.data.events_created ?? response.data.events_synced ?? 0
        } task(s) to Google Calendar`,
      );
    } catch (err) {
      console.error(err);

      alert(
        err?.response?.data?.detail ??
          err?.response?.data?.message ??
          "Failed to sync Google Calendar.",
      );
    } finally {
      setSyncing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader plan={plan} />

        <div className="flex justify-end pb-5">
          <button
            onClick={handleGoogleSync}
            disabled={syncing}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-green-600
              px-5
              py-3
              font-semibold
              text-white
              transition
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <CalendarDays size={18} />

            {syncing ? "Syncing..." : "Sync to Google Calendar"}
          </button>
        </div>

        <ExecutiveOverview plan={plan} />

        <GoalCard goal={plan.goal} />

        <ExecutiveSummary insights={plan.insights} />

        <SearchBar value={search} onChange={setSearch} />

        <SearchResultsBanner
          search={search}
          sections={matchedSections}
          onClear={() => setSearch("")}
        />

        <DashboardGrid
          plan={plan}
          search={search}
          setMatchedSections={setMatchedSections}
          chatRef={chatRef}
        />
      </div>

      <button
        onClick={() =>
          chatRef.current?.scrollIntoView({
            behavior: "smooth",
          })
        }
        className="
          fixed
          bottom-8
          right-8
          z-50
          flex
          items-center
          gap-3
          rounded-full
          bg-indigo-600
          px-6
          py-4
          text-white
          shadow-xl
          transition
          hover:scale-105
          hover:bg-indigo-700
        "
      >
        <span className="font-semibold">Ask AI COO</span>
      </button>
    </DashboardLayout>
  );
}
