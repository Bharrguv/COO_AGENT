import { BrainCircuit, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import StartupTips from "./StartupTips";

const steps = [
  "Understanding your startup...",
  "Building execution roadmap...",
  "Assigning responsibilities...",
  "Calculating KPIs...",
  "Analyzing risks...",
  "Preparing executive insights...",
];

export default function AiLoadingOverlay({ loading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!loading) return;

    const target = ((currentStep + 1) / steps.length) * 100;

    const animation = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(animation);
          return target;
        }

        return prev + 2;
      });
    }, 20);

    return () => clearInterval(animation);
  }, [currentStep, loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-lg">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-2xl bg-indigo-100 p-3">
            <BrainCircuit size={42} className="animate-pulse text-indigo-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              AI COO Working
            </h2>

            <p className="mt-1 text-slate-500">
              Building your startup execution strategy
            </p>
          </div>
        </div>

        {/* Progress Bar */}

        <div className="overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-3 rounded-full bg-indigo-600 transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="mt-3 text-right font-semibold text-indigo-600">
          {Math.round(progress)}%
        </div>

        {/* Workflow Steps */}

        <div className="mt-10 space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center gap-4">
              {index < currentStep ? (
                <CheckCircle2 size={22} className="text-green-600" />
              ) : index === currentStep ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              ) : (
                <div className="h-5 w-5 rounded-full bg-slate-200" />
              )}

              <span
                className={`
                  transition-all
                  duration-500
                  ${
                    index < currentStep
                      ? "font-medium text-green-600"
                      : index === currentStep
                        ? "font-semibold text-indigo-700"
                        : "text-slate-400"
                  }
                `}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <StartupTips />
      </div>
    </div>
  );
}
