import Hero from "../components/hero/Hero";
import RecentPlans from "../components/RecentPlans";
import LandingLayout from "../layouts/LandingLayout";
import { usePlan } from "../contexts/PlanContext";
import { useAuth } from "@clerk/clerk-react";

export default function Home() {
  const { plan } = usePlan();
  const { isLoaded, isSignedIn, userId } = useAuth();
  console.log(plan);
   console.log({
    isLoaded,
    isSignedIn,
    userId,
  });
  return (
    <LandingLayout>
      <Hero />

      <RecentPlans />
    </LandingLayout>
  );
}
