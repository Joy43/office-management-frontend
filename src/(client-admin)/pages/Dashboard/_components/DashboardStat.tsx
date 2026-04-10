import { CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface StatProps {
  label: string;
  value: string;
  isUp: boolean;
  status: 'success' | 'warning';
}

export const DashboardStat = ({ label, value, isUp, status }: StatProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[160px]">
    <div className="flex justify-between items-start">
      <span className="text-slate-900 font-bold text-base">{label}</span>
      {isUp ? <TrendingUp size={18} className="text-slate-400" /> : <TrendingDown size={18} className="text-slate-400" />}
    </div>
    <div className="mt-4 flex justify-between items-end">
      <div className="flex items-center gap-2">
        <span className={`text-2xl font-bold ${isUp ? 'text-[#8C23CC]' : 'text-[#B91010]'}`}>
          {isUp ? '↑' : '↓'}
        </span>
        <span className="text-4xl font-extrabold text-[#8C23CC] tracking-tight">{value}</span>
      </div>
      {status === 'success' ? (
        <CheckCircle2 className="text-[#10B956] w-6 h-6" />
      ) : (
        <AlertTriangle className="text-[#B89200] w-6 h-6" />
      )}
    </div>
  </div>
);