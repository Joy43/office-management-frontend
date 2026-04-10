
import SummaryStats from "./_components/SummaryStats";
import TodayHuddles from "./_components/TodayHuddles";
import RecentCoachingLogs from "./_components/RecentCoachingLogs";
import DashboardAlerts from "./_components/DashboardAlerts";

const ManagerDashboard = () => {
  return (
    <div className="p-8 space-y-8  min-h-screen">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-900">Organization Overview</h1>
      </header>

      {/* Section 1: Top Stats Cards */}
      <SummaryStats />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Section 2: Huddles Table (Takes up 3/4 of width) */}
        <div className="xl:col-span-3">
           <TodayHuddles />
        </div>

        {/* Section 3: Right Sidebar Alerts */}
        <div className="xl:col-span-1">
           <DashboardAlerts />
        </div>
      </div>

      {/* Section 4: Coaching Logs Table */}
      <div>
        <RecentCoachingLogs />
      </div>
    </div>
  );
};

export default ManagerDashboard;