import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const MetricCard = ({ title, value, icon: Icon }: MetricCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
      {/* Top section: Title on left, Icon on right */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#8C23CC]" />
        </div>
        <p className="text-base font-bold text-slate-900">{title}</p>
      </div>
      {/* Bottom section: Large bold number */}
      <div>
        <p className="text-4xl font-bold text-[#8C23CC]">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;

