import { Users, CheckCircle, Target, TrendingUp, Loader2 } from "lucide-react";
import { LiaInfoCircleSolid } from "react-icons/lia";
import { useGetOrganizationOverviewQuery } from "@/redux/features/manager/dashboardApi";

const SummaryStats = () => {
  const { data: apiResponse, isLoading } = useGetOrganizationOverviewQuery({});

  if (isLoading)
    return (
      <div className="h-32 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#8C23CC]" />
      </div>
    );

  const org = apiResponse?.data?.OrganizationOverview;

  const stats = [
    {
      title: org?.teamAdherence?.label || "Team Adherence",
      value: `${org?.teamAdherence?.value || 0}${org?.teamAdherence?.unit || "%"}`,
      change: org?.teamAdherence?.trend === "up" ? "Trending Up" : "",
      icon: <Users />,
    },
    {
      title: org?.huddlesCompleted?.label || "Huddles Completed",
      value: org?.huddlesCompleted?.value || 0,
      icon: <CheckCircle />,
    },
    {
      title: org?.roleplaysScored?.label || "Roleplays Scored",
      value: org?.roleplaysScored?.value || 0,
      icon: <Target />,
    },
    {
      title: org?.csat?.label || "CSAT",
      value: `${org?.csat?.value || 0} ${org?.csat?.unit || "pts"}`,
      change: `${org?.csat?.trend === "up" ? "↑" : "↓"} ${org?.csat?.value} pts`,
      icon: <TrendingUp />,
      isCSAT: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-50 text-[#8C23CC] rounded-xl">
                {stat.icon}
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                {stat.title}
              </p>
            </div>
            {stat.change && (
              <span
                className={`text-xs font-bold ${stat.isCSAT && org?.csat?.trend === "down" ? "text-red-500" : "text-green-500"}`}
              >
                {stat.change}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-extrabold text-[#8C23CC]">
              {stat.value}
            </h2>
            {stat.isCSAT && (
              <span className="text-amber-500 text-xl">
                <LiaInfoCircleSolid />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStats;
