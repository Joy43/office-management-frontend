import { CheckCircle2, Flame, LayoutDashboard } from "lucide-react";
import MetricCard from "./_components/MetricCard";
import HabitAnalytics from "./_components/HabitAnalytics";
import TodaysProgress from "./_components/TodaysProgress";
import TodaysHuddles from "./_components/TodaysHuddles";
import UpcomingSessions from "./_components/UpcomingSessions";
import { useGetStaffDashboardDataQuery } from "@/redux/features/staff/staffDashboardApi";

const FrontLineDashboard = () => {
  const { data: dashboardData, isLoading } =
    useGetStaffDashboardDataQuery(undefined);

  if (isLoading)
    return <div className="p-8 text-center">Loading Dashboard...</div>;

  const stats = dashboardData?.data?.stats;

  const metricsData = [
    {
      id: "habit-completed",
      title: "Habit Completed",
      value: stats?.habitCompleted ?? 0,
      icon: CheckCircle2,
    },
    {
      id: "total-habits",
      title: "Total Habits",
      value: stats?.totalHabits ?? 0,
      icon: LayoutDashboard,
    },
    {
      id: "best-streak",
      title: "Best Streak",
      value: stats?.bestStreak ?? 0,
      icon: Flame,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen space-y-6 sm:space-y-8 bg-slate-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {metricsData.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-9">
          <HabitAnalytics />
        </div>
        <div className="lg:col-span-3">
          <TodaysProgress progressData={dashboardData?.data?.todaysProgress} />
        </div>
      </div>

      <TodaysHuddles />
      <UpcomingSessions />
    </div>
  );
};

export default FrontLineDashboard;
