import { useState } from "react";
import { Users, Banknote, Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import PaymentStatsCard from "./_components/PaymentStatsCard";

// API Hooks Import
import {
  useGetTotalOrdersQuery,
  useGetPlatformOverviewQuery,
  type IOrder,
} from "@/redux/features/admin/platformRevenueApi";

const SuperAmdinAllPayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch Stats (Total Tenants and Total Revenue)
  const { data: overviewData, isLoading: isStatsLoading } =
    useGetPlatformOverviewQuery();

  // 2. Fetch Payment/Order List
  const { data: orderRes, isLoading: isTableLoading } = useGetTotalOrdersQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });

  const payments = orderRes?.data || [];
  const totalItems = orderRes?.total || 0;

  const columns: Column<IOrder>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-purple-50 text-[#8C23CC]">
            {item.tenant?.companyName?.charAt(0) || "T"}
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-tight">
              {item.tenant?.companyName}
            </div>
            <div className="text-xs text-gray-400">
              {item.tenant?.subdomain}.domain.com
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Email",
      render: (item) => <span>{item.tenant?.companyEmail}</span>,
    },
    {
      header: "Plan Type",
      render: (item) => (
        <span className="font-bold text-gray-800">
          {item.subscription?.planName || "N/A"}
        </span>
      ),
    },
    {
      header: "Amount",
      render: (item) => (
        <span className="font-bold text-gray-900">${item.amount}</span>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-md text-xs font-medium ${
            item.status === "paid"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-amber-100 text-amber-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div>
          <div className="text-slate-900 text-sm">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <div className="text-[10px] text-gray-400 font-medium uppercase">
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-8 bg-[#FDFDFF]">
      <h1 className="text-2xl font-bold text-slate-900">All Payments</h1>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <PaymentStatsCard
          icon={<Users size={20} />}
          label="Total Tenants"
          value={isStatsLoading ? "..." : overviewData?.totalTenants || 0}
        />
        <PaymentStatsCard
          icon={<Banknote size={20} />}
          label="Total Revenue"
          value={
            isStatsLoading
              ? "..."
              : `$${overviewData?.totalRevenue?.toLocaleString()}`
          }
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email and plan"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm outline-none focus:border-purple-500 transition-all border-slate-200"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex gap-2 text-slate-600 border-slate-200"
            >
              <Filter size={16} /> Filter
            </Button>
            <Button
              variant="outline"
              className="flex gap-2 text-slate-600 border-slate-200"
            >
              <Download size={16} /> Export CSV
            </Button>
          </div>
        </div>

        {/* Table rendering with loading state */}
        <div className={isTableLoading ? "opacity-50" : ""}>
          <CommonTable columns={columns} data={payments} />
        </div>

        <CommonPagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default SuperAmdinAllPayments;
