import type { LucideIcon } from "lucide-react";

interface CoachingMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  subtitle?: string;
}

const CoachingMetricCard = ({
  title,
  value,
  icon: Icon,
  change,
  subtitle,
}: CoachingMetricCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#8C23CC]" />
        </div>
        <div className="flex items-center flex-col gap-0.5">
        <p className="text-base font-bold text-slate-900">{title}</p>
        </div>
      </div>
      <div className="flex items-center flex-col lg:flex-row gap-2">
        <p className="text-4xl font-bold text-[#8C23CC]">{value}</p>
        {change && <p className="text-sm text-green-600 mt-1">{change}</p>}
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default CoachingMetricCard;

