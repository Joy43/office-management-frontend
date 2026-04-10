import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Users,
  Banknote,
  Landmark,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import {
  RevenueAreaChart,
  SellingSourceDonut,
} from "./_components/DashboardCharts";
import StatCard from "./_components/StatCard";

// API Hooks Import
import {
  useGetRevenueDashboardQuery,
  useGetTotalOrdersQuery,
  type IOrder,
} from "@/redux/features/admin/platformRevenueApi";

const SuperAmdinRevenueDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch Dashboard Stats (Top Cards)
  const { data: dashboardData, isLoading: isStatsLoading } =
    useGetRevenueDashboardQuery();

  // 2. Fetch Order List (Table)
  const { data: orderRes, isLoading: isTableLoading } = useGetTotalOrdersQuery({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });

  const orders = orderRes?.data || [];
  const totalOrders = orderRes?.total || 0;

  const columns: Column<IOrder>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-purple-100 text-[#8C23CC]">
            {item.tenant?.companyName?.charAt(0) || "T"}
          </div>
          <div>
            <div className="font-bold text-gray-900">
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
        <span className="font-bold text-purple-700">
          {item.subscription?.planName || "N/A"}
        </span>
      ),
    },
    {
      header: "Amount",
      render: (item) => <span className="font-bold">${item.amount}</span>,
    },
    {
      header: "Status",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
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
          <div className="text-sm font-medium">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
          <div className="text-[10px] text-gray-400">
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
    <div className="p-8 bg-[#FDFDFF] min-h-screen space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={
            isStatsLoading
              ? "..."
              : `$${dashboardData?.totalRevenue?.toLocaleString()}`
          }
          trend="13.45%"
          icon={Wallet}
          color="#8C23CC"
        />
        <StatCard
          title="Monthly Revenue"
          value={
            isStatsLoading
              ? "..."
              : `$${dashboardData?.monthlyRevenue?.toLocaleString()}`
          }
          trend="8.2%"
          icon={Banknote}
          color="#8C23CC"
        />
        <StatCard
          title="Net Profit"
          value={
            isStatsLoading
              ? "..."
              : `$${dashboardData?.netProfit?.toLocaleString()}`
          }
          trend="10.1%"
          icon={Landmark}
          color="#8C23CC"
        />
        <StatCard
          title="Total Tenants"
          value={
            isStatsLoading
              ? "..."
              : dashboardData?.totalTenants?.toString() || "0"
          }
          trend="5.5%"
          icon={Users}
          color="#8C23CC"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueAreaChart />
        </div>
        <div className="lg:col-span-1">
          <SellingSourceDonut />
        </div>
      </div>

      {/* Order List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Order List</h2>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by tenant name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-purple-500 border-slate-200 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex gap-2 border-slate-200 text-slate-600 font-medium"
            >
              <Filter size={16} /> Filter
            </Button>
            <Button
              variant="outline"
              className="flex gap-2 border-slate-200 text-slate-600 font-medium"
            >
              <Download size={16} /> Export
            </Button>
          </div>
        </div>

        <div className={isTableLoading ? "opacity-50 pointer-events-none" : ""}>
          <CommonTable columns={columns} data={orders} />
        </div>

        <CommonPagination
          totalItems={totalOrders}
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
  );
};

export default SuperAmdinRevenueDashboard;
