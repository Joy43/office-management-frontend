/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Search, Plus, MoreVertical, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateSessionForm } from "./_components/CreateSessionForm";
import ViewSessionDialog from "./_components/ViewSessionDialog";
import {
  useDeleteSessionMutation,
  useGetAllSessionsMutation,
} from "@/redux/features/manager/sessionApi";
import { toast } from "react-toastify";

const ManagerSessionsManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  // RTK Query Hooks
  const [fetchSessions, { data: apiResponse }] =
    useGetAllSessionsMutation();
  const [deleteSession] = useDeleteSessionMutation();

  useEffect(() => {
    fetchSessions({ page: currentPage, limit: pageSize, search });
  }, [currentPage, pageSize, search, fetchSessions]);

  const sessionsData = apiResponse?.data || [];
  const totalItems = apiResponse?.metadata?.total || 0;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this session?"))
      return;
    try {
      await deleteSession(id).unwrap();
      toast.success("Session deleted successfully");
      fetchSessions({ page: currentPage, limit: pageSize, search });
    } catch (error) {
      toast.error("Failed to delete session");
    }
  };

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
          <div className="text-slate-900 font-medium">
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
      header: "Type",
      render: (item) => <span className="text-slate-700">{item.type}</span>,
    },
    {
      header: "Duration",
      render: (item) => <span className="text-slate-700">{item.duration}</span>,
    },
    {
      header: "Agenda",
      render: (item) => (
        <div className="text-slate-600 text-sm max-w-[200px] line-clamp-2 leading-tight">
          {item.agenda}
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 cursor-pointer"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => {
                setSelectedSession(item);
                setIsViewModalOpen(true);
              }}
              className="cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-2 text-slate-500" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={() => handleDelete(item.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen bg-slate-50/50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Sessions Management
        </h1>
        <Button
          onClick={() => {
            setSelectedSession(null);
            setIsModalOpen(true);
          }}
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white font-bold px-6 shadow-md cursor-pointer"
        >
          <Plus className="w-5 h-5 mr-2" /> Schedule Session
        </Button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center bg-white">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search sessions..."
              className="pl-10 border-slate-200 focus:ring-[#8C23CC]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="px-5">
          <CommonTable
            columns={columns}
            data={sessionsData}
          />
        </div>

        <div className="p-4">
          <CommonPagination
            totalItems={totalItems}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>

      <CreateSessionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={() =>
          fetchSessions({ page: currentPage, limit: pageSize, search })
        }
      />

      <ViewSessionDialog
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default ManagerSessionsManagement;
