/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, {
  type Column,
} from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { ScorecardMetric } from "./_components/ScorecardMetric";
import { TopListCard } from "./_components/TopListCard";
import {
  useGetBranchPerformanceQuery,
  useGetExecutiveOverviewQuery,
  useGetHighestCSATScoresQuery,
  useGetFewestComplaintsQuery,
  useGetBestAdherenceQuery,
} from "@/redux/features/Executive/executiveDashboardApi";

const ExecutiveScorecard = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // API Calls
  const { data: overviewData } = useGetExecutiveOverviewQuery(undefined);
  const { data: branchResponse } =
    useGetBranchPerformanceQuery({
      page: currentPage,
      limit: pageSize,
      search: search,
    });
console.log(overviewData);
  const { data: topCsat } = useGetHighestCSATScoresQuery(undefined);
  const { data: fewComplaints } = useGetFewestComplaintsQuery(undefined);
  const { data: bestAdherence } = useGetBestAdherenceQuery(undefined);

  const columns: Column<any>[] = [
    {
      header: "Branch",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-50 text-[#8C23CC] flex items-center justify-center font-bold text-base">
            {item.branchName?.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-slate-900 text-base">
              {item.branchName}
            </div>
            <div className="text-sm text-slate-400">{item.subdomain}</div>
          </div>
        </div>
      ),
    },
    { header: "Region", key: "region" },
    { header: "Manager", key: "manager" },
    { header: "CSAT Score", render: (item) => `${item.CSAT} pts` },
    { header: "Complaints", render: (item) => `${item.complaints}%` },
    {
      header: "Adherence",
      render: (item) => {
        const val = parseInt(item.adherence);
        const color = val >= 90 ? "#10B956" : val >= 80 ? "#B89200" : "#B91010";
        return (
          <span
            className="px-3 py-1 rounded font-bold text-base"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {item.adherence}%
          </span>
        );
      },
    },
    {
      header: "Trend",
      render: (item) =>
        item.trend === "up" ? (
          <TrendingUp size={16} className="text-[#10B956]" />
        ) : item.trend === "down" ? (
          <TrendingDown size={16} className="text-[#B91010]" />
        ) : (
          <Minus size={16} className="text-[#B89200]" />
        ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${item.statusColor === "red" ? "bg-[#B91010]" : item.statusColor === "yellow" ? "bg-[#B89200]" : "bg-[#10B956]"}`}
          />
          <span className="font-bold text-base text-slate-700">
            {item.score}
          </span>
        </div>
      ),
    },
  ];

  const summary = overviewData?.summary;

  return (
    <div className="p-8 min-h-screen space-y-12 bg-slate-50/20">
      <div className="flex justify-end">
        <Button className="bg-[#8C23CC] hover:bg-[#761eb0] text-white cursor-pointer px-6">
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ScorecardMetric
          label="Complaints"
          value={`${summary?.complaints?.value}%`}
          isUp={summary?.complaints?.trend === "up"}
          status={
            summary?.complaints?.status === "good" ? "success" : "warning"
          }
        />
        <ScorecardMetric
          label="CSAT"
          value={`${summary?.csat?.value} pts`}
          isUp={summary?.csat?.trend === "up"}
          status={summary?.csat?.status === "good" ? "success" : "warning"}
        />
        <ScorecardMetric
          label="Adoptions"
          value={`${summary?.adoptions?.value}%`}
          isUp={summary?.adoptions?.trend === "up"}
          status={summary?.adoptions?.status === "good" ? "success" : "warning"}
        />
        <ScorecardMetric
          label="Time to Resolve"
          value={`${summary?.repeat?.value}%`}
          isUp={summary?.repeat?.trend === "up"}
          status={summary?.repeat?.status === "good" ? "success" : "warning"}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-2xl font-bold mb-8">Branch Performance</h3>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-[#8C23CC]"
            />
          </div>
          <Button
            variant="outline"
            className="cursor-pointer flex gap-2 border-slate-200"
          >
            Export Reports
          </Button>
        </div>

        <CommonTable
          columns={columns}
          data={branchResponse?.branches || []}
          // isLoading={isTableLoading}
        />

        {branchResponse?.pagination && (
          <div className="mt-6">
            <CommonPagination
              currentPage={currentPage}
              totalItems={branchResponse.pagination.totalItems}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TopListCard title="Highest CSAT Scores" items={topCsat || []} />
        <TopListCard title="Fewest Complaints" items={fewComplaints || []} />
        <TopListCard title="Best Adherence" items={bestAdherence || []} />
      </div>
    </div>
  );
};

export default ExecutiveScorecard;
