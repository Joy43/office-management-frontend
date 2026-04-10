import React from 'react';
import { Check } from 'lucide-react';

interface FeatureRow {
  feature: string;
  starter: string | React.ReactNode;
  growth: string | React.ReactNode;
  enterprise: string | React.ReactNode;
  isBold?: boolean;
}

const PlanComparisonTable = () => {
  const comparisonData: FeatureRow[] = [
    { feature: "Users", starter: "10", growth: "30", enterprise: "Unlimited", isBold: true },
    { feature: "SMS Credits", starter: "500/mo", growth: "2000/mo", enterprise: "100/MO", isBold: true },
    { feature: "Storage", starter: "5 GB", growth: "25GB", enterprise: "100 GB", isBold: true },
    { feature: "API Calls", starter: "10K/mo", growth: "50K/mo", enterprise: "Unlimited", isBold: true },
    { 
      feature: "Custom Branding", 
      starter: <span className="text-slate-300">—</span>, 
      growth: <Check className="w-5 h-5 mx-auto text-slate-900" />, 
      enterprise: "White label", 
      isBold: true 
    },
    { 
      feature: "SSO", 
      starter: <span className="text-slate-300">—</span>, 
      growth: <span className="text-slate-400">Growth Plan</span>, 
      enterprise: <Check className="w-5 h-5 mx-auto text-slate-900" />, 
      isBold: true 
    },
    { 
      feature: "Support", 
      starter: <span className="text-slate-400">Email</span>, 
      growth: <span className="text-slate-400">Growth Plan</span>, 
      enterprise: "24/7 Phone", 
      isBold: true 
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="py-4 px-6 text-left text-sm font-medium text-slate-500 w-1/4">Feature</th>
            <th className="py-4 px-6 text-sm font-medium text-slate-500 w-1/4">Starter</th>
            <th className="py-4 px-6 text-sm font-medium text-slate-500 w-1/4">Growth</th>
            <th className="py-4 px-6 text-sm font-medium text-slate-500 w-1/4">Enterprise</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {comparisonData.map((row, index) => (
            <tr key={index} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-5 px-6 text-left text-sm font-bold text-slate-900">
                {row.feature}
              </td>
              <td className="py-5 px-6 text-sm text-slate-400">
                {row.starter}
              </td>
              <td className="py-5 px-6 text-sm text-slate-400">
                {row.growth}
              </td>
              <td className="py-5 px-6 text-sm font-extrabold text-slate-900">
                {row.enterprise}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanComparisonTable;