/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Download, Filter, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { useGetAllHuddlesQuery } from "@/redux/features/manager/huddleApi"; // Path update koro dorkor hole
import { format } from "date-fns";

const CoachHuddles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  // --- API Call (ManagerHuddles er motoi mapping) ---
  const { data: huddleResponse } = useGetAllHuddlesQuery({
    search: search || undefined,
    page: currentPage,
    limit: pageSize,
  });

  const huddles = huddleResponse?.data?.data || [];
  const meta = huddleResponse?.data?.pagination;

  const columns: Column<any>[] = [
    {
      header: "Name",
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900">{item.topic}</div>
          <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
            ID: {item.id.slice(-6)}
          </div>
        </div>
      ),
    },
    {
      header: "Duration",
      render: (item) => (
        <span className="text-slate-700 font-medium">{item.duration} min</span>
      ),
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900 font-medium">
            {item.selectedDate
              ? format(new Date(item.selectedDate), "MMM dd, yyyy")
              : "N/A"}
          </div>
          <div className="text-xs text-slate-500">{item.startTime}</div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
            item.HuddleStatus === "completed"
              ? "bg-green-100 text-green-700"
              : item.HuddleStatus === "scheduled"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {item.HuddleStatus}
        </span>
      ),
    },
    {
      header: "Participants",
      render: (item) => {
        const participants = item.membersParticipating || [];
        const visibleAvatars = participants.slice(0, 4);
        const remainingCount = participants.length - 4;

        return (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {visibleAvatars.map((user: any, index: number) => (
                <img
                  key={index}
                  src={
                    user.profilePicture ||
                    `https://ui-avatars.com/api/?name=${user.name}&background=random`
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
              {remainingCount > 0 && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-white flex items-center justify-center -ml-2">
                  <span className="text-[10px] text-white font-bold">
                    {remainingCount}+
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      header: "Action",
      render: (item) => (
        <Button
          onClick={() => item.meetLink && window.open(item.meetLink, "_blank")}
          disabled={!item.meetLink}
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-9 h-9 p-0 rounded-lg transition-transform active:scale-90"
        >
          <Video className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
        My Huddles
      </h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        {/* Search and Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search huddles..."
              className="pl-10 border-slate-200 w-full rounded-xl"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-slate-200 flex-1 sm:flex-initial rounded-xl"
            >
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 flex-1 sm:flex-initial rounded-xl"
            >
              Export CSV
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Table */}
        <CommonTable columns={columns} data={huddles}  />

        {/* Pagination logic mapped to API metadata */}
        {meta && (
          <div className="mt-6">
            <CommonPagination
              totalItems={meta.total}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoachHuddles;
