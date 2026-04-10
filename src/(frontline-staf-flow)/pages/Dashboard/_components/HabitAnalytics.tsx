import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetHabitAnalysisQuery } from "@/redux/features/staff/staffDashboardApi";

const HabitAnalytics = () => {
  const [timeRange, setTimeRange] = useState("Weekly");
  const { data: analysisRes, isFetching } = useGetHabitAnalysisQuery({
    period: timeRange,
  });

  const chartData = analysisRes?.data?.chartData || [];
  const growth = analysisRes?.data?.percentageChange;

  return (
    <div
      className={`bg-white rounded-xl border border-slate-100 shadow-sm p-6 ${isFetching ? "opacity-50" : ""}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-900">
              Habit Analytics
            </h3>
            {growth !== undefined && (
              <div className="flex items-center gap-1">
                <TrendingUp
                  className={`w-4 h-4 ${growth >= 0 ? "text-green-600" : "text-red-600"}`}
                />
                <span
                  className={`text-sm font-semibold ${growth >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {growth > 0 ? `+${growth}%` : `${growth}%`}
                </span>
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 border-slate-200"
            >
              {timeRange} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Weekly", "Monthly", "Yearly"].map((p) => (
              <DropdownMenuItem key={p} onClick={() => setTimeRange(p)}>
                {p}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8C23CC" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8C23CC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="completedHabits"
            stroke="#8C23CC"
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={{ fill: "#8C23CC", r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default HabitAnalytics