import { useState, useMemo } from "react";
import { Search, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonTable, { type Column } from "@/components/shared/common/CommonTable";
import CommonPagination from "@/components/shared/common/CommonPagination";
import { DashboardStat } from "./_components/DashboardStat";
import { TrendsSection } from "./_components/TrendsSection";
import { PerformanceData, type BranchPerformance } from "@/(executive-flow)/pages/Dashboard/_components/ExecutiveData";

const ClientAdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredData = useMemo(() => {
    return PerformanceData.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.domain.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const columns: Column<BranchPerformance>[] = [
    {
      header: "Company Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-[#8C23CC] flex items-center justify-center font-bold text-base">
            {item.initial}
          </div>
          <div>
            <div className="font-bold text-slate-900 leading-tight">{item.name}</div>
            <div className="text-sm text-slate-400">{item.domain}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            item.status === 'excellent' ? 'bg-emerald-500' : 
            item.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
          }`} />
          <span className="font-bold text-slate-700 text-base">{item.score}</span>
        </div>
      ),
    },
    {
      header: "Created At",
      render: (item) => (
        <div className="text-sm">
          <div className="font-bold text-slate-900">{item.date}</div>
          <div className="text-sm text-slate-400">5:20 PM</div>
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen space-y-8 bg-[#FDFDFD]">
      {/* 1. HEADER SECTION */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Organization Overview</h1>
        <Button className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-8 font-bold h-11 rounded-xl shadow-lg shadow-purple-100 cursor-pointer">
          Upgrade Plan
        </Button>
      </div>

      {/* 2. ACTIVE PLAN BANNER (New Section from Screenshot) */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 flex items-center justify-between border border-slate-800 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
            <Zap size={22} fill="currentColor" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-white text-xl font-semibold">Growth Plan</h2>
              <span className="bg-slate-700 text-slate-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <p className="flex items-center gap-2 text-slate-500 text-xs mt-1 font-medium">
              Billed monthly <span className="mx-1"><span className="text-lg  text-white/80">•</span></span> Renews on Jan 15, 2025
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white text-2xl font-semibold ">$299</div>
          <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">/month</div>
        </div>
      </div>

      {/* 3. STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <DashboardStat label="Complaints" value="25%" isUp={false} status="success" />
        <DashboardStat label="CSAT" value="1.8 pts" isUp={true} status="warning" />
        <DashboardStat label="Adoptions" value="85%" isUp={true} status="success" />
        <DashboardStat label="Repeat" value="15%" isUp={true} status="success" />
      </div>
      
      {/* 4. TRENDS GRAPH */}
      <TrendsSection />

      {/* 5. WORKFLOW ACTIVATION CARD (New Section from Screenshot) */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm flex justify-between items-center">
        <div>
          <h3 className="text-[#FF0080] text-lg font-extrabold mb-1">90 Days Workflow</h3>
          <p className="text-slate-400 text-[11px] font-medium uppercase tracking-tight">
            Creation date: Jan 15, 2025
          </p>
        </div>
        <div className="bg-[#FFF0F7] text-[#FF0080] px-4 py-1.5 rounded-lg text-xs font-bold border border-[#FFD6E9]">
          Activated
        </div>
      </div>

      {/* 6. BRANCH TABLE SECTION */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Branch Variance</h3>
          
          <div className="flex items-center gap-4">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or domain"
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:border-[#8C23CC] transition-all"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
              />
            </div>
            <Button className="bg-[#8C23CC] hover:bg-[#761eb0] text-white px-6 cursor-pointer">
                View Branches
            </Button>
            <Button variant="outline" className="flex gap-2 border-slate-200 cursor-pointer">
              Export Reports <Download size={16} />
            </Button>
          </div>
        </div>

        <CommonTable columns={columns} data={paginatedData} />

        <div className="mt-6">
            <CommonPagination 
                totalItems={filteredData.length} 
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
    </div>
  );
};

export default ClientAdminDashboard;