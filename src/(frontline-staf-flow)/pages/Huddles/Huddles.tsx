/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Download, Filter, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { useGetMyHuddlesQuery } from "@/redux/features/staff/staffMySessionsApi";
import { useDebounce } from "../Myessions/useDebounce";
// import { useDebounce } from "@/hooks/useDebounce";

const FrontLineHuddles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // RTK Query API Call
  const { data: huddleRes } = useGetMyHuddlesQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
  });

  const huddles = huddleRes?.data || [];
  const meta = huddleRes?.meta;

  const columns: Column<any>[] = [
    {
      header: "Name",
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900">{item.topic}</div>
          <div className="text-xs text-slate-500">
            ID: {item.id.slice(-6).toUpperCase()}
          </div>
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
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900">{item.selectedDate}</div>
          <div className="text-xs text-slate-500">{item.startTime}</div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
            item.HuddleStatus === "completed"
              ? "bg-green-100 text-green-700"
              : item.HuddleStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
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
              {visibleAvatars.map((member: any, index: number) => (
                <img
                  key={index}
                  src={
                    member.profilePicture ||
                    `https://ui-avatars.com/api/?name=${member.name}`
                  }
                  alt={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  title={member.name}
                />
              ))}
              {remainingCount > 0 && (
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">
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
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-10 h-10 p-0"
          onClick={() => item.meetLink && window.open(item.meetLink, "_blank")}
          disabled={!item.meetLink}
          title={item.meetLink ? "Join Meeting" : "Link not available"}
        >
          <Video className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-slate-50">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">My Huddles</h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by topic..."
              className="pl-10 border-slate-200"
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
              className="border-slate-200 flex-1 sm:flex-initial"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 flex-1 sm:flex-initial"
            >
              Export CSV
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <CommonTable columns={columns} data={huddles} />

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

export default FrontLineHuddles;
