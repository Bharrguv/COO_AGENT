import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProgressStep from "./ProgressStep";

const steps = [
  "Understanding your startup goal",
  "Breaking goal into projects",
  "Assigning team members",
  "Identifying execution risks",
  "Creating KPIs",
  "Preparing executive summary",
];

export default function ThinkingScreen({ onComplete }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= steps.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setCurrent((prev) => prev + 1);
    }, 900);

    return () => clearTimeout(timer);
  }, [current]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-24 max-w-3xl"
    >
      <h2 className="text-4xl font-bold text-center">
        Building your execution strategy
      </h2>

      <p className="mt-4 text-center text-slate-500">
        This usually takes a few seconds.
      </p>

      <div className="mt-14 space-y-8">
        {steps.map((step, index) => (
          <ProgressStep
            key={step}
            title={step}
            active={index === current}
            completed={index < current}
          />
        ))}
      </div>
    </motion.div>
  );
}
