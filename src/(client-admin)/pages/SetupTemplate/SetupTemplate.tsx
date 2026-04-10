/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Search,
  MoreVertical,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import TemplateDetailModal from "./_components/TemplateDetailModal";
import {
  useGetOwnTemplatesQuery,
  useDeleteTemplateMutation,
  useUpdateTemplateStatusMutation,
} from "@/redux/features/user-admin/dashboardTemplateApi";
import { format } from "date-fns";
import { toast } from "react-toastify";


const ClientAdminSetupTemplate = () => {
  const [activeTab, setActiveTab] = useState("Templates"); // "Templates" = Global, "My Templates" = Tenant's
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // API Call: ব্যাকএন্ড লজিক অনুযায়ী গ্লোবাল এবং ওন টেমপ্লেট একসাথে আসবে
  const { data: templateResponse} = useGetOwnTemplatesQuery({
    search: search || undefined,
    page: currentPage,
    limit: pageSize,
  });

  const [deleteTemplate] = useDeleteTemplateMutation();
  const [updateStatus] = useUpdateTemplateStatusMutation();

  // Tab Logic: ব্যাকএন্ড থেকে আসা ডেটাকে ট্যাবের ওপর ভিত্তি করে ফ্রন্টএন্ডে ভাগ করা
  // activeTab === "Templates" হলে গ্লোবালগুলো দেখাবে, "My Templates" হলে নিজেরগুলো।
  const displayData = useMemo(() => {
    const all = templateResponse?.data?.templates || [];
    if (activeTab === "Templates") {
      return all.filter((t: any) => t.isGlobal);
    }
    return all.filter((t: any) => t.tenantId && !t.isGlobal);
  }, [templateResponse, activeTab]);

  const meta = templateResponse?.data?.meta;

  const handleAction = async (id: string, action: "delete" | "complete") => {
    try {
      if (action === "delete") {
        await deleteTemplate(id).unwrap();
        toast.success("Template deleted successfully");
      } else {
        await updateStatus({ templateId: id, status: "PUBLISHED" }).unwrap();
        toast.success("Status updated to Published");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  const columns: Column<any>[] = [
    {
      header: "Template Name",
      render: (item) => (
        <span className="font-bold text-slate-900">{item.templateName}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${
            item.templatestatus === "PUBLISHED"
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {item.templatestatus}
        </span>
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div className="text-sm">
          <div className="font-bold text-slate-900">
            {format(new Date(item.createdAt), "MMM dd, yyyy")}
          </div>
        </div>
      ),
    },
    {
      header: "Action",
      render: (item) =>
        activeTab === "Templates" ? (
          <Button
            onClick={() => {
              setSelectedTemplate(item);
              setIsViewOpen(true);
            }}
            className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-8 font-bold h-9 rounded-md cursor-pointer transition-all active:scale-95"
          >
            Select
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 cursor-pointer rounded-full"
              >
                <MoreVertical className="h-4 w-4 text-slate-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 bg-white">
              <DropdownMenuItem
                onClick={() => handleAction(item.id, "complete")}
                className="cursor-pointer gap-2"
              >
                <CheckCircle size={16} className="text-green-500" /> Mark As
                Published
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAction(item.id, "delete")}
                className="cursor-pointer gap-2 text-red-600"
              >
                <Trash2 size={16} /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
    },
  ];

  return (
    <div className="p-8 bg-[#FDFDFD] min-h-screen space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Setup Template</h1>

      <div className="flex gap-8 border-b border-slate-100">
        {["Templates", "My Templates"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`pb-4 text-sm font-bold transition-all relative cursor-pointer ${activeTab === tab ? "text-[#8C23CC]" : "text-slate-400"}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8C23CC]" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-50 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#8C23CC]"
            />
          </div>
        </div>

        <CommonTable
          columns={columns}
          data={displayData}
        />

        {meta && (
          <div className="mt-8">
            <CommonPagination
              totalItems={meta.total}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <TemplateDetailModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        template={selectedTemplate}
      />
    </div>
  );
};

export default ClientAdminSetupTemplate;
