/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface HabitEntry {
  id: string;
  name: string;
  description: string;
}

export interface ScoreFormData {
  empathy: number;
  communication: number;
  problemSolving: number;
  toneOfVoice: number;
  feedbackNotes: string;
  improvementTips: string;
  habits: HabitEntry[];
}

interface CreateScoreFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScoreFormData) => void;
  isSubmitting: boolean;
  teamMember: any;
}

const generateId = () => Math.random().toString(36).substring(7);

const CreateScoreForm = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  teamMember,
}: CreateScoreFormProps) => {
  const [formData, setFormData] = useState<ScoreFormData>({
    empathy: 0,
    communication: 0,
    problemSolving: 0,
    toneOfVoice: 0,
    feedbackNotes: "",
    improvementTips: "",
    habits: [],
  });

  const updateHabit = (id: string, field: keyof HabitEntry, value: string) => {
    setFormData((prev) => ({
      ...prev,
      habits: prev.habits.map((h) =>
        h.id === id ? { ...h, [field]: value } : h,
      ),
    }));
  };

  const isAtLeastOneScoreSelected =
    formData.empathy > 0 ||
    formData.communication > 0 ||
    formData.problemSolving > 0 ||
    formData.toneOfVoice > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAtLeastOneScoreSelected) return;
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden flex flex-col bg-white p-0 gap-0 shadow-2xl border-none">
        {/* Sticky Header - Swagger Style */}
        <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-white z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded leading-tight">
              POST
            </span>
            <code className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              /api/v1/habit-assignment/create-score
            </code>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Create Score & Habits for{" "}
            {teamMember?.user?.name || teamMember?.name}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Assessment summary and future habit planning for the team member.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          {/* User Profile Card */}
          <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-slate-200">
                {teamMember?.user?.profilePicture ? (
                  <img
                    src={teamMember.user.profilePicture}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-2 text-slate-400" />
                )}
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-none mb-1">
                  {teamMember?.user?.name || teamMember?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {teamMember?.user?.email || "No email available"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Participation
              </p>
              <p className="text-xl font-black text-emerald-600">
                {teamMember?.analytics?.participationRate || 0}%
              </p>
            </div>
          </div>

          {/* Habit Scores Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Core Habit Scores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "empathy",
                "communication",
                "problemSolving",
                "toneOfVoice",
              ].map((key) => (
                <div
                  key={key}
                  className="p-4 border rounded-xl bg-white shadow-sm border-slate-200"
                >
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-3">
                    {key.replace(/([A-Z])/g, " $1")} (1-5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => {
                      const isSelected = (formData as any)[key] === num;
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, [key]: num })
                          }
                          className={`flex-1 py-2 rounded-lg border text-sm font-bold transition-all ${
                            isSelected
                              ? "bg-[#8C23CC] text-white border-[#8C23CC] shadow-md transform scale-105"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:border-[#8C23CC] hover:bg-white"
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feedback Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
              Qualitative Assessment
            </h3>
            <div className="space-y-5">
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase">
                  Feedback Notes
                </label>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm min-h-[90px] focus:ring-2 focus:ring-[#8C23CC]/20 transition-all outline-none"
                  placeholder="Summarize the performance..."
                  value={formData.feedbackNotes}
                  onChange={(e) =>
                    setFormData({ ...formData, feedbackNotes: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label className="text-[11px] font-bold text-slate-600 uppercase">
                  Assessment Text (Tips)
                </label>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm min-h-[90px] focus:ring-2 focus:ring-[#8C23CC]/20 transition-all outline-none"
                  placeholder="What can be improved?"
                  value={formData.improvementTips}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      improvementTips: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Additional Habits */}
          <section className="space-y-4 pb-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Future Habit Roadmap
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs font-bold border-[#8C23CC] text-[#8C23CC] hover:bg-[#8C23CC] hover:text-white transition-all"
                onClick={() =>
                  setFormData({
                    ...formData,
                    habits: [
                      ...formData.habits,
                      { id: generateId(), name: "", description: "" },
                    ],
                  })
                }
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add New Habit
              </Button>
            </div>

            <div className="space-y-3">
              {formData.habits.length === 0 && (
                <p className="text-center text-slate-400 text-xs py-4 border-2 border-dashed rounded-xl">
                  No habits added yet.
                </p>
              )}
              {formData.habits.map((habit) => (
                <div
                  key={habit.id}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 relative group"
                >
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        habits: formData.habits.filter(
                          (h) => h.id !== habit.id,
                        ),
                      })
                    }
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="grid gap-3 pr-6">
                    <Input
                      placeholder="Habit Title"
                      className="bg-white border-slate-200 h-10"
                      value={habit.name}
                      onChange={(e) =>
                        updateHabit(habit.id, "name", e.target.value)
                      }
                    />
                    <textarea
                      placeholder="Why this habit? How to track?"
                      className="w-full p-3 border border-slate-200 rounded-lg text-xs bg-white min-h-[60px] outline-none"
                      value={habit.description}
                      onChange={(e) =>
                        updateHabit(habit.id, "description", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Footer */}
        <DialogFooter className="p-4 bg-slate-50 border-t sticky bottom-0 z-20 flex sm:justify-between items-center px-6">
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            className="text-slate-500"
          >
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !isAtLeastOneScoreSelected}
            className={`px-8 font-bold text-white transition-all shadow-lg ${
              !isAtLeastOneScoreSelected || isSubmitting
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-[#8C23CC] hover:bg-[#761eb0] hover:shadow-[#8C23CC]/40"
            }`}
          >
            {isSubmitting ? "Processing..." : "Execute Assessment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScoreForm;
