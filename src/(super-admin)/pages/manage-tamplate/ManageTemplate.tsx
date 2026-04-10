/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import {
  useGetAllGlobalTemplatesQuery,
  useDeleteGlobalTemplateMutation,
  useToggleTemplateStatusMutation,
  type ITemplate,
} from "@/redux/features/admin/globalTemplateApi";

import { toast } from "react-toastify";
import GlobalTemplateDialog from "./_components/GlobalTemplateDialog";

const SuperAdminManageTemplate = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate | null>(
    null,
  );

  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // API Calls
  const {
    data: res,
    isFetching,
  } = useGetAllGlobalTemplatesQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });

  const [deleteTemplate] = useDeleteGlobalTemplateMutation();
  const [toggleStatus] = useToggleTemplateStatusMutation();

  const templates = (res as any)?.data?.data?.data || [];
  const totalItems = (res as any)?.data?.data?.meta?.total || 0;

  const handleStatusToggle = async (id: string) => {
    try {
      await toggleStatus(id).unwrap();
      toast.success("Status updated!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = (template: ITemplate) => {
    Swal.fire({
      title: "Delete Template?",
      text: `Are you sure you want to delete "${template.templateName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8A2BE2",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteTemplate(template.id).unwrap();
          Swal.fire("Deleted!", "Template has been removed.", "success");
        } catch (err: any) {
          toast.error(err?.data?.message || "Delete failed");
        }
      }
    });
  };

  const handleEdit = (template: ITemplate) => {
    setSelectedTemplate(template);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedTemplate(null);
    setIsDialogOpen(true);
  };

  const columns: Column<ITemplate>[] = [
    {
      header: "Template Name",
      render: (item) => (
        <span className="font-bold text-slate-900">{item.templateName}</span>
      ),
    },
    { header: "Type", key: "type" },
    {
      header: "Time Limit",
      render: (item) => <span>{item.timeLimit} mins</span>,
    },
    {
      header: "Status",
      render: (item) => (
        <Switch
          checked={item.isActive}
          onCheckedChange={() => handleStatusToggle(item.id)}
          className="data-[state=checked]:bg-[#8A2BE2] cursor-pointer"
        />
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
              className="h-8 w-8 outline-none"
            >
              <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => handleEdit(item)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-slate-500" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={() => handleDelete(item)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-6 bg-[#FDFDFF] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Global Templates</h1>
        <Button
          onClick={handleAdd}
          className="bg-[#8A2BE2] hover:bg-[#7A26C1] text-white py-5 px-6 rounded-lg cursor-pointer"
        >
          + Create New Template
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div className="flex justify-between mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by template name..."
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className={isFetching ? "opacity-50" : ""}>
          <CommonTable columns={columns} data={templates} />
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

      <GlobalTemplateDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialData={selectedTemplate}
      />
    </div>
  );
};

export default SuperAdminManageTemplate;
