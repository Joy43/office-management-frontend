/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState} from "react";
// import { Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useCreateSessionMutation,
  // useGetManagerEmployeesQuery,
} from "@/redux/features/manager/sessionApi";
import { toast } from "react-toastify";


export const CreateSessionForm = ({ isOpen, onClose, refetch }: any) => {
  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    duration: "",
    agenda: "",
  });
  const [createSession, { isLoading }] = useCreateSessionMutation();
  // const { data: employeeData } = useGetManagerEmployeesQuery({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Constructing the payload based on your Backend DTO
    const payload = {
      sessionTitle: formData.title,
      sessionType: "Physical",
      scheduledAt: new Date(formData.dateTime).toISOString(),
      duration: formData.duration,
      agenda: formData.agenda,
      meetingLink: "https://optional-link.com",
      sessionparticipantIds: [], // Logic for selecting IDs from employeeData
    };

    try {
      await createSession(payload).unwrap();
      toast.success("Session created successfully!");
      refetch();
      onClose();
    } catch (error) {
      toast.error("Failed to create session");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Schedule New Session</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <Input
            placeholder="Session Title"
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="datetime-local"
              required
              onChange={(e) =>
                setFormData({ ...formData, dateTime: e.target.value })
              }
            />
            <Input
              placeholder="Duration (e.g. 1 hour)"
              required
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>
          <textarea
            className="w-full p-3 border rounded-md h-32"
            placeholder="Agenda"
            onChange={(e) =>
              setFormData({ ...formData, agenda: e.target.value })
            }
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#8C23CC]">
              {isLoading ? "Creating..." : "Create Session"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
