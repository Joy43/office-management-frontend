import type { LucideIcon } from "lucide-react";


interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  trend: string;
}

 const StatCard = ({ title, value, icon: Icon, color, trend }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full">
    <div className="flex justify-between items-start">
      {/* Icon with soft background circle as seen in images */}
      <div className="p-2.5 bg-purple-50 rounded-lg text-[#8C23CC]">
        <Icon size={22} strokeWidth={2.5} />
      </div>
      {/* Trend indicator */}
      <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        {trend}
      </div>
    </div>
    
    <div className="mt-5">
      <p className="text-slate-900 font-bold text-base mb-1">{title}</p>
      <p className="text-4xl font-extrabold tracking-tight" style={{ color }}>
        {value}
      </p>
    </div>
  </div>
);

export default StatCard