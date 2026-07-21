import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgressStep({ title, active, completed }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4"
    >
      {completed ? (
        <CheckCircle2 className="text-green-500" size={22} />
      ) : active ? (
        <Loader2 className="animate-spin text-indigo-600" size={22} />
      ) : (
        <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
      )}

      <p
        className={`text-lg ${
          completed
            ? "text-slate-900"
            : active
              ? "text-indigo-600 font-semibold"
              : "text-slate-400"
        }`}
      >
        {title}
      </p>
    </motion.div>
  );
}
