/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetExecutiveOverviewQuery } from "@/redux/features/Executive/executiveDashboardApi";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const SummaryCard = ({ label, value, change, trend, status }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
    <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">
      {label}
    </span>
    <div className="mt-4 flex justify-between items-end">
      <div>
        <div className="text-3xl font-extrabold text-[#8C23CC]">{value}</div>
        <div
          className={`flex items-center gap-1 text-xs font-bold mt-1 ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}
        >
          {trend === "up" ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          {change} {label === "CSAT" ? "pts" : "%"}
        </div>
      </div>
      {status === "good" ? (
        <CheckCircle2 className="text-emerald-500 w-6 h-6 mb-1" />
      ) : (
        <AlertTriangle className="text-amber-500 w-6 h-6 mb-1" />
      )}
    </div>
  </div>
);

export const DashboardSummary = () => {
  const { data, isLoading } = useGetExecutiveOverviewQuery(undefined);

  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-6 h-32 animate-pulse bg-slate-100 rounded-xl" />
    );

  const s = data?.summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        label="Complaints"
        value={`${s?.complaints?.value || 0}%`}
        change={s?.complaints?.change}
        trend={s?.complaints?.trend}
        status={s?.complaints?.status}
      />
      <SummaryCard
        label="CSAT"
        value={`${s?.csat?.value || 0} pts`}
        change={s?.csat?.change}
        trend={s?.csat?.trend}
        status={s?.csat?.status}
      />
      <SummaryCard
        label="Repeat"
        value={`${s?.repeat?.value || 0}%`}
        change={s?.repeat?.change}
        trend={s?.repeat?.trend}
        status={s?.repeat?.status}
      />
      <SummaryCard
        label="Adoptions"
        value={`${s?.adoptions?.value || 0}%`}
        change={s?.adoptions?.change}
        trend={s?.adoptions?.trend}
        status={s?.adoptions?.status}
      />
    </div>
  );
};
