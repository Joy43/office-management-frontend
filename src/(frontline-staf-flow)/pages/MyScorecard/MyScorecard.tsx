/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Search,
  Download,
  Filter,
  CheckCircle2,
  Flame,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MetricCard from "../Dashboard/_components/MetricCard";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { useGetMyScoredHabitsQuery } from "@/redux/features/staff/staffHabitsApi";
import { useDebounce } from "../Myessions/useDebounce";
// import { useDebounce } from "@/hooks/useDebounce";

const FrontLineMyScorecard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // RTK Query API Call
  const {
    data: response
  } = useGetMyScoredHabitsQuery({
    page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
  });

  const scoredData = response?.data?.coaches || [];
  const stats = response?.data?.statistics;
  const pagination = response?.data?.pagination;

  // Metric Cards mapping from API statistics
  const metricsData = [
    {
      id: "total-habits",
      title: "Total Habits",
      value: stats?.totalAllHabits || 0,
      icon: CheckCircle2,
    },
    {
      id: "completed-habits",
      title: "Completed Habits",
      value: stats?.totalCompletedHabits || 0,
      icon: Flame, // Best streak er logic backend e na thakle eikhane completed count dekhano safe
    },
    {
      id: "avg-score",
      title: "Avg Score",
      value: `${stats?.averageScore || 0}/5`,
      icon: Gauge,
    },
  ];

  const columns: Column<any>[] = [
    {
      header: "Coach Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img
            src={
              item.coachProfilePicture ||
              `https://ui-avatars.com/api/?name=${item.coachName}`
            }
            alt={item.coachName}
            className="w-10 h-10 rounded-full object-cover border-2 border-slate-200"
          />
          <div>
            <p className="font-semibold text-slate-900">{item.coachName}</p>
            <p className="text-[10px] text-slate-500 uppercase">
              {item.coachRole}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Feedback/Email",
      render: (item) => (
        <span className="text-slate-700 truncate max-w-[150px] inline-block">
          {item.feedback}
        </span>
      ),
    },
    {
      header: "Habit Complete",
      render: (item) => (
        <span className="text-slate-700 font-medium">{item.habitComplete}</span>
      ),
    },
    {
      header: "Habit (%)",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${item.completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-slate-700 text-sm">{item.habitPercentage}</span>
        </div>
      ),
    },
    {
      header: "Score",
      render: (item) => (
        <div className="flex flex-col">
          <span className="text-indigo-700 font-bold">{item.score}</span>
          <span className="text-[10px] text-slate-400">
            {item.earnedPoints} pts
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-slate-50">
      {/* Top Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {metricsData.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="relative flex-1 w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by coach name or email"
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

        {/* Table */}
        <CommonTable
          columns={columns}
          data={scoredData}
        />

        {/* Pagination */}
        <CommonPagination
          totalItems={pagination?.total || 0}
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

export default FrontLineMyScorecard;
