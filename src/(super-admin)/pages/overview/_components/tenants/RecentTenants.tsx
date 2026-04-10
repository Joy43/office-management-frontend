/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { MoreVertical, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Column } from "@/components/shared/common/CommonTable";
import CommonTable from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import SuperAdminTenantDialog from "./SuperAdminTenantDialog.tsx";
import { toast } from "react-toastify";
import {
  useDeleteTenantMutation,
  useGetAllTenantsQuery,
  useUpdateTenantMutation,
  type ITenant,
} from "@/redux/features/admin/tenantApi.tsx";

const RecentTenants = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<ITenant | null>(null);

  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // API Calls
  const {
    data: tenantsRes,
    isLoading,
    isFetching,
  } = useGetAllTenantsQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });

  const [updateTenant] = useUpdateTenantMutation();
  const [softDelete] = useDeleteTenantMutation();


  const tenants = (tenantsRes as any)?.tenants || [];
  const totalItems = (tenantsRes as any)?.totalCount || 0;

  const handleAdd = () => {
    setSelectedTenant(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (tenant: ITenant) => {
    setSelectedTenant(tenant);
    setIsDialogOpen(true);
  };

  const handleDelete = (tenant: ITenant) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${tenant.companyName}? This will be a soft delete.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A2BE2",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await softDelete(tenant.id).unwrap();
          Swal.fire("Deleted!", "Tenant moved to trash.", "success");
        } catch (err: any) {
          toast.error(err?.data?.message || "Delete failed");
        }
      }
    });
  };

  const columns: Column<ITenant>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-purple-100 text-purple-600">
            {item.companyName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-tight">
              {item.companyName}
            </div>
            <div className="text-xs text-gray-400">
              {item.subdomain}.domain.com
            </div>
          </div>
        </div>
      ),
    },
    { header: "Email", key: "companyEmail" },
    {
      header: "Status",
      render: (item) => (
        <Switch
          checked={item.status === "ACTIVE"}
          onCheckedChange={async (checked) => {
            try {
              await updateTenant({
                id: item.id,
                data: { status: checked ? "ACTIVE" : "INACTIVE" } as any,
              }).unwrap();
              toast.success("Status updated!");
            } catch {
              toast.error("Failed to update status");
            }
          }}
          className="data-[state=checked]:bg-[#8C23CC] cursor-pointer"
        />
      ),
    },
    {
      header: "Payment",
      render: (item) => (
        <span
          className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.isPaymentActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
        >
          {item.isPaymentActive ? "ACTIVE" : "INACTIVE"}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 cursor-pointer"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => handleEdit(item)}
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(item)}
              className="text-red-600 cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-8 bg-[#FDFDFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tenant Management</h1>
        <Button
          onClick={handleAdd}
          className="bg-[#8C23CC] hover:bg-[#7A26C1] cursor-pointer"
        >
          + Create New Tenant
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="relative w-full max-w-sm mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-[#8C23CC]"
          />
        </div>

        <div
          className={
            isFetching || isLoading ? "opacity-50 pointer-events-none" : ""
          }
        >
          <CommonTable columns={columns} data={tenants} />
        </div>

        <CommonPagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      <SuperAdminTenantDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedTenant}
      />
    </div>
  );
};

export default RecentTenants;
