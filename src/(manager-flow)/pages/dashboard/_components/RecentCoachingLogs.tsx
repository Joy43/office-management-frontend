/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import { MdOutlineDone, MdOutlineWatchLater } from "react-icons/md";
// import { LiaInfoCircleSolid } from "react-icons/lia";
import { useGetRecentSessionsQuery } from "@/redux/features/manager/dashboardApi";
// import { Loader2 } from "lucide-react";

const RecentCoachingLogs = () => {
  const { data: apiResponse,  } = useGetRecentSessionsQuery({});
  const logs = apiResponse?.data || [];

  const columns: Column<any>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100 font-bold flex items-center justify-center text-[#8C23CC]">
            {item.title?.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-900">{item.title}</p>
            <p className="text-[10px] text-slate-400 uppercase">
              ID: {item.id.slice(0, 8)}
            </p>
          </div>
        </div>
      ),
    },
    { header: "Duration", key: "duration" },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-md text-[11px] font-bold border ${
            item.sessionstatus === "COMPLETED"
              ? "bg-green-50 text-green-500 border-green-100"
              : "bg-amber-50 text-amber-500 border-amber-100"
          }`}
        >
          {item.sessionstatus}
        </span>
      ),
    },
    {
      header: "Compliance",
      render: (item) => (
        <div className="flex items-center gap-2 font-medium">
          {item.sessioncompliance === "VERIFIED" ? (
            <>
              <MdOutlineDone className="text-green-500 text-lg" />{" "}
              <span className="text-xs text-slate-600">Verified</span>
            </>
          ) : (
            <>
              <MdOutlineWatchLater className="text-amber-500 text-lg" />{" "}
              <span className="text-xs text-slate-600">Pending</span>
            </>
          )}
        </div>
      ),
    },
    {
      header: "Scheduled At",
      render: (item) => (
        <div className="text-sm">
          <p className="font-bold text-slate-900">
            {new Date(item.scheduledAt).toLocaleDateString()}
          </p>
          <p className="text-[10px] text-slate-400">
            {new Date(item.scheduledAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
      <h3 className="text-xl font-extrabold text-slate-900 mb-6">
        Recent Coaching Logs
      </h3>
      <CommonTable columns={columns} data={logs}  />
    </div>
  );
};

export default RecentCoachingLogs;
