/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Plus, MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Swal from "sweetalert2";
import { BranchDialog } from "./_components/AddBranchDialogProps";
import { useDeleteBranchMutation, useGetAllBranchesQuery, type IBranch } from "@/redux/features/user-admin/branchApi";


const ClientAdminBranchesManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<IBranch | null>(null);

  // --- API Hooks ---
  const { data } = useGetAllBranchesQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });

  const [deleteBranch] = useDeleteBranchMutation();

  const branches = data?.data?.branches || [];
  const totalItems = data?.data?.meta?.total || 0;

  const handleOpenAdd = () => {
    setSelectedBranch(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (branch: IBranch) => {
    setSelectedBranch(branch);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This branch record will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91010",
      cancelButtonColor: "#8C23CC",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBranch(id).unwrap();
          Swal.fire("Deleted!", "Branch has been removed.", "success");
        } catch (error: any) {
          Swal.fire(
            "Error!",
            error?.data?.message || "Failed to delete",
            "error",
          );
        }
      }
    });
  };

  const columns: Column<IBranch>[] = [
    {
      header: "Branch Info",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-[#8C23CC] flex items-center justify-center font-bold">
            {item.branchName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-900">{item.branchName}</div>
            <div className="text-sm text-slate-400">{item.subdomain}</div>
          </div>
        </div>
      ),
    },
    { header: "Email", key: "branchEmail" },
    {
      header: "Managers",
      render: (item) => (
        <span className="text-sm">
          {item.managers && item.managers.length > 0
            ? item.managers.map((m) => m.manager.name).join(", ")
            : "No Manager"}
        </span>
      ),
    },
    { header: "Staff Count", key: "staffCount" },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${item.tenant?.status === "ACTIVE" ? "bg-green-500" : "bg-amber-500"}`}
          />
          <span className="font-bold text-slate-700 capitalize">
            {item.tenant?.status || "N/A"}
          </span>
        </div>
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div className="text-base">
          <div className="font-bold text-slate-900">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="text-[10px] text-slate-400 uppercase">
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreVertical size={18} className="text-slate-400" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 p-1" align="end">
            <button
              onClick={() => handleOpenEdit(item)}
              className="w-full flex items-center gap-2 px-3 py-2 text-base hover:bg-slate-50 text-slate-700 rounded-md cursor-pointer"
            >
              <Edit size={14} /> Edit
            </button>
            <hr />
            <button
              onClick={() => handleDelete(item.id)}
              className="w-full flex items-center gap-2 px-3 py-2 text-base hover:bg-red-50 text-red-600 rounded-md cursor-pointer"
            >
              <Trash size={14} /> Delete
            </button>
          </PopoverContent>
        </Popover>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Branch Management
        </h1>
        <div className="flex gap-3">
          <Button
            onClick={handleOpenAdd}
            className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-6 font-bold cursor-pointer"
          >
            <Plus size={18} className="mr-1" /> Add Branch
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by branch name or subdomain"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-base outline-none focus:ring-1 focus:ring-[#8C23CC]"
            />
          </div>
        </div>

        <CommonTable columns={columns} data={branches}  />

        <CommonPagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      <BranchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedBranch}
      />
    </div>
  );
};

export default ClientAdminBranchesManagement;
