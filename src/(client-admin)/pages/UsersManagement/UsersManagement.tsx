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
import { UserDialog } from "./_components/UserDialog";
import { useDeleteUserMutation, useGetAllBranchesQuery, type IUser } from "@/redux/features/user-admin/branchApi";


const ClientAdminUsersManagement = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);


  const { data: branchData} = useGetAllBranchesQuery({
    search,
    page: currentPage,
    limit: pageSize,
  });

  const [deleteUser] = useDeleteUserMutation();

  const allBranches = branchData?.data?.branches || [];
  const totalItems = branchData?.data?.meta?.total || 0;

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete User?",
      text: "This user will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#B91010",
      cancelButtonColor: "#8C23CC",
      confirmButtonText: "Yes, delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(id).unwrap();
          Swal.fire("Deleted!", "User removed.", "success");
        } catch (err: any) {
          Swal.fire(
            "Error!",
            err?.data?.message || "Failed to delete",
            "error",
          );
        }
      }
    });
  };

  const columns: Column<any>[] = [
    {
      header: "User Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-[#8C23CC] flex items-center justify-center font-bold">
            {item.name?.charAt(0) || "U"}
          </div>
          <div>
            <div className="font-bold text-slate-900">{item.name}</div>
            <div className="text-sm text-slate-400">{item.email}</div>
          </div>
        </div>
      ),
    },
    { header: "Role", key: "role" },
    { header: "Mobile", key: "phone" },
    {
      header: "Branch",
      render: (item) => (
        <span className="text-slate-600">
          {item.branch?.branchName || "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-bold ${item.status === "ACTIVE" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"}`}
        >
          {item.status || "Active"}
        </span>
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
              onClick={() => {
                setSelectedUser(item);
                setIsDialogOpen(true);
              }}
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
          Users Management
        </h1>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setIsDialogOpen(true);
          }}
          className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-6 font-bold cursor-pointer"
        >
          <Plus size={18} className="mr-1" /> Add User
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="relative w-96 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-base outline-none focus:ring-1 focus:ring-[#8C23CC]"
          />
        </div>

        {/* এখানে আপনি আপনার ইউজার ডাটা লিস্ট পাস করবেন */}
        <CommonTable
          columns={columns}
          data={allBranches.flatMap(
            (b) => b.managers?.map((m) => ({ ...m.manager, branch: b })) || [],
          )}
        />

        <CommonPagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      <UserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedUser}
      />
    </div>
  );
};

export default ClientAdminUsersManagement;
