import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";

interface HuddleData {
  name: string;
  meetingId: string;
  duration: string;
  date: string;
  time: string;
  status: string;
  avatars: string[];
}

const TodayHuddles = () => {
  const data: HuddleData[] = Array(4).fill({
    name: "Morning Meeting",
    meetingId: "Meeting ID:123213",
    duration: "60min",
    date: "April 14, 2020",
    time: "5:20 PM",
    status: "Completed",
    avatars: [  "https://randomuser.me/api/portraits/men/32.jpg",   "https://randomuser.me/api/portraits/men/44.jpg",   "https://randomuser.me/api/portraits/men/68.jpg"]
  });

  const columns: Column<HuddleData>[] = [
    { header: "Name", render: (item) => (
      <div>
        <p className="font-bold text-slate-900">{item.name}</p>
        <p className="text-[10px] text-slate-400">{item.meetingId}</p>
      </div>
    )},
    { header: "Duration", key: "duration" },
    { header: "Date & Time", render: (item) => (
      <div className="text-xs">
        <p className="font-bold">{item.date}</p>
        <p className="text-slate-400">{item.time}</p>
      </div>
    )},
    { header: "Status", render: (item) => (
      <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-md">{item.status}</span>
    )},
    { header: "Participants", render: (item) => (
      <div className="flex -space-x-2">
        {item.avatars.map((url, i) => (
          <img key={i} src={url} className="w-8 h-8 rounded-full border-2 border-white" />
        ))}
        <div className="w-8 h-8 rounded-full bg-slate-800 text-white text-[10px] flex items-center justify-center border-2 border-white">4+</div>
      </div>
    )},
    { header: "Action", render: () => (
      <Button className="bg-[#8C23CC] hover:bg-[#761eb0] h-10 w-10 p-0"><Video size={16} /></Button>
    )}
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-extrabold text-slate-900">Today's Huddles</h3>
        <Button variant="link" className="text-[#8C23CC] font-bold">View All</Button>
      </div>
      <CommonTable columns={columns} data={data} />
    </div>
  );
};

export default TodayHuddles;