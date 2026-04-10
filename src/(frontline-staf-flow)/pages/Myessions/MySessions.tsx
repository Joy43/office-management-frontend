/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { useGetMyHuddlesQuery } from "@/redux/features/staff/staffMySessionsApi";
import { useDebounce } from "./useDebounce";
// import { useDebounce } from "@/hooks/useDebounce"; // Search performance er jonno debounce use kora best

const FrontLineMySessions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  // Search query debounce kora hoyeche jate proti keystroke e API hit na hoy
  const debouncedSearch = useDebounce(search, 500);

  // API Call
  const {
    data: huddleRes,
  } = useGetMyHuddlesQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
  });

  const sessions = huddleRes?.data || [];
  const meta = huddleRes?.meta;

  const columns: Column<any>[] = [
    {
      header: "Title",
      render: (item) => (
        <span className="font-semibold text-slate-900">{item.topic}</span>
      ),
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900">{item.selectedDate}</div>
          <div className="text-xs text-slate-500">{item.startTime}</div>
        </div>
      ),
    },
    {
      header: "Organizer",
      render: (item) => (
        <div className="flex items-center gap-2">
          <img
            src={
              item.creator?.profilePicture ||
              `https://ui-avatars.com/api/?name=${item.creator?.name}`
            }
            className="w-6 h-6 rounded-full"
          />
          <span className="text-slate-700">{item.creator?.name}</span>
        </div>
      ),
    },
    {
      header: "Duration",
      render: (item) => (
        <span className="text-slate-700">{item.duration} min</span>
      ),
    },
    {
      header: "Branch",
      render: (item) => (
        <span className="text-slate-700">
          {item.branch?.branchName || "N/A"}
        </span>
      ),
    },
    {
      header: "Attendance",
      render: (item) => (
        <span className="text-slate-700">
          {item.membersParticipating?.length || 0} Members
        </span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            item.HuddleStatus === "completed"
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {item.HuddleStatus}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Button
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white"
          onClick={() => item.meetLink && window.open(item.meetLink, "_blank")}
          disabled={!item.meetLink}
        >
          {item.HuddleStatus === "completed" ? "View Record" : "Join Now"}
        </Button>
      ),
    },
  ];

  // CSV Export Logic (Basic Example)
  const handleExport = () => {
    console.log("Exporting data...", sessions);
    // Tumi eikhane kono json-to-csv library use korte paro
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
        My Sessions
      </h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by topic"
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Search korle page reset kora uchit
              }}
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-200 w-full sm:w-auto"
            onClick={handleExport}
          >
            Export CSV
            <Download className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <CommonTable
          columns={columns}
          data={sessions}
        />

        <CommonPagination
          totalItems={meta?.total || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default FrontLineMySessions;
