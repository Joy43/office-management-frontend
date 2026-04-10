/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus, Search, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import { useState } from "react";
import CreateHuddleDialog from "./_components/CreateHuddleDialog";
import { useGetAllHuddlesQuery } from "@/redux/features/manager/huddleApi";
import { format } from "date-fns";
import CommonPagination from "@/components/shared/common/CommonPagination";

const ManagerHuddles = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateHuddleOpen, setIsCreateHuddleOpen] = useState(false);

  // API Call
  const { data: huddleResponse, } = useGetAllHuddlesQuery({
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
            {format(new Date(item.selectedDate), "MMM dd, yyyy")}
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
                    `https://ui-avatars.com/api/?name=${user.name}`
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
          onClick={() => window.open(item.meetLink, "_blank")}
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
    <div className="mt-10 space-y-6 mx-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Huddles
        </h1>
        <Button
          onClick={() => setIsCreateHuddleOpen(true)}
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-6 font-bold shadow-lg shadow-purple-100"
        >
          <Plus size={18} className="mr-1" /> Add Huddle
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search huddles..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#8C23CC]/20 focus:border-[#8C23CC] transition-all"
            />
          </div>
        </div>

        <CommonTable columns={columns} data={huddles}/>

        {meta && (
          <div className="mt-6">
            <CommonPagination
              totalItems={meta.total}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <CreateHuddleDialog
        open={isCreateHuddleOpen}
        onClose={() => setIsCreateHuddleOpen(false)}
      />
    </div>
  );
};

export default ManagerHuddles;
