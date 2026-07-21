import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [prompt, setPrompt] = useState("");

  const [completedActions, setCompletedActions] = useState(() => {
    const saved = localStorage.getItem("completedActions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("completedActions", JSON.stringify(completedActions));
  }, [completedActions]);

  const toggleAction = (index) => {
    setCompletedActions((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }

      return [...prev, index];
    });
  };

  const value = {
    plan,
    setPlan,

    prompt,
    setPrompt,

    loading,
    setLoading,

    error,
    setError,

    completedActions,
    toggleAction,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
