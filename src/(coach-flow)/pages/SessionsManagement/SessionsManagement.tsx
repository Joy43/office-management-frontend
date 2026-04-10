/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Download, Plus,
  //  MoreVertical 
  } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import CreateSessionForm, {
  type SessionFormData,
} from "./_components/CreateSessionForm";

// API Hooks
import {
  useGetUpcomingSessionsQuery,
  useCreateTrainerSessionMutation,
  useGetAllUsersInBranchQuery,
} from "@/redux/features/trainer/trainerApi";
import { useUploadMultipleFilesMutation } from "@/redux/api/auth/authApi";
import { toast } from "react-toastify";

const CoachSessionsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- API Calls ---
  const {
    data: sessionsResponse,
    // isLoading: isSessionsLoading,
    // isFetching,
  } = useGetUpcomingSessionsQuery({
    page: currentPage,
    limit: pageSize,
    search: search,
  });

  const { data: usersData } = useGetAllUsersInBranchQuery(undefined);
  const [uploadMultiple, { isLoading: isUploading }] =
    useUploadMultipleFilesMutation();
  const [createSession, { isLoading: isCreating }] =
    useCreateTrainerSessionMutation();

  // Mapping columns to match your Backend Response Body
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
      render: (item) => <span className="text-slate-700">{item.duration}</span>,
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.status === "SCHEDULE"
              ? "bg-blue-100 text-blue-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Agenda",
      render: (item) => (
        <div className="text-slate-700 text-sm max-w-[200px] whitespace-normal">
          <p className="line-clamp-2 leading-5 wrap-break-word">
            {item.agenda}
          </p>
        </div>
      ),
    },
    // {
    //   header: "Action",
    //   render: () => (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
    //           <MoreVertical className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuItem className="cursor-pointer">
    //           View Details
    //         </DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   ),
    // },
  ];

  const handleFormSubmit = async (formData: SessionFormData, files: File[]) => {
    try {
      let materialsUrls: string[] = [];
      if (files && files.length > 0) {
        const uploadData = new FormData();
        files.forEach((file) => uploadData.append("files", file));
        toast.info("Uploading materials...");
        const uploadRes: any = await uploadMultiple(uploadData).unwrap();
        materialsUrls = uploadRes.files || [];
      }

      const sessionPayload = {
        sessionTitle: formData.title,
        sessionType: "ONLINE",
        sessionstatus: "SCHEDULE",
        sessioncompliance: "PENDING",
        scheduledAt: new Date(formData.dateTime).toISOString(),
        duration: String(formData.duration),
        agenda: formData.agenda,
        materials: materialsUrls,
        sessionparticipantIds: formData.participants || [],
      };

      await createSession(sessionPayload).unwrap();
      toast.success("Session scheduled successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Sessions Management
        </h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          disabled={isCreating || isUploading}
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white w-full sm:w-auto"
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

      {/* Main Content Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title"
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-200 w-full sm:w-auto"
          >
            Export CSV
            <Download className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Table Body */}
        <CommonTable
          columns={columns}
          data={sessionsResponse?.data || []}

        />

        {/* Pagination Section - Mapping to metadata object */}
        <CommonPagination
          totalItems={sessionsResponse?.metadata?.total || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Form Modal */}
      <CreateSessionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        users={usersData?.data || []}
      />
    </div>
  );
};

export default CoachSessionsManagement;
