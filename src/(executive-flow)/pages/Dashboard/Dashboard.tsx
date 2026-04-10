/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { DashboardSummary } from "./_components/DashboardSummary";
import { DashboardTrends } from "./_components/DashboardTrends";
import { useGetBranchPerformanceQuery } from "@/redux/features/Executive/executiveDashboardApi";

const ExecutiveDashboard = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Added state to fix TS error

  // Real API Call
  const { data: response } = useGetBranchPerformanceQuery({
    page: currentPage,
    limit: pageSize,
    search: search,
  });
console.log(response);
  const branchData = response?.branches || [];
  const pagination = response?.pagination;

  const columns: Column<any>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-[#8C23CC] flex items-center justify-center font-bold text-sm">
            {item.avatar || item.branchName?.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">
              {item.branchName}
            </div>
            <div className="text-xs text-slate-400">{item.subdomain}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              item.statusColor === "green"
                ? "bg-emerald-500"
                : item.statusColor === "yellow"
                  ? "bg-amber-500"
                  : "bg-red-500"
            }`}
          />
          <span className="font-bold text-slate-700">{item.CSAT} pts</span>
        </div>
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div className="text-sm">
          <div className="font-bold text-slate-900 whitespace-pre-line">
            {item.createdAt}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-8 bg-slate-50/30">
      <DashboardSummary />
      <DashboardTrends />

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-800">
            Branch Performance
          </h3>
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search branches..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-[#8C23CC]"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button
              variant="outline"
              className="cursor-pointer flex gap-2 border-slate-200"
            >
              Export Reports <Download size={16} />
            </Button>
          </div>
        </div>

        <CommonTable
          columns={columns}
          data={branchData}
          // isLoading={isLoading}
        />

        {pagination && (
          <div className="mt-6">
            <CommonPagination
              currentPage={currentPage}
              totalItems={pagination.totalItems}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize} // Property passed to satisfy PaginationProps
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
