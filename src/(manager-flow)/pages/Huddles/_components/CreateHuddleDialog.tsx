/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCreateHuddleMutation } from "@/redux/features/manager/huddleApi";
// import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateHuddleDialog = ({ open, onClose }: Props) => {
  const [createHuddle, { isLoading }] = useCreateHuddleMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: "",
      duration: "30",
      startTime: "10:00",
      selectedDate: new Date().toISOString().split("T")[0],
      participantIds: [] as string[],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // ব্যাকএন্ডে পাঠানোর জন্য ফরম্যাট তৈরি
      const payload = {
        ...data,
        participantIds:
          data.participantIds.length > 0 ? data.participantIds : [],
      };

      await createHuddle(payload).unwrap();
      toast.success("Huddle created successfully");
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create huddle");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Create Huddle</DialogTitle>
          <DialogDescription>
            Schedule a new meeting with your team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Topic *
            </Label>
            <Input
              {...register("topic", { required: "Topic is required" })}
              placeholder="e.g. Morning Standup"
              className="rounded-lg border-slate-200"
            />
            {errors.topic && (
              <p className="text-[10px] text-red-500">{errors.topic.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Date *
              </Label>
              <Input
                type="date"
                {...register("selectedDate", { required: true })}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase text-slate-500">
                Time *
              </Label>
              <Input
                type="time"
                {...register("startTime", { required: true })}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Duration *
            </Label>
            <Controller
              name="duration"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                    <SelectItem value="120">120 min</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold uppercase text-slate-500">
              Participants (Optional)
            </Label>
            {/* এখানে আপনি একটি Multi-Select Component ব্যবহার করতে পারেন */}
            <p className="text-[10px] text-slate-400">
              Participants will be auto-joined after creation.
            </p>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="font-bold text-slate-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#8C23CC] hover:bg-[#761eb0] text-white font-bold px-8 shadow-md"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Create Huddle"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHuddleDialog;
