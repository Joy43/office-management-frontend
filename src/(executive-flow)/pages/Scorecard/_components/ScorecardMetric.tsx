import { CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface MetricProps {
  label: string;
  value: string;
  trend?: string;
  isUp: boolean;
  status: 'success' | 'warning';
}

export const ScorecardMetric = ({ label, value, isUp, status }: MetricProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
    <div className="flex justify-between items-start">
      <span className="text-slate-800 font-bold text-sm">{label}</span>
      {isUp ? <TrendingUp size={16} className="text-slate-400" /> : <TrendingDown size={16} className="text-slate-400" />}
    </div>
    <div className="mt-4 flex justify-between items-end">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {isUp ? <span className="text-[#8C23CC] text-3xl">↑</span> : <span className="text-[#B91010] text-3xl">↓</span>}
          <span className="text-3xl font-extrabold text-[#8C23CC]">{value}</span>
        </div>
      
      </div>
      {status === 'success' ? (
        <CheckCircle2 className="text-[#10B956] w-6 h-6" />
      ) : (
        <AlertTriangle className="text-[#B89200] w-6 h-6" />
      )}
    </div>
  </div>
);