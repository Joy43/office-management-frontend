/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, Clock, User, Users, FileText,
  //  X 
  } from "lucide-react";
import { Button } from "@/components/ui/button";

const ViewSessionDialog = ({
  isOpen,
  onClose,
  session,
}: {
  isOpen: boolean;
  onClose: () => void;
  session: any;
}) => {
  if (!session) return null;

  const date = new Date(session.scheduledAt).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = new Date(session.scheduledAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 border-none rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Header Section */}
        <div className="bg-[#8C23CC] p-10 text-white relative">
          {/* <button
            onClick={onClose}
            className="absolute right-6 top-6 text-white/60 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <X size={24} />
          </button> */}
          <div className="flex flex-col gap-2">
            <span className="bg-white/20 text-[10px] uppercase font-bold tracking-[2px] w-fit px-3 py-1 rounded-md">
              {session.sessionType || "General Session"}
            </span>
            <h2 className="text-3xl font-extrabold leading-tight">
              {session.title}
            </h2>
          </div>
        </div>

        <div className="p-10 space-y-10">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            <DetailItem icon={<Calendar />} label="Date" value={date} />
            <DetailItem
              icon={<Clock />}
              label="Time & Duration"
              value={`${time} (${session.duration})`}
            />
            <DetailItem
              icon={<User />}
              label="Organizer"
              value={session.organizer?.name || "Branch Manager"}
            />
            <DetailItem
              icon={<Users />}
              label="Participants"
              value={`${session.sessionParticipants?.length || 0} Members`}
            />
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileText size={14} /> Agenda Details
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed font-medium">
              {session.agenda || "No agenda provided for this session."}
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={onClose}
              className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-10 font-bold rounded-xl h-12 cursor-pointer transition-all active:scale-95"
            >
              Close Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-4">
    <div className="p-3 bg-purple-50 rounded-xl text-[#8C23CC]">{icon}</div>
    <div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-extrabold text-slate-900">{value}</p>
    </div>
  </div>
);

export default ViewSessionDialog;
