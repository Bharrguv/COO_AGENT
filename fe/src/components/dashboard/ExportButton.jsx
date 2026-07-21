
import { Download } from "lucide-react";
import { exportPlanPDF } from "../../utils/exportReport";

export default function ExportButton({ plan }) {
  function handleExport() {
    if (!plan) return;

    exportPlanPDF(plan);
  }

  return (
    <button
      onClick={handleExport}
      className="
        flex
        items-center
        gap-2
        rounded-xl
        bg-slate-900
        px-5
        py-3
        text-white
        transition
        hover:bg-indigo-600
        hover:shadow-lg
      "
    >
      <Download size={18} />
      Export Report
    </button>
  );
}

