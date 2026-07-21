import { useEffect, useState } from "react";

const tips = [
  "💡 Great founders spend more time prioritizing than building.",
  "🚀 Shipping an MVP quickly beats chasing perfection.",
  "📊 Successful startups measure everything.",
  "⚡ Focus on solving one painful problem really well.",
  "🤝 The right hires are worth more than many hires.",
  "🎯 Customer feedback is your biggest competitive advantage.",
];

export default function StartupTips() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="mt-8 text-center text-sm text-slate-500 transition-all duration-500">
      {tips[index]}
    </p>
  );
}
