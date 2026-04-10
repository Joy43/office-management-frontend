/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Calendar,
  Settings,
  MessageSquare,
  Headphones,
  Plus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MetricCard from "../../../../src/(frontline-staf-flow)/pages/Dashboard/_components/MetricCard";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import CreateSessionForm, {
  type SessionFormData,
  type UploadedFile,
} from "../SessionsManagement/_components/CreateSessionForm";

import {
  useGetTrainerDashboardOverviewQuery,
  useGetUpcomingSessionsQuery,
  useCreateTrainerSessionMutation,
  useGetAllUsersInBranchQuery,
} from "@/redux/features/trainer/trainerApi";
import { toast } from "react-toastify";
import { useUploadMultipleFilesMutation } from "@/redux/api/auth/authApi";
// import { UserDialog } from "@/(client-admin)/pages/UsersManagement/_components/UserDialog";

const CoachDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- API Hooks ---
  const { data: overviewData, isLoading: isMetricsLoading } =
    useGetTrainerDashboardOverviewQuery(undefined);

  const {
    data: sessionsResponse,
  } = useGetUpcomingSessionsQuery({
    page: currentPage,
    limit: pageSize,
    search: search,
  });

  // Fetch Users for Participant Selection
  const { data: usersData } = useGetAllUsersInBranchQuery(undefined);
console.log(usersData)
  const [uploadMultiple, { isLoading: isUploading }] =
    useUploadMultipleFilesMutation();
  const [createSession, { isLoading: isCreating }] =
    useCreateTrainerSessionMutation();

  // Metrics Data
  const metricsData = useMemo(() => {
    const cards = overviewData?.data?.cards;
    return [
      {
        id: "s1",
        title: "Sessions This Month",
        value: cards?.sessionsThisMonth?.value ?? 0,
        icon: Calendar,
      },
      {
        id: "s2",
        title: "Habit Completion Rate",
        value: `${cards?.habitCompletionRate?.value ?? 0}%`,
        icon: Settings,
      },
      {
        id: "s3",
        title: "Roleplays Scored",
        value: cards?.roleplaysScored?.value ?? 0,
        icon: MessageSquare,
      },
      {
        id: "s4",
        title: "Avg Score",
        value: `${cards?.avgScore?.value ?? 0}/5`,
        icon: Headphones,
      },
    ];
  }, [overviewData]);

  const columns: Column<any>[] = [
    {
      header: "Title",
      render: (item) => (
        <span className="font-semibold text-slate-900">{item.title}</span>
      ),
    },
    {
      header: "Date & Time",
      render: (item) => (
        <div>
          <div className="text-slate-900">
            {new Date(item.scheduledAt).toLocaleDateString()}
          </div>
          <div className="text-xs text-slate-500">
            {new Date(item.scheduledAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      header: "Speaker",
      render: (item) => (
        <span className="text-slate-700">{item.speaker?.name || "N/A"}</span>
      ),
    },
    {
      header: "Duration",
      render: (item) => (
        <span className="text-slate-700">{item.duration} min</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "SCHEDULE" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  // --- Handle Form Submission ---
  const handleFormSubmit = async (
    formData: SessionFormData,
    files: UploadedFile[],
  ) => {
    try {
      let materialsUrls: string[] = [];

      // 1. File Upload Logic
      if (files && files.length > 0) {
        const uploadData = new FormData();
        files.forEach((f: any) => {
          const binaryFile = f.originFileObj || f.file || f;
          if (binaryFile instanceof File)
            uploadData.append("files", binaryFile);
        });

        if (uploadData.has("files")) {
          toast.info("Uploading materials...");
          const uploadRes: any = await uploadMultiple(uploadData).unwrap();
          materialsUrls = uploadRes.files || [];
        }
      }

      // 2. Prepare Payload
      const sessionPayload = {
        sessionTitle: formData.title,
        sessionType: "ONLINE",
        sessionstatus: "SCHEDULE",
        sessioncompliance: "PENDING",
        scheduledAt: new Date(formData.dateTime).toISOString(),
        duration: String(formData.duration), // String conversion as requested
        agenda: formData.agenda,
        materials: materialsUrls,
        sessionparticipantIds: formData.participants || [], // Dynamic selected IDs
      };

      await createSession(sessionPayload).unwrap();
      toast.success("Session scheduled successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("❌ API Error:", error);
      const errorMsg = error?.data?.message;
      if (Array.isArray(errorMsg))
        errorMsg.forEach((m: string) => toast.error(m));
      else toast.error(errorMsg || "Something went wrong");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={isUploading || isCreating}
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white"
        >
          {isCreating || isUploading ? (
            "Processing..."
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" /> Schedule Sessions
            </>
          )}
        </Button>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isMetricsLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-slate-200 animate-pulse rounded-xl"
                />
              ))
          : metricsData.map((m) => <MetricCard key={m.id} {...m} />)}
      </div>

      {/* Table Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Upcoming Sessions</h2>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by title"
                className="pl-10"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <CommonTable
            columns={columns}
            data={sessionsResponse?.data || []}
            // isLoading={isSessionsLoading || isFetching}
          />

          <div className="mt-4">
            <CommonPagination
              totalItems={sessionsResponse?.meta?.total || 0}
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
      </div>

      <CreateSessionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        users={usersData?.data || []} // Passing users for selection
      />
    </div>
  );
};

export default CoachDashboard;
