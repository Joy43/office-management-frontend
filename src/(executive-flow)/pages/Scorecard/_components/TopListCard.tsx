/* eslint-disable @typescript-eslint/no-explicit-any */

export const TopListCard = ({
  title,
  items,
}: {
  title: string;
  items: any[];
}) => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
    <div className="bg-white rounded-xl border border-slate-100 p-4 space-y-3 shadow-sm">
      {items.length > 0 ? (
        items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-[#8C23CC] flex items-center justify-center font-bold text-base">
                {item.branchName?.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-base text-slate-900 leading-tight">
                  {item.branchName}
                </p>
                <p className="text-[14px] text-slate-400">{item.subdomain}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {title === "Best Adherence" ? (
                <span className="px-2 py-1 bg-[#10B956]/10 text-[#10B956] text-sm font-bold rounded">
                  {item.scoreLabel}
                </span>
              ) : (
                <span className="text-base font-bold text-slate-700">
                  {item.scoreLabel}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-slate-400 py-4">No data available</p>
      )}
    </div>
  </div>
);