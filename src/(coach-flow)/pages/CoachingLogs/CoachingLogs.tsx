/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  Calendar,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  Clock as ClockIcon,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
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
import CoachingMetricCard from "./_components/CoachingMetricCard";

// API Hook - Assuming this is where your coaching logs come from
import { useGetUpcomingSessionsQuery } from "@/redux/features/trainer/trainerApi";

const CoachCoachingLogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<
    "All" | "COMPLETED" | "PENDING" | "DARFT"
  >("All");

  // --- API Call with Backend Pagination & Search ---
  const {
    data: sessionsResponse,
    // isLoading,
    // isFetching,
  } = useGetUpcomingSessionsQuery({
    page: currentPage,
    limit: pageSize,
    search: search,
    // status: activeTab === "All" ? undefined : activeTab, // Status wise filter API theke hole
  });

  const metricsData = [
    {
      id: "total-sessions",
      title: "Total Sessions",
      value: sessionsResponse?.metadata?.total || 0,
      icon: Calendar,
      change: "This month",
    },
    {
      id: "active-clients",
      title: "Active Clients",
      value: 42, // Static as per your requirement or fetch from another API
      icon: Users,
      change: "+5 new",
    },
    {
      id: "compliance-rate",
      title: "Compliance Rate",
      value: "98.5%",
      icon: Shield,
    },
    {
      id: "avg-session-time",
      title: "Avg. Session Time",
      value: "52min",
      icon: Clock,
      subtitle: "(Per Session)",
    },
  ];

  const columns: Column<any>[] = [
    {
      header: "Session Title",
      render: (item) => (
        <span className="font-semibold text-slate-900">{item.title}</span>
      ),
    },
    {
      header: "Session Type",
      render: (item) => (
        <span className="text-slate-700">{item.type || "ONLINE"}</span>
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
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : item.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-slate-100 text-slate-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Compliance",
      render: (item) => {
        const complianceConfig: any = {
          VERIFIED: {
            icon: CheckCircle2,
            color: "text-green-600",
            label: "Verified",
          },
          PENDING: {
            icon: ClockIcon,
            color: "text-yellow-600",
            label: "Pending",
          },
          NOT_STARTED: {
            icon: AlertTriangle,
            color: "text-slate-600",
            label: "Not Started",
          },
        };

        const config =
          complianceConfig[item.complianceStatus] ||
          complianceConfig.NOT_STARTED;
        const Icon = config.icon;

        return (
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${config.color}`} />
            <span className="text-slate-700">{config.label}</span>
          </div>
        );
      },
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
      header: "Action",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-slate-200">
              {item.status}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">
        Coaching Logs
      </h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {metricsData.map((metric) => (
          <CoachingMetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            change={metric.change}
            subtitle={metric.subtitle}
          />
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-3 sm:gap-6 border-b border-slate-200 mb-4 sm:mb-6 overflow-x-auto">
        {(["All", "COMPLETED", "PENDING", "DARFT"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`pb-3 px-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "text-[#8C23CC] border-b-2 border-[#8C23CC]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by title..."
              className="pl-10 border-slate-200 w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-slate-200 flex-1 sm:flex-initial"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              className="border-slate-200 flex-1 sm:flex-initial"
            >
              Export CSV
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Dynamic Table */}
        <CommonTable
          columns={columns}
          data={sessionsResponse?.data || []}
          // isLoading={isLoading || isFetching}
        />

        {/* Pagination using metadata */}
        <CommonPagination
          totalItems={sessionsResponse?.metadata?.total || 0}
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

export default CoachCoachingLogs;
