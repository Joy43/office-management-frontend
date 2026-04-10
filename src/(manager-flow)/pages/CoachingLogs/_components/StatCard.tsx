/* eslint-disable @typescript-eslint/no-explicit-any */
// Internal Helper Component for Stat Cards
export const StatCard = ({ title, value, change, subText, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-50 shadow-sm relative overflow-hidden group">
    <div className="flex justify-between items-center mb-4">
     <div className="flex gap-3 items-center">
         <div className="p-2 bg-[#F4E9FA] rounded-xl group-hover:bg-purple-50 transition-colors">
        <span className="text-xl">{icon}</span>
         
      </div>
       <p className="text-lg font-bold text-slate-900 mb-1">{title}</p>
     </div>
      {change && <span className="text-[10px] font-bold text-green-500">{change}</span>}
    </div>
  
    <div className="flex items-baseline gap-2">
      <h2 className="text-3xl font-extrabold text-[#8C23CC]">{value}</h2>
      {subText && <span className="text-[10px] text-slate-400 font-bold">{subText}</span>}
    </div>
  </div>
);