/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Download, Filter, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import CreateScoreForm, {
  type ScoreFormData,
} from "./_components/CreateScoreForm";
import {
  useCreateScoreAndHabitsMutation,
  useGetAssignedTeamMembersQuery,
} from "@/redux/features/trainer/trainerApi";
import { toast } from "react-toastify";
// import { toast } from "sonner";

// --- API Hooks (Replace with your actual API paths) ---
// import {
//   useGetAssignedTeamMembersQuery,
//   useCreateScoreMutation,
// } from "@/redux/features/coach/coachApi";

const CoachAssignedTeamMembers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);

  // --- API Fetching ---
  const {
    data: teamResponse,
    // isLoading,
    // isFetching,
  } = useGetAssignedTeamMembersQuery({
    page: currentPage,
    limit: pageSize,
    // searchTerm: search, // query parameter for search
  });

  // Debug logging
  if (teamResponse?.data && teamResponse.data.length > 0) {
    console.group("📊 Team Members Response Structure");
    console.log("First team member:", teamResponse.data[0]);
    console.log("First team member keys:", Object.keys(teamResponse.data[0]));
    console.groupEnd();
  }
  const [createScore, { isLoading: isSubmitting }] =
    useCreateScoreAndHabitsMutation();

  const columns: Column<any>[] = [
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={
              item.user?.profilePicture ||
              "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt={item.user?.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
          />
          <div>
            <span className="font-semibold text-slate-900 block">
              {item.user?.name}
            </span>
            <span className="text-xs text-slate-500">{item.user?.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${item.user?.status === "ACTIVE" ? "bg-green-500" : "bg-slate-300"}`}
          ></div>
          <span className="text-sm text-slate-700">
            {item.user?.status || "N/A"}
          </span>
        </div>
      ),
    },
    {
      header: "Role",
      render: (item) => (
        <span className="text-slate-700 font-semibold">
          {item.user?.role || "N/A"}
        </span>
      ),
    },
    {
      header: "Participation Rate",
      render: (item) => (
        <span className="text-slate-700 font-semibold">
          {item.analytics?.participationRate || 0}%
        </span>
      ),
    },
    {
      header: "Total Events",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Flame
            className={`w-4 h-4 ${item.analytics?.totalEvents > 0 ? "text-orange-500" : "text-slate-300"}`}
          />
          <span className="text-slate-700">
            {item.analytics?.totalEvents || 0}
          </span>
        </div>
      ),
    },
    {
      header: "Completed",
      render: (item) => (
        <span className="text-slate-700 font-semibold">
          {item.analytics?.completedEvents || 0}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Button
          size="sm"
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white"
          onClick={() => {
            setSelectedTeamMember(item);
            setIsModalOpen(true);
          }}
        >
          Create Score
        </Button>
      ),
    },
  ];

  const handleScoreSubmit = async (formData: ScoreFormData) => {
    // 1. Initial Validation
    if (!selectedTeamMember) {
      console.error("❌ ERROR: No team member selected.");
      toast.error("Please select a team member first.");
      return;
    }

    // 2. Validate that at least one score is provided
    const scores = [
      formData.empathy,
      formData.communication,
      formData.problemSolving,
      formData.toneOfVoice,
    ];

    if (scores.every((score) => score === 0)) {
      console.error("❌ ERROR: At least one habit score is required.");
      toast.error("Please provide at least one habit score.");
      return;
    }

    // 2.5 Debug: Log the selected team member structure
    console.group("🔍 DEBUG: Selected Team Member Structure");
    console.log("Full Object:", selectedTeamMember);
    console.log("Available Keys:", Object.keys(selectedTeamMember));
    console.log("User Object:", selectedTeamMember.user);
    console.log("User ID from nested:", selectedTeamMember.user?.id);
    console.groupEnd();

    // 3. Extract userId from nested user object
    const userId =
      selectedTeamMember.user?.id
    if (!userId) {
      console.error("❌ ERROR: Cannot find user ID in selected team member");
      console.error("Checked paths: user.id, id, _id, userId");
      toast.error("Error: User ID not found. Contact support.");
      return;
    }

    const payload = {
      userId: userId,

      habitScores: [
        {
          habitName: "Empathy",
          score: Number(formData.empathy),
        },
        {
          habitName: "Communication",
          score: Number(formData.communication),
        },
        {
          habitName: "Problem Solving",
          score: Number(formData.problemSolving),
        },
        {
          habitName: "Tone of Voice",
          score: Number(formData.toneOfVoice),
        },
      ],

      feedbackNotes: formData.feedbackNotes.trim() || "No feedback provided",

      assessmentText:
        formData.improvementTips.trim() || "No assessment provided",

      additionalHabits: formData.habits
        .filter((h) => h.name && h.name.trim() !== "")
        .map((h) => ({
          title: h.name.trim(),
          description: h.description?.trim() || "No description",
          points: "10",
        })),
    };

    // 4. Detailed Console Logging (Before sending)
    console.group("🚀 API REQUEST: Create Score");
    console.log("Endpoint: POST /habit-assignment/create-score");
    console.log("User ID Value:", userId);
    console.log("Habit Scores Count:", payload.habitScores.length);
    console.log("Additional Habits Count:", payload.additionalHabits.length);
    console.log("=== FULL PAYLOAD ===");
    console.table(payload);
    console.log("Raw JSON:", JSON.stringify(payload, null, 2));
    console.groupEnd();

    try {
      // 5. API Call with proper unwrap
      const response = await createScore(payload).unwrap();

      // 6. Success Logging
      console.group("✅ API SUCCESS");
      console.table({
        message: "Score created successfully",
        userId: response?.data?.user?.id,
        completionPercentage: response?.data?.completionPercentage,
        habitCount: response?.data?.habitScores?.length,
        timestamp: new Date().toISOString(),
      });
      console.log("Full Response:", response);
      console.groupEnd();

      toast.success("Score and habits assigned successfully!");

      // Reset & Close
      setIsModalOpen(false);
      setSelectedTeamMember(null);
    } catch (error: any) {
      // 7. Comprehensive Error Logging
      console.group("❌ API FAILED");
      console.error("Error Status:", error?.status);
      console.error("Error Code:", error?.code);
      console.error(
        "Error Message:",
        error?.data?.message || error?.message || "Unknown Error",
      );
      console.error("Full Error Object:", error);

      if (error?.data?.errors) {
        console.log("Validation Errors:", error.data.errors);
        console.table(error.data.errors);
      }

      if (error?.data?.data) {
        console.log("Error Data:", error.data.data);
      }
      console.groupEnd();

      // Determine appropriate error message
      const errorMsg =
        error?.data?.message ||
        error?.message ||
        "Failed to create score. Check console for details.";

      toast.error(errorMsg);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
        Assigned Team Members
      </h1>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name..."
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-slate-200">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="border-slate-200">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <CommonTable
          columns={columns}
          data={teamResponse?.data || []}
          // isLoading={isLoading || isFetching}
        />

        <CommonPagination
          totalItems={teamResponse?.metadata?.total || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {selectedTeamMember && (
        <CreateScoreForm
          isOpen={isModalOpen}
          isSubmitting={isSubmitting}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTeamMember(null);
          }}
          onSubmit={handleScoreSubmit}
          teamMember={selectedTeamMember}
        />
      )}
    </div>
  );
};

export default CoachAssignedTeamMembers;
