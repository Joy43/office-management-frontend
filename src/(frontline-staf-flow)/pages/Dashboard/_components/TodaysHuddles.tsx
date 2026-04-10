/* eslint-disable @typescript-eslint/no-explicit-any */
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {type Column } from "@/components/shared/common/CommonTable";
import { useGetTodayHuddlesQuery } from "@/redux/features/staff/staffDashboardApi";

const TodaysHuddles = () => {
  const { data: huddleRes} = useGetTodayHuddlesQuery(undefined);
  const huddles = huddleRes?.data?.huddles || [];

  const columns: Column<any>[] = [
    {
      header: "Name",
      render: (item) => (
        <div>
          <div className="font-semibold text-slate-900">{item.name}</div>
          <div className="text-xs text-slate-500">{item.meetingId}</div>
        </div>
      ),
    },
    {
      header: "Duration",
      render: (item) => <span className="text-slate-700">{item.duration}</span>,
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900">{item.dateTime.displayDate}</div>
          <div className="text-xs text-slate-500">
            {item.dateTime.displayTime}
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Participants",
      render: (item) => (
        <div className="flex -space-x-2">
          {item.participants.list.slice(0, 4).map((p: any, idx: number) => (
            <img
              key={idx}
              src={
                p.profilePicture || `https://ui-avatars.com/api/?name=${p.name}`
              }
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
          {item.participants.total > 4 && (
            <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-white flex items-center justify-center -ml-2 text-[10px] text-white">
              +{item.participants.total - 4}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Button
          onClick={() => window.open(item.meetLink, "_blank")}
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-10 h-10 p-0"
        >
          <Video className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  return (
    <div className="mt-10 space-y-6">
      <h3 className="text-xl font-bold text-slate-900">Today's Huddles</h3>
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <CommonTable columns={columns} data={huddles} />
      </div>
    </div>
  );
};

export default TodaysHuddles;