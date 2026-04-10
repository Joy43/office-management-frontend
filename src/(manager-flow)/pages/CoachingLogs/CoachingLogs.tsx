/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { StatCard } from "./_components/StatCard";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { SiAdguard } from "react-icons/si";
import { RiTimerLine } from "react-icons/ri";
import { MdOutlineDone, MdOutlineWatchLater } from "react-icons/md";
// import { LiaInfoCircleSolid } from "react-icons/lia";
import { useGetAllSessionsMutation } from "@/redux/features/manager/sessionApi";
import { useGetCoachingOverviewQuery } from "@/redux/features/manager/dashboardApi";

const ManagerCoachingLogs = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // RTK Query Hooks
  const { data: statsResponse } = useGetCoachingOverviewQuery({});
  const [
    fetchSessions,
    { data: sessionsResponse },
  ] = useGetAllSessionsMutation();

  useEffect(() => {
    // Fetches all sessions with pagination and search, no status filter
    fetchSessions({
      page: currentPage,
      limit: pageSize,
      search: search,
    });
  }, [currentPage, pageSize, search, fetchSessions]);

  const stats = statsResponse?.data;
  const sessions = sessionsResponse?.data || [];
  const totalItems = sessionsResponse?.metadata?.total || 0;

  const columns: Column<any>[] = [
    {
      header: "Coach Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.title}`}
              alt="avatar"
            />
          </div>
          <div>
            <div className="font-bold text-slate-900">{item.title}</div>
            <div className="text-xs text-slate-400 uppercase tracking-tighter text-[9px]">
              ID: {item.id.slice(0, 8)}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Session Type",
      render: (item) => <span>{item.sessionType || "General Coaching"}</span>,
    },
    {
      header: "Duration",
      render: (item) => (
        <span className="font-bold text-slate-900">{item.duration}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-4 py-1 rounded-md text-[10px] font-bold border uppercase ${
            item.sessionstatus === "COMPLETED"
              ? "bg-green-50 text-green-500 border-green-100"
              : item.sessionstatus === "PENDING"
                ? "bg-amber-50 text-amber-500 border-amber-100"
                : "bg-slate-50 text-slate-400 border-slate-100"
          }`}
        >
          {item.sessionstatus}
        </span>
      ),
    },
    {
      header: "Compliance",
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.sessioncompliance === "VERIFIED" ? (
            <div className="flex items-center gap-1.5 text-green-500 font-medium">
              <MdOutlineDone className="text-[16px]" />
              <span className="text-xs text-slate-600">Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-amber-500 font-medium">
              <MdOutlineWatchLater className="text-[16px]" />
              <span className="text-xs text-slate-600">Pending</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div className="text-sm">
          <div className="font-bold text-slate-900">
            {new Date(item.scheduledAt).toLocaleDateString()}
          </div>
          <div className="text-[10px] text-slate-400">
            {new Date(item.scheduledAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-slate-50/30">
      <h1 className="text-3xl font-extrabold text-slate-900">Coaching Logs</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Sessions"
          value={stats?.totalSessions || 0}
          change={`${stats?.sessionsThisMonth || 0} this month`}
          icon={<IoCalendarClearOutline />}
        />
        <StatCard
          title="Active Clients"
          value={stats?.activeClients || 0}
          icon={<FiUsers />}
        />
        <StatCard
          title="Compliance Rate"
          value={`${stats?.complianceRate || 0}%`}
          icon={<SiAdguard />}
        />
        <StatCard
          title="Avg. Session Time"
          value={`${stats?.avgSessionTime || 0}min`}
          subText="(Per Session)"
          icon={<RiTimerLine />}
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#8C23CC]"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="px-6 flex gap-2 border-slate-200 cursor-pointer hover:bg-slate-50"
            >
              <Filter size={16} /> Filter
            </Button>
            <Button
              variant="outline"
              className="px-6 flex gap-2 border-slate-200 cursor-pointer hover:bg-slate-50"
            >
              <Download size={16} /> Export CSV
            </Button>
          </div>
        </div>

        <CommonTable
          columns={columns}
          data={sessions}
          // isLoading={sessionsLoading}
        />

        <CommonPagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};

export default ManagerCoachingLogs;
