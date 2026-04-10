/* eslint-disable @typescript-eslint/no-explicit-any */
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {type Column } from "@/components/shared/common/CommonTable";
import { useGetMyHuddlesQuery } from "@/redux/features/staff/staffMySessionsApi";
import { useState } from "react";

const UpcomingSessions = () => {
  const [page, setPage] = useState(1);
  const { data: sessionRes } = useGetMyHuddlesQuery({
    page,
    limit: 5, // Dashboard e hoyto kom data dekhate chao
  });

  const huddles = sessionRes?.data || [];

  const columns: Column<any>[] = [
    {
      header: "Session Name",
      render: (item) => (
        <div className="font-medium text-slate-900">{item.topic}</div>
      ),
    },
    {
      header: "Branch",
      render: (item) => (
        <span className="text-slate-600">
          {item.branch?.branchName || "N/A"}
        </span>
      ),
    },
    {
      header: "Schedule",
      render: (item) => (
        <div className="text-xs">
          <p>{item.selectedDate}</p>
          <p className="text-slate-400">{item.startTime}</p>
        </div>
      ),
    },
    {
      header: "Role",
      render: (item) => (
        <span className="capitalize text-xs bg-slate-100 px-2 py-1 rounded">
          {item.creatorId === item.staffId ? "Organizer" : "Participant"}
        </span>
      ),
    },
    {
      header: "Members",
      render: (item) => (
        <div className="flex -space-x-2">
          {item.membersParticipating?.slice(0, 3).map((m: any, idx: number) => (
            <img
              key={idx}
              src={
                m.profilePicture || `https://ui-avatars.com/api/?name=${m.name}`
              }
              className="w-7 h-7 rounded-full border border-white"
              title={m.name}
            />
          ))}
          {item.membersParticipating?.length > 3 && (
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
              +{item.membersParticipating.length - 3}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Button
          disabled={!item.meetLink}
          onClick={() => window.open(item.meetLink, "_blank")}
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
        >
          <Video className="w-4 h-4" /> Join
        </Button>
      ),
    },
  ];

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900">
          Upcoming My Sessions
        </h3>
        <p className="text-sm text-slate-500">
          Total: {sessionRes?.meta?.total || 0}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <CommonTable columns={columns} data={huddles} />

        {/* Simple Pagination Demo */}
        {sessionRes?.meta?.totalPages > 1 && (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === sessionRes?.meta?.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;
