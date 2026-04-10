/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle, Loader2 } from "lucide-react";
import { useGetHuddleAlertsQuery } from "@/redux/features/manager/dashboardApi";

const DashboardAlerts = () => {
  const { data: apiResponse, isLoading } = useGetHuddleAlertsQuery({});
  const alerts = apiResponse?.data || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm h-full">
      <h3 className="text-xl font-extrabold text-slate-900 mb-6">
        Live Alerts
      </h3>
      {isLoading ? (
        <Loader2 className="animate-spin text-[#8C23CC]" />
      ) : (
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert: any, i: number) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 border border-slate-100 rounded-xl bg-slate-50/50"
              >
                <div className="text-[#8C23CC] mt-0.5">
                  <AlertCircle size={16} />
                </div>
                <div>
                  <p className="text-sm text-slate-700 font-semibold leading-tight">
                    {alert.message}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {new Date(alert.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic">No new alerts today</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAlerts;
