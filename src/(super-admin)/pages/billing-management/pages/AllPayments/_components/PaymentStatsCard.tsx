import type { ReactNode } from "react";


interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const PaymentStatsCard = ({ icon, label, value }: StatsCardProps) => (
  <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex-1">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-purple-50 rounded-lg text-[#8C23CC]">
        {icon}
      </div>
      <span className="font-bold text-slate-800 text-lg">{label}</span>
    </div>
    <div className="text-4xl font-bold text-[#8A2BE2]">{value}</div>
  </div>
);

export default PaymentStatsCard;